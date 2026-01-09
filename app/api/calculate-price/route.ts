import { NextRequest, NextResponse } from 'next/server'
import { berekenPrijs } from '@/lib/pricing/calculator'
import { fetchProductPrices } from '@/lib/pricing/fetcher'
import { validateConfiguration } from '@/lib/validation'
import { ConfigurationInput } from '@/lib/pricing/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ConfigurationInput
    
    // Validatie
    const validation = validateConfiguration(body)
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Ongeldige configuratie', 
          details: validation.errors 
        },
        { status: 400 }
      )
    }
    
    // Haal prijzen op
    const prijzen = await fetchProductPrices()
    
    // Prijs berekenen
    const resultaat = berekenPrijs(body, prijzen)
    
    return NextResponse.json({
      success: true,
      data: resultaat,
    })
  } catch (error) {
    console.error('Fout bij prijsberekening:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout' 
      },
      { status: 500 }
    )
  }
}
