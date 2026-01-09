'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface TimeSlotSelectorProps {
  datum: string
  onTimeSelect: (time: string) => void
  selectedTime?: string
}

export default function TimeSlotSelector({ datum, onTimeSelect, selectedTime }: TimeSlotSelectorProps) {
  const [beschikbareTijden, setBeschikbareTijden] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!datum) return

    setLoading(true)
    setError(null)

    fetch(`/api/appointments/available?datum=${datum}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBeschikbareTijden(data.data.beschikbareTijden)
        } else {
          setError(data.error || 'Fout bij ophalen beschikbare tijden')
        }
      })
      .catch((err) => {
        setError('Fout bij ophalen beschikbare tijden')
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [datum])

  if (!datum) {
    return (
      <Card>
        <p className="text-gray-500 text-center">Selecteer eerst een datum</p>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <p className="text-gray-500 text-center">Beschikbare tijden worden geladen...</p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <p className="text-red-600 text-center">{error}</p>
      </Card>
    )
  }

  if (beschikbareTijden.length === 0) {
    return (
      <Card>
        <p className="text-gray-500 text-center">Geen beschikbare tijden voor deze datum</p>
      </Card>
    )
  }

  return (
    <Card>
      <h3 className="text-xl font-heading font-bold mb-4">Beschikbare Tijden</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {beschikbareTijden.map((tijd) => (
          <Button
            key={tijd}
            variant={selectedTime === tijd ? 'accent' : 'outline'}
            onClick={() => onTimeSelect(tijd)}
            className="w-full"
          >
            {tijd}
          </Button>
        ))}
      </div>
    </Card>
  )
}
