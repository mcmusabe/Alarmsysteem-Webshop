import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const datum = searchParams.get('datum')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100

    let query = supabase
      .from('appointments')
      .select(
        `
        *,
        customers (
          id,
          naam,
          email,
          telefoon
        ),
        orders (
          id,
          ordernummer
        )
      `
      )
      .order('datum', { ascending: true })
      .order('tijd', { ascending: true })
      .limit(limit)

    if (status) {
      query = query.eq('status', status)
    }

    if (datum) {
      query = query.eq('datum', datum)
    }

    const { data: appointments, error } = await query

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: appointments || [],
    })
  } catch (error) {
    console.error('Fout bij ophalen appointments:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { id, status, datum, tijd, opmerkingen } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is verplicht' }, { status: 400 })
    }

    const updateData: any = { updated_at: new Date().toISOString() }
    if (status) updateData.status = status
    if (datum) updateData.datum = datum
    if (tijd) updateData.tijd = tijd
    if (opmerkingen !== undefined) updateData.opmerkingen = opmerkingen

    const { data, error } = await supabase
      .from('appointments')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Fout bij updaten appointment:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}
