import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const datum = searchParams.get('datum')

    if (!datum) {
      return NextResponse.json(
        { success: false, error: 'Datum parameter is verplicht' },
        { status: 400 }
      )
    }

    // Haal alle geboekte afspraken op voor deze datum
    const { data: geboekteAfspraken, error } = await supabase
      .from('appointments')
      .select('tijd')
      .eq('datum', datum)
      .eq('status', 'gepland')

    if (error) {
      throw error
    }

    // Genereer beschikbare tijdslots (9:00 - 17:00, elk uur)
    const beschikbareTijden: string[] = []
    const geboekteTijden = geboekteAfspraken?.map(a => a.tijd) || []

    for (let uur = 9; uur <= 16; uur++) {
      const tijd = `${uur.toString().padStart(2, '0')}:00`
      if (!geboekteTijden.includes(tijd)) {
        beschikbareTijden.push(tijd)
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        datum,
        beschikbareTijden,
      },
    })
  } catch (error) {
    console.error('Fout bij ophalen beschikbare slots:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}
