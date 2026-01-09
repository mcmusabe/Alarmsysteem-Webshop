'use client'

import { useState, useEffect } from 'react'
import { ConfigurationInput, PriceCalculationResult } from '@/lib/pricing/types'

export function usePriceCalculation(configuratie: ConfigurationInput) {
  const [prijsResultaat, setPrijsResultaat] = useState<PriceCalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    setIsCalculating(true)
    setError(null)
    
    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/api/calculate-price', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(configuratie),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Fout bij prijsberekening')
        }

        if (data.success) {
          setPrijsResultaat(data.data)
        } else {
          throw new Error(data.error || 'Onbekende fout')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Onbekende fout')
        console.error('Fout bij prijsberekening:', err)
      } finally {
        setIsCalculating(false)
      }
    }, 100) // Kleine delay voor smooth UX
    
    return () => clearTimeout(timer)
  }, [
    configuratie.type,
    configuratie.aantalDeuren,
    configuratie.aantalRuimtes,
    configuratie.kleur,
  ])
  
  return {
    prijsResultaat,
    isCalculating,
    error,
  }
}
