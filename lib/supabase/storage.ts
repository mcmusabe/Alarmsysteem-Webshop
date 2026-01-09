import { createClient } from './client'

/**
 * Upload een bestand naar Supabase Storage
 */
export async function uploadFile(
  file: File,
  bucket: string = 'uploads'
): Promise<{ url: string; path: string }> {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `configuraties/${fileName}`

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (uploadError) {
    throw new Error(`Upload fout: ${uploadError.message}`)
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return {
    url: urlData.publicUrl,
    path: filePath,
  }
}
