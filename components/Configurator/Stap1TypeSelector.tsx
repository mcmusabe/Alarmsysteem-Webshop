'use client'

import { useConfiguratorStore } from '@/lib/configurator/state'
import Card from '@/components/ui/Card'

export default function Stap1TypeSelector() {
  const { type, setType } = useConfiguratorStore()

  return (
    <div>
      <h2 className="text-3xl font-medium text-black mb-4">
        Wat voor type pand heeft u?
      </h2>
      <p className="text-gray-800 mb-8">
        Selecteer of u een alarmsysteem nodig heeft voor een woning of bedrijf.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          variant={type === 'woning' ? 'elevated' : 'default'}
          className={`cursor-pointer transition-all ${
            type === 'woning' ? 'ring-2 ring-black' : ''
          }`}
          onClick={() => setType('woning')}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-medium mb-2">Woning</h3>
            <p className="text-gray-800">
              Voor particuliere woningen en appartementen
            </p>
          </div>
        </Card>

        <Card
          variant={type === 'bedrijf' ? 'elevated' : 'default'}
          className={`cursor-pointer transition-all ${
            type === 'bedrijf' ? 'ring-2 ring-black' : ''
          }`}
          onClick={() => setType('bedrijf')}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-medium mb-2">Bedrijf</h3>
            <p className="text-gray-800">
              Voor kantoren, winkels en bedrijfspanden
            </p>
            <p className="text-sm text-accent mt-2 font-semibold">
              Inclusief: Alarmcentrale, Flitser, Sirene & Bedienpaneel
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
