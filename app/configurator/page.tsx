'use client'

import { useConfiguratorStore } from '@/lib/configurator/state'
import Wizard from '@/components/Configurator/Wizard'
import Stap1TypeSelector from '@/components/Configurator/Stap1TypeSelector'
import Stap2Deuren from '@/components/Configurator/Stap2Deuren'
import Stap3Ruimtes from '@/components/Configurator/Stap3Ruimtes'
import Stap4Kleur from '@/components/Configurator/Stap4Kleur'
import Stap5Upload from '@/components/Configurator/Stap5Upload'
import Stap6Overzicht from '@/components/Configurator/Stap6Overzicht'
import Button from '@/components/ui/Button'

const TOTAL_STEPS = 6

export default function ConfiguratorPage() {
  const { currentStep, setCurrentStep } = useConfiguratorStore()

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Stap1TypeSelector />
      case 2:
        return <Stap2Deuren />
      case 3:
        return <Stap3Ruimtes />
      case 4:
        return <Stap4Kleur />
      case 5:
        return <Stap5Upload />
      case 6:
        return <Stap6Overzicht />
      default:
        return <Stap1TypeSelector />
    }
  }

  return (
    <Wizard currentStep={currentStep} totalSteps={TOTAL_STEPS}>
      <div className="bg-white rounded-lg shadow-lg p-8">
        {renderStep()}
        
        {currentStep < TOTAL_STEPS && (
          <div className="flex justify-between mt-8 pt-8 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Vorige
            </Button>
            <Button
              variant="accent"
              onClick={handleNext}
            >
              Volgende
            </Button>
          </div>
        )}
      </div>
    </Wizard>
  )
}
