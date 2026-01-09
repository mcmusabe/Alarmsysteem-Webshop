'use client'

import { useState } from 'react'
import { useConfiguratorStore } from '@/lib/configurator/state'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function Stap5Upload() {
  const { plattegrondUrl, afbeeldingenUrls, setPlattegrondUrl, setAfbeeldingenUrls } = useConfiguratorStore()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'plattegrond' | 'afbeeldingen') => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError(null)

    try {
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        // Validatie
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
        if (!validTypes.includes(file.type)) {
          throw new Error(`Bestandstype ${file.type} niet toegestaan. Alleen JPG, PNG en PDF zijn toegestaan.`)
        }

        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`Bestand ${file.name} is te groot. Maximaal 10MB per bestand.`)
        }

        // Upload naar Supabase Storage
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `configuraties/${fileName}`

        const { error: uploadError, data } = await supabase.storage
          .from('uploads')
          .upload(filePath, file)

        if (uploadError) {
          // Betere error messages
          if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('not found')) {
            throw new Error('Storage bucket "uploads" bestaat niet. Maak deze aan via het Supabase dashboard.')
          }
          throw new Error(`Upload fout: ${uploadError.message}`)
        }

        // Haal public URL op
        const { data: urlData } = supabase.storage
          .from('uploads')
          .getPublicUrl(filePath)

        uploadedUrls.push(urlData.publicUrl)
      }

      if (type === 'plattegrond') {
        setPlattegrondUrl(uploadedUrls[0])
      } else {
        setAfbeeldingenUrls(uploadedUrls)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout bij upload')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-medium text-black mb-4">
        Plattegrond en afbeeldingen (Optioneel)
      </h2>
      <p className="text-gray-800 mb-8">
        Upload eventueel een plattegrond of afbeeldingen om ons te helpen bij de installatie.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-medium mb-4">Plattegrond</h3>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileUpload(e, 'plattegrond')}
            disabled={uploading}
            className="mb-4"
          />
          {plattegrondUrl && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-800">Geüpload:</p>
              <a href={plattegrondUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:underline font-medium">
                Bekijk bestand
              </a>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-xl font-medium mb-4">Afbeeldingen</h3>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple
            onChange={(e) => handleFileUpload(e, 'afbeeldingen')}
            disabled={uploading}
            className="mb-4"
          />
          {afbeeldingenUrls && afbeeldingenUrls.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-800">Geüploade bestanden:</p>
              {afbeeldingenUrls.map((url, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-black hover:underline text-sm font-medium">
                    Bestand {index + 1}
                  </a>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-800">
          <strong>Let op:</strong> Alleen JPG, PNG en PDF bestanden zijn toegestaan. Maximaal 10MB per bestand.
        </p>
      </div>

      {uploading && (
        <div className="mt-4 text-center">
          <p className="text-gray-800">Uploaden...</p>
        </div>
      )}
    </div>
  )
}
