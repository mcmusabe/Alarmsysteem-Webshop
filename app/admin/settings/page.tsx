'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/ToastContainer'
import Spinner from '@/components/ui/Spinner'
import Skeleton from '@/components/ui/Skeleton'

interface Setting {
  id: string
  key: string
  value: string
  beschrijving?: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      if (data.success) {
        setSettings(data.data)
      } else {
        showToast(data.error || 'Fout bij laden van instellingen', 'error')
      }
    } catch (error) {
      console.error('Fout bij ophalen settings:', error)
      showToast('Fout bij laden van instellingen', 'error')
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (setting: Setting) => {
    setEditingId(setting.id)
    setEditValue(setting.value)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const saveSetting = async (key: string) => {
    if (!editValue.trim()) {
      showToast('Waarde mag niet leeg zijn', 'error')
      return
    }

    setSavingKey(key)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: editValue }),
      })
      const data = await response.json()
      if (data.success) {
        showToast('Instelling bijgewerkt', 'success')
        fetchSettings()
        cancelEdit()
      } else {
        showToast(data.error || 'Fout bij updaten instelling', 'error')
      }
    } catch (error) {
      console.error('Fout bij updaten setting:', error)
      showToast('Fout bij updaten instelling', 'error')
    } finally {
      setSavingKey(null)
    }
  }

  if (loading) {
    return (
      <div>
        <Skeleton width={300} height={40} className="mb-8" />
        <Card>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <Skeleton width={200} height={24} className="mb-2" />
                <Skeleton width={150} height={20} className="mb-2" />
                <Skeleton width={300} height={40} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-medium text-black mb-8">Instellingen</h1>

      <Card>
        {settings.length === 0 ? (
          <p className="text-gray-600 py-8 text-center">Geen instellingen gevonden</p>
        ) : (
          <div className="space-y-4">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-black mb-1">{setting.key}</h3>
                    {setting.beschrijving && (
                      <p className="text-sm text-gray-600 mb-2">{setting.beschrijving}</p>
                    )}
                    {editingId === setting.id ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              saveSetting(setting.key)
                            } else if (e.key === 'Escape') {
                              cancelEdit()
                            }
                          }}
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          autoFocus
                        />
                        {savingKey === setting.key ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            <Button
                              variant="accent"
                              size="sm"
                              onClick={() => saveSetting(setting.key)}
                            >
                              Opslaan
                            </Button>
                            <Button variant="ghost" size="sm" onClick={cancelEdit}>
                              Annuleren
                            </Button>
                          </>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-800 font-medium mt-2">{setting.value}</p>
                    )}
                  </div>
                  {editingId !== setting.id && (
                    <Button variant="outline" size="sm" onClick={() => startEdit(setting)}>
                      Bewerken
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
