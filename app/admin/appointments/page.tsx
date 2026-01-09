'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/ToastContainer'
import Modal from '@/components/ui/Modal'
import Spinner from '@/components/ui/Spinner'
import Skeleton from '@/components/ui/Skeleton'

interface Appointment {
  id: string
  datum: string
  tijd: string
  type: string
  status: string
  opmerkingen?: string
  customers?: {
    naam: string
    email: string
    telefoon: string
  }
  orders?: {
    ordernummer: string
  }
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState<{ appointmentId: string; newStatus: string } | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    fetchAppointments()
  }, [statusFilter, selectedDate])

  const fetchAppointments = async () => {
    try {
      let url = '/api/admin/appointments'
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (selectedDate) params.append('datum', selectedDate)
      if (params.toString()) url += '?' + params.toString()

      const response = await fetch(url)
      const data = await response.json()
      if (data.success) {
        setAppointments(data.data)
      } else {
        showToast(data.error || 'Fout bij laden van afspraken', 'error')
      }
    } catch (error) {
      console.error('Fout bij ophalen appointments:', error)
      showToast('Fout bij laden van afspraken', 'error')
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    setUpdatingId(appointmentId)
    try {
      const response = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: appointmentId, status: newStatus }),
      })
      const data = await response.json()
      if (data.success) {
        showToast(`Afspraak status bijgewerkt naar ${newStatus}`, 'success')
        fetchAppointments()
      } else {
        showToast(data.error || 'Fout bij updaten afspraak', 'error')
      }
    } catch (error) {
      console.error('Fout bij updaten appointment:', error)
      showToast('Fout bij updaten afspraak', 'error')
    } finally {
      setUpdatingId(null)
      setConfirmModal(null)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <Skeleton width={200} height={40} />
          <div className="flex gap-2 items-center">
            <Skeleton width={150} height={40} />
            <Skeleton width={80} height={40} />
            <Skeleton width={80} height={40} />
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
        <h1 className="text-3xl font-medium text-black">Afspraken</h1>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <Button
            variant={statusFilter === '' ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter('')}
          >
            Alle
          </Button>
          <Button
            variant={statusFilter === 'gepland' ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter('gepland')}
          >
            Gepland
          </Button>
          <Button
            variant={statusFilter === 'voltooid' ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter('voltooid')}
          >
            Voltooid
          </Button>
        </div>
      </div>

      <Card>
        {appointments.length === 0 ? (
          <p className="text-gray-600 py-8 text-center">Geen afspraken gevonden</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Datum</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Tijd</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Klant</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Acties</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                      {new Date(appointment.datum).toLocaleDateString('nl-NL')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">{appointment.tijd}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      <div>
                        <div className="font-medium">{appointment.customers?.naam || 'N/A'}</div>
                        <div className="text-gray-600 text-xs">
                          {appointment.customers?.telefoon || ''}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">{appointment.type}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          appointment.status === 'voltooid'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'gepland'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {appointment.status || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {updatingId === appointment.id ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            {appointment.status === 'gepland' && (
                              <Button
                                variant="accent"
                                size="sm"
                                onClick={() => setConfirmModal({ appointmentId: appointment.id, newStatus: 'voltooid' })}
                              >
                                Voltooien
                              </Button>
                            )}
                            {appointment.status === 'voltooid' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmModal({ appointmentId: appointment.id, newStatus: 'gepland' })}
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
        title="Afspraak Status Wijzigen"
        onConfirm={() => {
          if (confirmModal) {
            updateAppointmentStatus(confirmModal.appointmentId, confirmModal.newStatus)
          }
        }}
        confirmText="Bevestigen"
        cancelText="Annuleren"
      >
        <p className="text-gray-800">
          Weet je zeker dat je de status van deze afspraak wilt wijzigen naar{' '}
          <strong>{confirmModal?.newStatus}</strong>?
        </p>
      </Modal>
    </div>
  )
}
