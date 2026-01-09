'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

function AfspraakBevestigingContent() {
  const searchParams = useSearchParams()
  const datum = searchParams.get('datum')
  const tijd = searchParams.get('tijd')

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Afspraak Bevestigd!
          </h1>

          {datum && tijd && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Uw afspraak:</p>
              <p className="text-2xl font-bold text-primary">
                {formatDate(datum)} om {tijd}
              </p>
            </div>
          )}

          <p className="text-gray-600 mb-8">
            Bedankt voor het inplannen van uw afspraak! We hebben een bevestigingsemail gestuurd naar uw emailadres.
            We zien u graag op de geplande datum en tijd.
          </p>

          <div className="space-y-4">
            <Link href="/">
              <Button variant="accent" size="lg" className="w-full">
                Terug naar Homepage
              </Button>
            </Link>
            <Link href="/configurator">
              <Button variant="outline" size="lg" className="w-full">
                Start Configurator
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function AfspraakBevestigingPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    }>
      <AfspraakBevestigingContent />
    </Suspense>
  )
}
