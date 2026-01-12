'use client'

import { useConfiguratorStore } from '@/lib/configurator/state'
import { usePriceCalculation } from '@/hooks/usePriceCalculation'
import PriceDisplay from '@/components/PriceCalculator/PriceDisplay'
import Card from '@/components/ui/Card'

export default function OrderSummary() {
  const configuratie = useConfiguratorStore()
  const { prijsResultaat } = usePriceCalculation(configuratie)

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-heading font-bold mb-4">Configuratie Samenvatting</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-800">Type:</span>
            <span className="font-semibold capitalize">{configuratie.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-800">Deuren:</span>
            <span className="font-semibold">{configuratie.aantalDeuren}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-800">Ruimtes:</span>
            <span className="font-semibold">{configuratie.aantalRuimtes}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-800">Kleur:</span>
            <span className="font-semibold capitalize">{configuratie.kleur}</span>
          </div>
        </div>
      </Card>

      {prijsResultaat && <PriceDisplay resultaat={prijsResultaat} />}
    </div>
  )
}
