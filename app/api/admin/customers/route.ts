import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100
    const search = searchParams.get('search')

    let query = supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (search) {
      query = query.or(`naam.ilike.%${search}%,email.ilike.%${search}%,telefoon.ilike.%${search}%`)
    }

    const { data: customers, error } = await query

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: customers || [],
    })
  } catch (error) {
    console.error('Fout bij ophalen customers:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}
