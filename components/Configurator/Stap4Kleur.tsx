'use client'

import { useConfiguratorStore } from '@/lib/configurator/state'
import Card from '@/components/ui/Card'

export default function Stap4Kleur() {
  const { kleur, setKleur } = useConfiguratorStore()

  return (
    <div>
      <h2 className="text-3xl font-medium text-black mb-4">
        Welke kleur heeft uw voorkeur?
      </h2>
      <p className="text-gray-800 mb-8">
        Kies de kleur voor uw alarmsysteem componenten.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card
          variant={kleur === 'wit' ? 'elevated' : 'default'}
          className={`cursor-pointer transition-all ${
            kleur === 'wit' ? 'ring-2 ring-black' : ''
          }`}
          onClick={() => setKleur('wit')}
        >
          <div className="text-center">
            <div className="w-32 h-32 bg-white border-4 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">⚪</span>
            </div>
            <h3 className="text-2xl font-medium mb-2">Wit</h3>
            <p className="text-gray-800">
              Moderne, lichte uitstraling
            </p>
          </div>
        </Card>

        <Card
          variant={kleur === 'zwart' ? 'elevated' : 'default'}
          className={`cursor-pointer transition-all ${
            kleur === 'zwart' ? 'ring-2 ring-black' : ''
          }`}
          onClick={() => setKleur('zwart')}
        >
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-900 border-4 border-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">⚫</span>
            </div>
            <h3 className="text-2xl font-medium mb-2">Zwart</h3>
            <p className="text-gray-800">
              Professionele, discrete uitstraling
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
