import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: settings, error } = await supabase
      .from('settings')
      .select('*')
      .order('key', { ascending: true })

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: settings || [],
    })
  } catch (error) {
    console.error('Fout bij ophalen settings:', error)
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
    const { key, value } = body

    if (!key || value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Key en value zijn verplicht' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('settings')
      .update({ value: String(value), updated_at: new Date().toISOString() })
      .eq('key', key)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Fout bij updaten setting:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}
