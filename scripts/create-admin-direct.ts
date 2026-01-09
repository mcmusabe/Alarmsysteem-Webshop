import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Fout: NEXT_PUBLIC_SUPABASE_URL of NEXT_PUBLIC_SUPABASE_ANON_KEY ontbreekt')
  process.exit(1)
}

// Gebruik anon key voor normale client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminViaSignUp() {
  const email = 'admin@alarmwebshop.nl'
  const password = 'Admin123!'
  
  console.log('🔐 Admin account aanmaken via signup...')
  console.log(`📧 Email: ${email}`)
  console.log(`🔑 Wachtwoord: ${password}`)
  console.log('')
  
  try {
    // Probeer eerst in te loggen om te zien of gebruiker al bestaat
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (signInData.user) {
      console.log('✅ Gebruiker bestaat al!')
      console.log('📋 Login gegevens:')
      console.log(`   Email: ${email}`)
      console.log(`   Wachtwoord: ${password}`)
      console.log('')
      console.log('⚠️  Let op: Gebruiker heeft mogelijk nog geen admin rol.')
      console.log('   Update de user_metadata in Supabase Dashboard naar: {"role": "admin"}')
      return
    }
    
    // Maak nieuwe gebruiker aan
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'admin',
          full_name: 'Admin User',
        },
      },
    })
    
    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        console.log('⚠️  Gebruiker bestaat al, probeer in te loggen...')
        console.log('📋 Login gegevens:')
        console.log(`   Email: ${email}`)
        console.log(`   Wachtwoord: ${password}`)
        return
      }
      throw signUpError
    }
    
    if (!signUpData.user) {
      throw new Error('Geen gebruiker aangemaakt')
    }
    
    console.log('✅ Admin account succesvol aangemaakt!')
    console.log('')
    console.log('📋 Login gegevens:')
    console.log(`   Email: ${email}`)
    console.log(`   Wachtwoord: ${password}`)
    console.log('')
    console.log('⚠️  Let op:')
    console.log('   1. Check je email voor verificatie (als email confirmation aan staat)')
    console.log('   2. Update user_metadata in Supabase Dashboard naar: {"role": "admin"}')
    console.log('   3. Of gebruik het create-admin script met Service Role Key')
    console.log('')
    console.log('🌐 Login op: http://localhost:3000/login')
  } catch (error) {
    console.error('❌ Fout bij aanmaken admin account:', error)
    console.error('')
    console.error('💡 Oplossing:')
    console.error('   1. Haal Service Role Key op uit Supabase Dashboard')
    console.error('   2. Voeg toe aan .env.local: SUPABASE_SERVICE_ROLE_KEY=...')
    console.error('   3. Voer uit: npm run create-admin')
    process.exit(1)
  }
}

createAdminViaSignUp()
