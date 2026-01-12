'use client'

import { useConfiguratorStore } from '@/lib/configurator/state'
import Card from '@/components/ui/Card'

export default function Stap1TypeSelector() {
  const { type, setType } = useConfiguratorStore()

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-medium text-black mb-3 sm:mb-4">
        Wat voor type pand heeft u?
      </h2>
      <p className="text-sm sm:text-base text-gray-800 mb-6 sm:mb-8">
        Selecteer of u een alarmsysteem nodig heeft voor een woning of bedrijf.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card
          variant={type === 'woning' ? 'elevated' : 'default'}
          className={`cursor-pointer transition-all touch-manipulation active:scale-[0.98] ${
            type === 'woning' ? 'ring-2 ring-black' : ''
          }`}
          onClick={() => setType('woning')}
        >
          <div className="text-center p-4 sm:p-6">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🏠</div>
            <h3 className="text-xl sm:text-2xl font-medium mb-2">Woning</h3>
            <p className="text-sm sm:text-base text-gray-800">
              Voor particuliere woningen en appartementen
            </p>
          </div>
        </Card>

        <Card
          variant={type === 'bedrijf' ? 'elevated' : 'default'}
          className={`cursor-pointer transition-all touch-manipulation active:scale-[0.98] ${
            type === 'bedrijf' ? 'ring-2 ring-black' : ''
          }`}
          onClick={() => setType('bedrijf')}
        >
          <div className="text-center p-4 sm:p-6">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🏢</div>
            <h3 className="text-xl sm:text-2xl font-medium mb-2">Bedrijf</h3>
            <p className="text-sm sm:text-base text-gray-800">
              Voor kantoren, winkels en bedrijfspanden
            </p>
            <p className="text-xs sm:text-sm text-accent mt-2 font-semibold">
              Inclusief: Alarmcentrale, Flitser, Sirene & Bedienpaneel
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
