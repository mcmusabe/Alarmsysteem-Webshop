'use client'

import { PriceCalculationResult } from '@/lib/pricing/types'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Separator from '@/components/ui/Separator'

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

  // Bepaal font size op basis van prijs lengte
  const priceString = formatPrice(resultaat.totaalPrijs)
  const priceLength = priceString.length
  const getPriceFontSize = () => {
    if (priceLength <= 8) return 'text-3xl sm:text-4xl'
    if (priceLength <= 10) return 'text-2xl sm:text-3xl'
    return 'text-xl sm:text-2xl'
  }

  return (
    <Card
      variant="solid"
      className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto min-w-[300px] w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white border-gray-700/50"
      header={
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Prijs Indicatie
          </h3>
          <Badge color="success" variant="solid" size="xs" square>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </Badge>
        </div>
      }
    >
      {/* Total Price - Large and prominent */}
      <div className="text-center mb-5 pb-5 px-3">
        <Separator color="neutral" size="sm" className="mb-5 border-gray-700/50" />
        <div className={`w-full ${getPriceFontSize()} font-black mb-2 text-white leading-tight tracking-tight break-words overflow-wrap-anywhere`}>
          {priceString}
        </div>
        <p className="text-sm text-gray-400 mt-1.5">Inclusief BTW en installatie</p>
      </div>
      
      {/* Breakdown - Alleen componenten en installatie */}
      <div className="space-y-3">
        {/* Componenten */}
        <Card variant="subtle" className="bg-gray-800/60 border-gray-700/30 hover:border-gray-600/50 transition-colors p-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-200 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Componenten
            </span>
            <Badge color="neutral" variant="solid" size="sm" className="bg-gray-700 text-white">
              {formatPrice(resultaat.subtotaalComponenten)}
            </Badge>
          </div>
        </Card>
        
        {/* Installatie */}
        <Card variant="subtle" className="bg-gray-800/60 border-gray-700/30 hover:border-gray-600/50 transition-colors p-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-200 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Installatie
            </span>
            <Badge color="neutral" variant="solid" size="sm" className="bg-gray-700 text-white">
              {formatPrice(resultaat.subtotaalInstallatie)}
            </Badge>
          </div>
          <p className="text-xs text-gray-400 mt-1.5 ml-6">{resultaat.installatieUren} uur werk</p>
        </Card>
      </div>
      
      {/* Total Footer */}
      <div className="mt-5 pt-5">
        <Card variant="solid" className="bg-green-600/20 border-green-500/30 p-3">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Totaal
            </span>
            <span className="text-lg font-bold text-green-500">{priceString}</span>
          </div>
        </Card>
      </div>
    </Card>
  )
}
