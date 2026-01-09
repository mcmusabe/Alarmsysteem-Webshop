'use client'

import { useSearchParams } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function BevestigingPage() {
  const searchParams = useSearchParams()
  const ordernummer = searchParams.get('ordernummer')

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Bestelling Bevestigd!
          </h1>
          
          {ordernummer && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Uw ordernummer:</p>
              <p className="text-2xl font-bold text-primary">{ordernummer}</p>
            </div>
          )}

          <p className="text-gray-600 mb-8">
            Bedankt voor uw bestelling! We hebben een bevestigingsemail gestuurd naar uw emailadres.
            Ons team neemt binnenkort contact met u op voor de volgende stappen.
          </p>

          <div className="space-y-4">
            <Link href="/afspraak">
              <Button variant="accent" size="lg" className="w-full">
                Afspraak Inplannen
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full">
                Terug naar Homepage
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
