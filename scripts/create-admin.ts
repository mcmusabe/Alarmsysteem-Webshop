import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Fout: SUPABASE_SERVICE_ROLE_KEY is niet ingesteld in .env.local')
  console.error('   Voeg toe: SUPABASE_SERVICE_ROLE_KEY=your_service_role_key')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  const email = 'admin@alarmwebshop.nl'
  const password = 'Admin123!'
  
  console.log('🔐 Admin account aanmaken...')
  console.log(`📧 Email: ${email}`)
  console.log(`🔑 Wachtwoord: ${password}`)
  console.log('')

  try {
    // Maak gebruiker aan
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        role: 'admin',
        full_name: 'Admin User',
      },
    })

    if (authError) {
      // Check of gebruiker al bestaat
      if (authError.message.includes('already registered')) {
        console.log('⚠️  Gebruiker bestaat al, updaten naar admin...')
        
        // Haal gebruiker op
        const { data: users, error: listError } = await supabase.auth.admin.listUsers()
        if (listError) throw listError
        
        const existingUser = users.users.find(u => u.email === email)
        if (!existingUser) {
          throw new Error('Gebruiker niet gevonden')
        }

        // Update user metadata
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          {
            user_metadata: {
              role: 'admin',
              full_name: 'Admin User',
            },
          }
        )

        if (updateError) throw updateError

        console.log('✅ Gebruiker bijgewerkt naar admin!')
        console.log('')
        console.log('📋 Login gegevens:')
        console.log(`   Email: ${email}`)
        console.log(`   Wachtwoord: ${password}`)
        console.log('')
        console.log('🌐 Login op: http://localhost:3000/login')
        return
      }
      throw authError
    }

    if (!authData.user) {
      throw new Error('Geen gebruiker aangemaakt')
    }

    console.log('✅ Admin account succesvol aangemaakt!')
    console.log('')
    console.log('📋 Login gegevens:')
    console.log(`   Email: ${email}`)
    console.log(`   Wachtwoord: ${password}`)
    console.log('')
    console.log('🌐 Login op: http://localhost:3000/login')
    console.log('')
    console.log('⚠️  Let op: Bewaar deze gegevens veilig!')
  } catch (error) {
    console.error('❌ Fout bij aanmaken admin account:', error)
    process.exit(1)
  }
}

createAdminUser()
