import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()

    // Haal statistieken op
    const [ordersResult, appointmentsResult, customersResult] = await Promise.all([
      supabase.from('orders').select('id, totaal_prijs, status, created_at', { count: 'exact' }),
      supabase.from('appointments').select('id, status, datum', { count: 'exact' }),
      supabase.from('customers').select('id', { count: 'exact' }),
    ])

    if (ordersResult.error) throw ordersResult.error
    if (appointmentsResult.error) throw appointmentsResult.error
    if (customersResult.error) throw customersResult.error

    const orders = ordersResult.data || []
    const appointments = appointmentsResult.data || []
    const customers = customersResult.data || []

    // Bereken statistieken
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totaal_prijs || 0), 0)
    const pendingOrders = orders.filter((o) => o.status === 'pending').length
    const completedOrders = orders.filter((o) => o.status === 'completed').length

    const totalAppointments = appointments.length
    const upcomingAppointments = appointments.filter(
      (a) => a.status === 'gepland' && new Date(a.datum) >= new Date()
    ).length

    const totalCustomers = customers.length

    // Recent orders (laatste 5)
    const recentOrders = orders
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalOrders,
          totalRevenue,
          pendingOrders,
          completedOrders,
          totalAppointments,
          upcomingAppointments,
          totalCustomers,
        },
        recentOrders,
      },
    })
  } catch (error) {
    console.error('Fout bij ophalen statistieken:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Interne server fout',
      },
      { status: 500 }
    )
  }
}
