'use client'

import { useConfiguratorStore } from '@/lib/configurator/state'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function Stap3Ruimtes() {
  const { aantalRuimtes, setAantalRuimtes } = useConfiguratorStore()

  const handleIncrement = () => {
    if (aantalRuimtes < 50) {
      setAantalRuimtes(aantalRuimtes + 1)
    }
  }

  const handleDecrement = () => {
    if (aantalRuimtes > 1) {
      setAantalRuimtes(aantalRuimtes - 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    if (value >= 1 && value <= 50) {
      setAantalRuimtes(value)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-medium text-black mb-4">
        Hoeveel ruimtes heeft u?
      </h2>
      <p className="text-gray-800 mb-8">
        Geef aan hoeveel ruimtes u wilt beveiligen met PIR sensoren.
      </p>

      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            variant="outline"
            onClick={handleDecrement}
            disabled={aantalRuimtes === 1}
            className="w-12 h-12 text-2xl"
          >
            −
          </Button>
          
          <div className="text-center">
            <Input
              type="number"
              min="1"
              max="50"
              value={aantalRuimtes}
              onChange={handleChange}
              className="text-center text-4xl font-bold w-32"
            />
            <p className="text-sm text-gray-500 mt-2">ruimtes</p>
          </div>

          <Button
            variant="outline"
            onClick={handleIncrement}
            disabled={aantalRuimtes === 50}
            className="w-12 h-12 text-2xl"
          >
            +
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Minimaal 1, maximaal 50 ruimtes
        </p>
      </div>
    </div>
  )
}
