'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/ToastContainer'
import Modal from '@/components/ui/Modal'
import Spinner from '@/components/ui/Spinner'
import Skeleton from '@/components/ui/Skeleton'

interface Order {
  id: string
  ordernummer: string
  totaal_prijs: number
  status: string
  created_at: string
  customers?: {
    naam: string
    email: string
    telefoon: string
  }
  configurations?: {
    type: string
    aantal_deuren: number
    aantal_ruimtes: number
    kleur: string
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState<{ orderId: string; newStatus: string } | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    fetchOrders()
  }, [statusFilter])

  const fetchOrders = async () => {
    try {
      const url = statusFilter
        ? `/api/admin/orders?status=${statusFilter}`
        : '/api/admin/orders'
      const response = await fetch(url)
      const data = await response.json()
      if (data.success) {
        setOrders(data.data)
      } else {
        showToast(data.error || 'Fout bij laden van orders', 'error')
      }
    } catch (error) {
      console.error('Fout bij ophalen orders:', error)
      showToast('Fout bij laden van orders', 'error')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId)
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      })
      const data = await response.json()
      if (data.success) {
        showToast(`Order status bijgewerkt naar ${newStatus}`, 'success')
        fetchOrders()
      } else {
        showToast(data.error || 'Fout bij updaten order', 'error')
      }
    } catch (error) {
      console.error('Fout bij updaten order:', error)
      showToast('Fout bij updaten order', 'error')
    } finally {
      setUpdatingId(null)
      setConfirmModal(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <Skeleton width={200} height={40} />
          <div className="flex gap-2">
            <Skeleton width={80} height={40} />
            <Skeleton width={100} height={40} />
            <Skeleton width={80} height={40} />
          </div>
        </div>
        <Card>
          <Skeleton lines={8} />
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-medium text-black">Orders</h1>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === '' ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter('')}
          >
            Alle
          </Button>
          <Button
            variant={statusFilter === 'pending' ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter('pending')}
          >
            Openstaand
          </Button>
          <Button
            variant={statusFilter === 'completed' ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter('completed')}
          >
            Voltooid
          </Button>
        </div>
      </div>

      <Card>
        {orders.length === 0 ? (
          <p className="text-gray-600 py-8 text-center">Geen orders gevonden</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Ordernummer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Klant</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Configuratie
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Prijs</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Datum</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Acties</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                      {order.ordernummer || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      <div>
                        <div className="font-medium">{order.customers?.naam || 'N/A'}</div>
                        <div className="text-gray-600 text-xs">{order.customers?.email || ''}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {order.configurations ? (
                        <div>
                          <div className="text-xs">
                            {order.configurations.type} • {order.configurations.kleur}
                          </div>
                          <div className="text-xs text-gray-600">
                            {order.configurations.aantal_deuren} deuren •{' '}
                            {order.configurations.aantal_ruimtes} ruimtes
                          </div>
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
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
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {updatingId === order.id ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            {order.status === 'pending' && (
                              <Button
                                variant="accent"
                                size="sm"
                                onClick={() => setConfirmModal({ orderId: order.id, newStatus: 'completed' })}
                              >
                                Voltooien
                              </Button>
                            )}
                            {order.status === 'completed' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmModal({ orderId: order.id, newStatus: 'pending' })}
                              >
                                Terugzetten
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title="Order Status Wijzigen"
        onConfirm={() => {
          if (confirmModal) {
            updateOrderStatus(confirmModal.orderId, confirmModal.newStatus)
          }
        }}
        confirmText="Bevestigen"
        cancelText="Annuleren"
      >
        <p className="text-gray-800">
          Weet je zeker dat je de status van dit order wilt wijzigen naar{' '}
          <strong>{confirmModal?.newStatus}</strong>?
        </p>
      </Modal>
    </div>
  )
}
