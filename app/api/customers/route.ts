import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { naam, email, telefoon } = body

    if (!naam || !email) {
      return NextResponse.json(
        { success: false, error: 'Naam en email zijn verplicht' },
        { status: 400 }
      )
    }

    // Check of customer al bestaat
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single()

    if (existingCustomer) {
      return NextResponse.json({
        success: true,
        data: { id: existingCustomer.id },
      })
    }

    // Maak nieuwe customer aan
    const { data: customer, error } = await supabase
      .from('customers')
      .insert({
        naam,
        email,
        telefoon: telefoon || null,
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: customer,
    })
  } catch (error) {
    console.error('Fout bij aanmaken customer:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}
