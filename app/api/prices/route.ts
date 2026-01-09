import { NextResponse } from 'next/server'
import { fetchProductPrices } from '@/lib/pricing/fetcher'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // fetchProductPrices gebruikt nu interne caching
    const prices = await fetchProductPrices(true)

    return NextResponse.json(
      {
        success: true,
        data: prices,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error('Fout bij ophalen prijzen:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Onbekende fout',
      },
      { status: 500 }
    )
  }
}
