'use client'

import { ReactNode } from 'react'
import ProgressBar from './ProgressBar'

interface WizardProps {
  currentStep: number
  totalSteps: number
  children: ReactNode
}

export default function Wizard({ currentStep, totalSteps, children }: WizardProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  )
}
