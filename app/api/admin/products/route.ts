import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('naam', { ascending: true })

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: products || [],
    })
  } catch (error) {
    console.error('Fout bij ophalen products:', error)
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
    const { id, prijs } = body

    if (!id || prijs === undefined) {
      return NextResponse.json(
        { success: false, error: 'ID en prijs zijn verplicht' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('products')
      .update({ prijs: parseFloat(prijs), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Fout bij updaten product:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}
