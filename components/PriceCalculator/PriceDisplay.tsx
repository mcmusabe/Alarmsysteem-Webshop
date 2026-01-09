'use client'

import { PriceCalculationResult } from '@/lib/pricing/types'

interface PriceDisplayProps {
  resultaat: PriceCalculationResult
}

export default function PriceDisplay({ resultaat }: PriceDisplayProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 rounded-xl shadow-2xl sticky top-4 border border-gray-800/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Prijs Indicatie
        </h3>
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
      </div>
      
      {/* Total Price - Large and prominent */}
      <div className="text-center mb-6 pb-6 border-b border-gray-800">
        <div className="text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
          {formatPrice(resultaat.totaalPrijs)}
        </div>
        <p className="text-sm text-gray-400">Inclusief BTW en installatie</p>
      </div>
      
      {/* Breakdown */}
      <div className="space-y-4">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Componenten
            </span>
            <span className="text-lg font-semibold">{formatPrice(resultaat.subtotaalComponenten)}</span>
          </div>
        </div>
        
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Installatie
            </span>
            <span className="text-lg font-semibold">{formatPrice(resultaat.subtotaalInstallatie)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{resultaat.installatieUren} uur werk</p>
        </div>
        
        {/* Total */}
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg p-4 border-2 border-accent/30 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Totaal
            </span>
            <span className="text-2xl font-black text-accent">{formatPrice(resultaat.totaalPrijs)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
