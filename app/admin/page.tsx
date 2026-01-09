'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Link from 'next/link'
import { useToast } from '@/components/ui/ToastContainer'
import Spinner from '@/components/ui/Spinner'
import Skeleton from '@/components/ui/Skeleton'

interface Stats {
  overview: {
    totalOrders: number
    totalRevenue: number
    pendingOrders: number
    completedOrders: number
    totalAppointments: number
    upcomingAppointments: number
    totalCustomers: number
  }
  recentOrders: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      } else {
        showToast(data.error || 'Fout bij laden van statistieken', 'error')
      }
    } catch (error) {
      console.error('Fout bij ophalen statistieken:', error)
      showToast('Fout bij laden van statistieken', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-medium text-black mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <Skeleton height={80} />
            </Card>
          ))}
        </div>
        <Card>
          <Skeleton lines={5} />
        </Card>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-600 mb-4">Fout bij laden van statistieken</p>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Opnieuw proberen
        </button>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  return (
    <div>
      <h1 className="text-3xl font-medium text-black mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-accent hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Totaal Orders</p>
              <p className="text-2xl font-medium text-black">{stats.overview.totalOrders}</p>
            </div>
            <div className="text-accent">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Totaal Omzet</p>
              <p className="text-2xl font-medium text-black">{formatPrice(stats.overview.totalRevenue)}</p>
            </div>
            <div className="text-green-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Openstaande Orders</p>
              <p className="text-2xl font-medium text-black">{stats.overview.pendingOrders}</p>
            </div>
            <div className="text-yellow-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Aankomende Afspraken</p>
              <p className="text-2xl font-medium text-black">{stats.overview.upcomingAppointments}</p>
            </div>
            <div className="text-blue-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-black mb-2">Voltooide Orders</h3>
          <p className="text-3xl font-medium text-black">{stats.overview.completedOrders}</p>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-black mb-2">Totaal Afspraken</h3>
          <p className="text-3xl font-medium text-black">{stats.overview.totalAppointments}</p>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-black mb-2">Totaal Klanten</h3>
          <p className="text-3xl font-medium text-black">{stats.overview.totalCustomers}</p>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-black">Recente Orders</h2>
          <Link href="/admin/orders">
            <button className="text-sm text-accent hover:underline font-medium">
              Bekijk alle orders →
            </button>
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <p className="text-gray-600">Geen recente orders</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Ordernummer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Klant</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Prijs</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Datum</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                      {order.ordernummer || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {order.customers?.naam || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {formatPrice(order.totaal_prijs || 0)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('nl-NL')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
