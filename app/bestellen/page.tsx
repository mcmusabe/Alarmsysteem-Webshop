'use client'

import { useSearchParams } from 'next/navigation'
import OrderForm from '@/components/Order/OrderForm'
import OrderSummary from '@/components/Order/OrderSummary'

export default function BestellenPage() {
  const searchParams = useSearchParams()
  const orderType = searchParams.get('type') || 'kopen'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-2">
          {orderType === 'kopen' ? 'Bestelling Afronden' : 'Huren'}
        </h1>
        <p className="text-gray-600 mb-8">
          Vul uw gegevens in om de bestelling te voltooien.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrderForm />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
