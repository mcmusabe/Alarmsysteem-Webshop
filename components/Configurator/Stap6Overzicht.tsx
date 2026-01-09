'use client'

import { useConfiguratorStore } from '@/lib/configurator/state'
import { usePriceCalculation } from '@/hooks/usePriceCalculation'
import PriceDisplay from '@/components/PriceCalculator/PriceDisplay'
import PriceBreakdown from '@/components/PriceCalculator/PriceBreakdown'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function Stap6Overzicht() {
  const configuratie = useConfiguratorStore()
  const { prijsResultaat, isCalculating, error } = usePriceCalculation(configuratie)

  return (
    <div>
      <h2 className="text-3xl font-medium text-black mb-4">
        Overzicht van uw configuratie
      </h2>
      <p className="text-gray-800 mb-8">
        Controleer uw keuzes en kies of u wilt kopen of huren.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Configuratie Samenvatting */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-xl font-medium mb-4">Uw Configuratie</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-800">Type:</span>
                <span className="font-semibold capitalize">{configuratie.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Aantal deuren:</span>
                <span className="font-semibold">{configuratie.aantalDeuren}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Aantal ruimtes:</span>
                <span className="font-semibold">{configuratie.aantalRuimtes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Kleur:</span>
                <span className="font-semibold capitalize">{configuratie.kleur}</span>
              </div>
              {configuratie.plattegrondUrl && (
                <div className="flex justify-between">
                  <span className="text-gray-800">Plattegrond:</span>
                  <span className="font-semibold text-green-600">✓ Geüpload</span>
                </div>
              )}
              {configuratie.afbeeldingenUrls && configuratie.afbeeldingenUrls.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-800">Afbeeldingen:</span>
                  <span className="font-semibold text-green-600">
                    ✓ {configuratie.afbeeldingenUrls.length} bestand(en)
                  </span>
                </div>
              )}
            </div>
          </Card>

          {prijsResultaat && <PriceBreakdown resultaat={prijsResultaat} />}
        </div>

        {/* Prijs Display Sidebar */}
        <div className="lg:col-span-1">
          {isCalculating && (
            <Card>
              <p className="text-center text-gray-800">Prijs wordt berekend...</p>
            </Card>
          )}
          
          {error && (
            <Card>
              <p className="text-center text-red-600">Fout: {error}</p>
            </Card>
          )}
          
          {prijsResultaat && <PriceDisplay resultaat={prijsResultaat} />}
        </div>
      </div>

      {/* Actie Knoppen */}
      <div className="space-y-4">
        {/* Bewerken knoppen */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="ghost"
            onClick={() => configuratie.setCurrentStep(1)}
            className="text-sm"
          >
            ← Bewerk Type
          </Button>
          <Button
            variant="ghost"
            onClick={() => configuratie.setCurrentStep(2)}
            className="text-sm"
          >
            ← Bewerk Deuren
          </Button>
          <Button
            variant="ghost"
            onClick={() => configuratie.setCurrentStep(3)}
            className="text-sm"
          >
            ← Bewerk Ruimtes
          </Button>
          <Button
            variant="ghost"
            onClick={() => configuratie.setCurrentStep(4)}
            className="text-sm"
          >
            ← Bewerk Kleur
          </Button>
        </div>

        {/* Bestel knoppen */}
        {prijsResultaat && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/bestellen?type=kopen" className="w-full">
              <Button variant="accent" size="lg" className="w-full">
                Bestellen - Kopen
              </Button>
            </Link>
            <Link href="/bestellen?type=huren" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                Bestellen - Huren
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
