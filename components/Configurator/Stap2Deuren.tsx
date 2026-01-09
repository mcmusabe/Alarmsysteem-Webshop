'use client'

import { useConfiguratorStore } from '@/lib/configurator/state'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function Stap2Deuren() {
  const { aantalDeuren, setAantalDeuren } = useConfiguratorStore()

  const handleIncrement = () => {
    if (aantalDeuren < 100) {
      setAantalDeuren(aantalDeuren + 1)
    }
  }

  const handleDecrement = () => {
    if (aantalDeuren > 0) {
      setAantalDeuren(aantalDeuren - 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    if (value >= 0 && value <= 100) {
      setAantalDeuren(value)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-medium text-black mb-4">
        Hoeveel deuren heeft u?
      </h2>
      <p className="text-gray-800 mb-8">
        Geef aan hoeveel deuren u wilt beveiligen met deurcontacten.
      </p>

      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            variant="outline"
            onClick={handleDecrement}
            disabled={aantalDeuren === 0}
            className="w-12 h-12 text-2xl"
          >
            −
          </Button>
          
          <div className="text-center">
            <Input
              type="number"
              min="0"
              max="100"
              value={aantalDeuren}
              onChange={handleChange}
              className="text-center text-4xl font-bold w-32"
            />
            <p className="text-sm text-gray-500 mt-2">deuren</p>
          </div>

          <Button
            variant="outline"
            onClick={handleIncrement}
            disabled={aantalDeuren === 100}
            className="w-12 h-12 text-2xl"
          >
            +
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Minimaal 0, maximaal 100 deuren
        </p>
      </div>
    </div>
  )
}
