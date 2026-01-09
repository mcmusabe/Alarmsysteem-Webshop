'use client'

import { create } from 'zustand'
import { ConfigurationInput } from '@/lib/pricing/types'

export interface ConfiguratorState extends ConfigurationInput {
  plattegrondUrl?: string
  afbeeldingenUrls?: string[]
  currentStep: number
  setType: (type: 'woning' | 'bedrijf') => void
  setAantalDeuren: (aantal: number) => void
  setAantalRuimtes: (aantal: number) => void
  setKleur: (kleur: 'zwart' | 'wit') => void
  setPlattegrondUrl: (url: string) => void
  setAfbeeldingenUrls: (urls: string[]) => void
  setCurrentStep: (step: number) => void
  reset: () => void
}

const initialState: ConfigurationInput = {
  type: 'woning',
  aantalDeuren: 0,
  aantalRuimtes: 1,
  kleur: 'wit',
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  ...initialState,
  currentStep: 1,
  plattegrondUrl: undefined,
  afbeeldingenUrls: undefined,
  
  setType: (type) => set({ type }),
  setAantalDeuren: (aantal) => set({ aantalDeuren: aantal }),
  setAantalRuimtes: (aantal) => set({ aantalRuimtes: aantal }),
  setKleur: (kleur) => set({ kleur }),
  setPlattegrondUrl: (url) => set({ plattegrondUrl: url }),
  setAfbeeldingenUrls: (urls) => set({ afbeeldingenUrls: urls }),
  setCurrentStep: (step) => set({ currentStep: step }),
  reset: () => set({ ...initialState, currentStep: 1 }),
}))
