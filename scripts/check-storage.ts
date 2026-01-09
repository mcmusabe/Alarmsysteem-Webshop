/**
 * Script om te controleren of de Supabase Storage bucket bestaat
 * Voer uit met: npx tsx scripts/check-storage.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kvcfjultqlxftokyxztj.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_MLlcpJ_CpMDiHsk0r-xj0A_LzGqmHbj'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkStorageBucket() {
  console.log('🔍 Controleren of storage bucket "uploads" bestaat...\n')

  try {
    // Probeer de bucket te gebruiken
    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (error) {
      console.error('❌ Fout bij ophalen buckets:', error.message)
      console.log('\n📝 Maak de bucket handmatig aan via het Supabase dashboard:')
      console.log('   https://supabase.com/dashboard/project/kvcfjultqlxftokyxztj/storage/buckets')
      return
    }

    const uploadsBucket = buckets?.find(bucket => bucket.name === 'uploads')

    if (uploadsBucket) {
      console.log('✅ Storage bucket "uploads" bestaat!')
      console.log(`   ID: ${uploadsBucket.id}`)
      console.log(`   Public: ${uploadsBucket.public ? 'Ja' : 'Nee'}`)
      
      if (!uploadsBucket.public) {
        console.log('\n⚠️  Waarschuwing: Bucket is niet public. Zet dit aan voor uploads.')
      }
    } else {
      console.log('❌ Storage bucket "uploads" bestaat niet!')
      console.log('\n📝 Maak de bucket aan via het Supabase dashboard:')
      console.log('   https://supabase.com/dashboard/project/kvcfjultqlxftokyxztj/storage/buckets')
      console.log('\n   Instellingen:')
      console.log('   - Naam: uploads')
      console.log('   - Public bucket: Aan')
      console.log('   - File size limit: 10 MB')
    }
  } catch (err) {
    console.error('❌ Onverwachte fout:', err)
  }
}

checkStorageBucket()
