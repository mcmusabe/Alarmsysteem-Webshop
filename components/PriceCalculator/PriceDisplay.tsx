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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-5 rounded-2xl shadow-2xl sticky top-4 border border-gray-700/50 backdrop-blur-sm max-h-[calc(100vh-2rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Prijs Indicatie
        </h3>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      {/* Total Price - Large and prominent */}
      <div className="text-center mb-5 pb-5 border-b border-gray-700/50">
        <div className="w-full text-4xl md:text-5xl font-black mb-2 text-white leading-none tracking-tight break-words">
          {formatPrice(resultaat.totaalPrijs)}
        </div>
        <p className="text-sm text-gray-400 mt-1.5">Inclusief BTW en installatie</p>
      </div>
      
      {/* Breakdown - Alleen componenten en installatie, geen individuele prijzen */}
      <div className="space-y-3">
        {/* Componenten */}
        <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/30 hover:border-gray-600/50 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-gray-200 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Componenten
            </span>
            <span className="text-base font-bold text-white">{formatPrice(resultaat.subtotaalComponenten)}</span>
          </div>
        </div>
        
        {/* Installatie */}
        <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/30 hover:border-gray-600/50 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-gray-200 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Installatie
            </span>
            <span className="text-base font-bold text-white">{formatPrice(resultaat.subtotaalInstallatie)}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1.5 ml-6">{resultaat.installatieUren} uur werk</p>
        </div>
      </div>
    </div>
  )
}
