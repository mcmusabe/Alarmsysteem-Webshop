'use client'

import { useAuth } from '@/components/Auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary">
            Mijn Dashboard
          </h1>
          <Button variant="outline" onClick={signOut}>
            Uitloggen
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-heading font-bold mb-4">Welkom!</h2>
            <p className="text-gray-600 mb-4">
              Email: <strong>{user.email}</strong>
            </p>
            {user.user_metadata?.full_name && (
              <p className="text-gray-600 mb-4">
                Naam: <strong>{user.user_metadata.full_name}</strong>
              </p>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-heading font-bold mb-4">Snelle Acties</h2>
            <div className="space-y-3">
              <Link href="/configurator">
                <Button variant="accent" className="w-full">
                  Nieuw Alarmsysteem Configureren
                </Button>
              </Link>
              <Link href="/afspraak">
                <Button variant="outline" className="w-full">
                  Afspraak Inplannen
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
