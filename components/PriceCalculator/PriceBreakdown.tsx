'use client'

import { PriceCalculationResult } from '@/lib/pricing/types'
import Card from '@/components/ui/Card'

interface PriceBreakdownProps {
  resultaat: PriceCalculationResult
}

export default function PriceBreakdown({ resultaat }: PriceBreakdownProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  return (
    <Card>
      <h3 className="text-xl font-medium mb-4">Prijs Details</h3>
      
      <div className="space-y-3">
        {resultaat.componenten.deurcontacten > 0 && (
          <div className="flex justify-between">
            <span>Deurcontacten ({resultaat.componenten.deurcontacten}x):</span>
            <span className="font-semibold">
              {resultaat.prijsDetails.deurcontactenPrijs > 0 
                ? formatPrice(resultaat.prijsDetails.deurcontactenPrijs)
                : 'Gratis'}
            </span>
          </div>
        )}
        
        {resultaat.componenten.pirSensoren > 0 && (
          <div className="flex justify-between">
            <span>PIR Sensoren ({resultaat.componenten.pirSensoren}x):</span>
            <span className="font-semibold">{formatPrice(resultaat.prijsDetails.pirSensorenPrijs)}</span>
          </div>
        )}
        
        {resultaat.componenten.alarmcentrale > 0 && (
          <div className="flex justify-between">
            <span>Alarmcentrale:</span>
            <span className="font-semibold">Inbegrepen</span>
          </div>
        )}
        
        {resultaat.componenten.flitser > 0 && (
          <div className="flex justify-between">
            <span>Flitser:</span>
            <span className="font-semibold">Inbegrepen</span>
          </div>
        )}
        
        {resultaat.componenten.sirene > 0 && (
          <div className="flex justify-between">
            <span>Sirene:</span>
            <span className="font-semibold">Inbegrepen</span>
          </div>
        )}
        
        {resultaat.componenten.bedienpaneel > 0 && (
          <div className="flex justify-between">
            <span>Bedienpaneel:</span>
            <span className="font-semibold">Inbegrepen</span>
          </div>
        )}
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between">
            <span>Installatie ({resultaat.installatieUren} uur):</span>
            <span className="font-semibold">{formatPrice(resultaat.subtotaalInstallatie)}</span>
          </div>
        </div>
        
        <div className="border-t-2 border-black pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Totaal:</span>
            <span>{formatPrice(resultaat.totaalPrijs)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
