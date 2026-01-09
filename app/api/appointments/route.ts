import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { customerId, orderId, datum, tijd, type, opmerkingen } = body

    // Valideer input
    if (!customerId || !datum || !tijd || !type) {
      return NextResponse.json(
        { success: false, error: 'Ontbrekende verplichte velden' },
        { status: 400 }
      )
    }

    // Controleer of slot nog beschikbaar is
    const { data: bestaandeAfspraak } = await supabase
      .from('appointments')
      .select('id')
      .eq('datum', datum)
      .eq('tijd', tijd)
      .eq('status', 'gepland')
      .single()

    if (bestaandeAfspraak) {
      return NextResponse.json(
        { success: false, error: 'Dit tijdslot is al geboekt' },
        { status: 409 }
      )
    }

    // Maak afspraak aan
    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert({
        customer_id: customerId,
        order_id: orderId || null,
        datum,
        tijd,
        type,
        opmerkingen: opmerkingen || null,
        status: 'gepland',
      })
      .select('id, datum, tijd')
      .single()

    if (error) {
      // Check voor unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'Dit tijdslot is al geboekt' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    console.error('Fout bij aanmaken afspraak:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}
