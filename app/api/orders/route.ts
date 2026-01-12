import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/orders/create'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.configuratie || !body.customer || !body.type) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ontbrekende verplichte velden',
        },
        { status: 400 }
      )
    }

    const result = await createOrder({
      configuratie: body.configuratie,
      customer: body.customer,
      type: body.type,
    })

    return NextResponse.json({
      success: true,
      data: {
        ordernummer: result.ordernummer,
        orderId: result.orderId,
      },
    })
  } catch (error) {
    console.error('Fout bij aanmaken order:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}
