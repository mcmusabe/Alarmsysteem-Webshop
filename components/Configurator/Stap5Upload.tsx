'use client'

import { useState, useRef } from 'react'
import { useConfiguratorStore } from '@/lib/configurator/state'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function Stap5Upload() {
  const { plattegrondUrl, afbeeldingenUrls, setPlattegrondUrl, setAfbeeldingenUrls } = useConfiguratorStore()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState<'plattegrond' | 'afbeeldingen' | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const plattegrondInputRef = useRef<HTMLInputElement>(null)
  const afbeeldingenInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFiles = async (files: FileList | File[], type: 'plattegrond' | 'afbeeldingen') => {
    if (!files || files.length === 0) return

    setUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      const uploadedUrls: string[] = []
      const fileArray = Array.from(files)
      const totalFiles = fileArray.length

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i]
        
        // Validatie
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
        if (!validTypes.includes(file.type)) {
          throw new Error(`Bestandstype niet toegestaan. Alleen JPG, PNG en PDF zijn toegestaan.`)
        }

        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`Bestand "${file.name}" is te groot. Maximaal 10MB per bestand.`)
        }

        // Upload naar Supabase Storage
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `configuraties/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, file)

        if (uploadError) {
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
        setUploadProgress(((i + 1) / totalFiles) * 100)
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
      setUploadProgress(0)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'plattegrond' | 'afbeeldingen') => {
    if (e.target.files) {
      handleFiles(e.target.files, type)
    }
  }

  const handleDrag = (e: React.DragEvent, type: 'plattegrond' | 'afbeeldingen') => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(type)
    } else if (e.type === 'dragleave') {
      setDragActive(null)
    }
  }

  const handleDrop = (e: React.DragEvent, type: 'plattegrond' | 'afbeeldingen') => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(null)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (type === 'plattegrond' && e.dataTransfer.files.length > 1) {
        setError('Plattegrond: selecteer slechts één bestand')
        return
      }
      handleFiles(e.dataTransfer.files, type)
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
        {/* Plattegrond Upload */}
        <Card>
          <h3 className="text-xl font-medium mb-4">Plattegrond</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive === 'plattegrond'
                ? 'border-accent bg-accent/5'
                : plattegrondUrl
                ? 'border-green-300 bg-green-50/50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={(e) => handleDrag(e, 'plattegrond')}
            onDragLeave={(e) => handleDrag(e, 'plattegrond')}
            onDragOver={(e) => handleDrag(e, 'plattegrond')}
            onDrop={(e) => handleDrop(e, 'plattegrond')}
          >
            <input
              ref={plattegrondInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileUpload(e, 'plattegrond')}
              disabled={uploading}
              className="hidden"
            />
            
            {plattegrondUrl ? (
              <div className="space-y-3">
                <div className="text-green-600 text-4xl mb-2">✓</div>
                <p className="text-sm font-medium text-gray-800">Bestand geüpload</p>
                <a
                  href={plattegrondUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline text-sm font-medium inline-block"
                >
                  Bekijk bestand
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPlattegrondUrl(undefined)
                    if (plattegrondInputRef.current) plattegrondInputRef.current.value = ''
                  }}
                  className="mt-2"
                >
                  Verwijder
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Sleep een bestand hierheen of
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => plattegrondInputRef.current?.click()}
                    disabled={uploading}
                  >
                    Bestand kiezen
                  </Button>
                </div>
                <p className="text-xs text-gray-500">JPG, PNG of PDF • Max 10MB</p>
              </div>
            )}
          </div>
        </Card>

        {/* Afbeeldingen Upload */}
        <Card>
          <h3 className="text-xl font-medium mb-4">Afbeeldingen</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive === 'afbeeldingen'
                ? 'border-accent bg-accent/5'
                : afbeeldingenUrls && afbeeldingenUrls.length > 0
                ? 'border-green-300 bg-green-50/50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={(e) => handleDrag(e, 'afbeeldingen')}
            onDragLeave={(e) => handleDrag(e, 'afbeeldingen')}
            onDragOver={(e) => handleDrag(e, 'afbeeldingen')}
            onDrop={(e) => handleDrop(e, 'afbeeldingen')}
          >
            <input
              ref={afbeeldingenInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              multiple
              onChange={(e) => handleFileUpload(e, 'afbeeldingen')}
              disabled={uploading}
              className="hidden"
            />
            
            {afbeeldingenUrls && afbeeldingenUrls.length > 0 ? (
              <div className="space-y-3">
                <div className="text-green-600 text-4xl mb-2">✓</div>
                <p className="text-sm font-medium text-gray-800">
                  {afbeeldingenUrls.length} bestand(en) geüpload
                </p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {afbeeldingenUrls.map((url, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded text-sm">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline font-medium"
                      >
                        Bestand {index + 1}
                      </a>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAfbeeldingenUrls(undefined)
                    if (afbeeldingenInputRef.current) afbeeldingenInputRef.current.value = ''
                  }}
                  className="mt-2"
                >
                  Verwijder alle
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Sleep bestanden hierheen of
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => afbeeldingenInputRef.current?.click()}
                    disabled={uploading}
                  >
                    Bestanden kiezen
                  </Button>
                </div>
                <p className="text-xs text-gray-500">JPG, PNG of PDF • Max 10MB per bestand</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Upload Progress */}
      {uploading && uploadProgress > 0 && (
        <div className="mt-6">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Uploaden... {Math.round(uploadProgress)}%
          </p>
        </div>
      )}

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
