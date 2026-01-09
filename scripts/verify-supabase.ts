import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

console.log('🔍 Supabase Database Verificatie\n')
console.log('=' .repeat(50))

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL of NEXT_PUBLIC_SUPABASE_ANON_KEY ontbreekt in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

interface VerificationResult {
  name: string
  status: 'ok' | 'error' | 'warning'
  message: string
}

const results: VerificationResult[] = []

async function checkTable(tableName: string, required: boolean = true) {
  try {
    const { data, error } = await supabase.from(tableName).select('*').limit(1)
    
    if (error) {
      results.push({
        name: `Tabel: ${tableName}`,
        status: required ? 'error' : 'warning',
        message: `Fout: ${error.message}`,
      })
      return false
    }
    
    results.push({
      name: `Tabel: ${tableName}`,
      status: 'ok',
      message: '✓ Tabel bestaat en is toegankelijk',
    })
    return true
  } catch (error) {
    results.push({
      name: `Tabel: ${tableName}`,
      status: required ? 'error' : 'warning',
      message: `Fout: ${error instanceof Error ? error.message : 'Onbekende fout'}`,
    })
    return false
  }
}

async function checkProducts() {
  try {
    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('beschikbaar', true)
    
    if (error) throw error
    
    const requiredTypes = ['pir_sensor', 'deurcontact', 'alarmcentrale', 'bedienpaneel', 'flitser', 'sirene']
    const foundTypes = data?.map(p => p.type) || []
    const missingTypes = requiredTypes.filter(t => !foundTypes.includes(t))
    
    if (missingTypes.length > 0) {
      results.push({
        name: 'Producten',
        status: 'error',
        message: `Ontbrekende product types: ${missingTypes.join(', ')}`,
      })
      return false
    }
    
    results.push({
      name: 'Producten',
      status: 'ok',
      message: `✓ ${count || 0} producten gevonden, alle types aanwezig`,
    })
    return true
  } catch (error) {
    results.push({
      name: 'Producten',
      status: 'error',
      message: `Fout: ${error instanceof Error ? error.message : 'Onbekende fout'}`,
    })
    return false
  }
}

async function checkSettings() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'uurprijs')
      .single()
    
    if (error) throw error
    
    if (!data || !data.value) {
      results.push({
        name: 'Instellingen',
        status: 'error',
        message: 'Uurprijs instelling niet gevonden',
      })
      return false
    }
    
    results.push({
      name: 'Instellingen',
      status: 'ok',
      message: `✓ Uurprijs ingesteld: €${data.value}`,
    })
    return true
  } catch (error) {
    results.push({
      name: 'Instellingen',
      status: 'error',
      message: `Fout: ${error instanceof Error ? error.message : 'Onbekende fout'}`,
    })
    return false
  }
}

async function checkUsers() {
  if (!supabaseAdmin) {
    results.push({
      name: 'Gebruikers',
      status: 'warning',
      message: '⚠ Service Role Key niet ingesteld, kan gebruikers niet controleren',
    })
    return false
  }
  
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()
    
    if (error) throw error
    
    const adminUsers = data.users.filter(u => u.user_metadata?.role === 'admin')
    const totalUsers = data.users.length
    
    if (adminUsers.length === 0) {
      results.push({
        name: 'Gebruikers',
        status: 'warning',
        message: `⚠ Geen admin gebruikers gevonden (${totalUsers} totaal gebruikers)`,
      })
      return false
    }
    
    results.push({
      name: 'Gebruikers',
      status: 'ok',
      message: `✓ ${adminUsers.length} admin gebruiker(s) gevonden (${totalUsers} totaal)`,
    })
    
    // Toon admin gebruikers
    console.log('\n📋 Admin Gebruikers:')
    adminUsers.forEach(user => {
      console.log(`   - ${user.email} (ID: ${user.id})`)
    })
    
    return true
  } catch (error) {
    results.push({
      name: 'Gebruikers',
      status: 'error',
      message: `Fout: ${error instanceof Error ? error.message : 'Onbekende fout'}`,
    })
    return false
  }
}

async function checkDataCounts() {
  try {
    const [orders, appointments, customers] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('appointments').select('id', { count: 'exact', head: true }),
      supabase.from('customers').select('id', { count: 'exact', head: true }),
    ])
    
    console.log('\n📊 Data Overzicht:')
    console.log(`   Orders: ${orders.count || 0}`)
    console.log(`   Afspraken: ${appointments.count || 0}`)
    console.log(`   Klanten: ${customers.count || 0}`)
    
    results.push({
      name: 'Data Overzicht',
      status: 'ok',
      message: '✓ Data counts opgehaald',
    })
    return true
  } catch (error) {
    results.push({
      name: 'Data Overzicht',
      status: 'warning',
      message: `Fout: ${error instanceof Error ? error.message : 'Onbekende fout'}`,
    })
    return false
  }
}

async function main() {
  console.log(`📡 Supabase URL: ${supabaseUrl}\n`)
  
  // Check tabellen
  console.log('🔍 Controleren tabellen...')
  await checkTable('products', true)
  await checkTable('settings', true)
  await checkTable('customers', true)
  await checkTable('orders', true)
  await checkTable('appointments', true)
  await checkTable('configurations', false)
  
  // Check specifieke data
  console.log('\n🔍 Controleren data...')
  await checkProducts()
  await checkSettings()
  await checkDataCounts()
  
  // Check gebruikers (alleen met service key)
  console.log('\n🔍 Controleren gebruikers...')
  await checkUsers()
  
  // Samenvatting
  console.log('\n' + '='.repeat(50))
  console.log('📋 SAMENVATTING\n')
  
  const ok = results.filter(r => r.status === 'ok').length
  const warnings = results.filter(r => r.status === 'warning').length
  const errors = results.filter(r => r.status === 'error').length
  
  results.forEach(result => {
    const icon = result.status === 'ok' ? '✓' : result.status === 'warning' ? '⚠' : '❌'
    const color = result.status === 'ok' ? '\x1b[32m' : result.status === 'warning' ? '\x1b[33m' : '\x1b[31m'
    console.log(`${color}${icon}\x1b[0m ${result.name}: ${result.message}`)
  })
  
  console.log('\n' + '='.repeat(50))
  console.log(`✓ OK: ${ok} | ⚠ Waarschuwingen: ${warnings} | ❌ Fouten: ${errors}`)
  
  if (errors > 0) {
    console.log('\n❌ Er zijn fouten gevonden. Controleer de bovenstaande meldingen.')
    process.exit(1)
  } else if (warnings > 0) {
    console.log('\n⚠️  Er zijn waarschuwingen. Controleer de bovenstaande meldingen.')
    process.exit(0)
  } else {
    console.log('\n✅ Alles ziet er goed uit!')
    process.exit(0)
  }
}

main().catch(error => {
  console.error('❌ Onverwachte fout:', error)
  process.exit(1)
})
