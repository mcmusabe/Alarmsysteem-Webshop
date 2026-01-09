'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import { useToast } from '@/components/ui/ToastContainer'
import Skeleton from '@/components/ui/Skeleton'

interface Customer {
  id: string
  naam: string
  email: string
  telefoon?: string
  adres?: string
  postcode?: string
  stad?: string
  created_at: string
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState<string>('')
  const { showToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers()
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const fetchCustomers = async () => {
    try {
      const url = search
        ? `/api/admin/customers?search=${encodeURIComponent(search)}`
        : '/api/admin/customers'
      const response = await fetch(url)
      const data = await response.json()
      if (data.success) {
        setCustomers(data.data)
      } else {
        showToast(data.error || 'Fout bij laden van klanten', 'error')
      }
    } catch (error) {
      console.error('Fout bij ophalen customers:', error)
      showToast('Fout bij laden van klanten', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !search) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <Skeleton width={200} height={40} />
          <Skeleton width={250} height={40} />
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
        <h1 className="text-3xl font-medium text-black">Klanten</h1>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Zoek op naam, email of telefoon..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setLoading(true)
            }}
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
      </div>

      <Card>
        {customers.length === 0 ? (
          <p className="text-gray-600 py-8 text-center">
            {search ? 'Geen klanten gevonden' : 'Geen klanten'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Naam</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Telefoon
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Adres</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Aangemaakt
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                      {customer.naam}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">{customer.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {customer.telefoon || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {customer.adres && customer.postcode && customer.stad ? (
                        <div>
                          <div>{customer.adres}</div>
                          <div className="text-gray-600 text-xs">
                            {customer.postcode} {customer.stad}
                          </div>
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(customer.created_at).toLocaleDateString('nl-NL')}
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
