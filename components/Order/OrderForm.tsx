'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useConfiguratorStore } from '@/lib/configurator/state'
import { usePriceCalculation } from '@/hooks/usePriceCalculation'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const orderSchema = z.object({
  naam: z.string().min(2, 'Naam moet minimaal 2 karakters zijn'),
  email: z.string().email('Ongeldig email adres'),
  telefoon: z.string().optional(),
  adres: z.string().min(5, 'Adres moet minimaal 5 karakters zijn'),
  postcode: z.string().regex(/^[1-9][0-9]{3}\s?[A-Z]{2}$/i, 'Ongeldig postcode formaat'),
  stad: z.string().min(2, 'Stad moet minimaal 2 karakters zijn'),
})

type OrderFormData = z.infer<typeof orderSchema>

export default function OrderForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderType = (searchParams.get('type') || 'kopen') as 'kopen' | 'huren'
  
  const configuratie = useConfiguratorStore()
  const { prijsResultaat } = usePriceCalculation(configuratie)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  })

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          configuratie: {
            ...configuratie,
          },
          customer: data,
          type: orderType,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Fout bij aanmaken bestelling')
      }

      if (result.success) {
        router.push(`/bestellen/bevestiging?ordernummer=${result.data.ordernummer}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Naam *"
          {...register('naam')}
          error={errors.naam?.message}
        />
        <Input
          label="Email *"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Telefoon"
          type="tel"
          {...register('telefoon')}
          error={errors.telefoon?.message}
        />
        <Input
          label="Postcode *"
          {...register('postcode')}
          error={errors.postcode?.message}
          placeholder="1234AB"
        />
        <Input
          label="Adres *"
          {...register('adres')}
          error={errors.adres?.message}
        />
        <Input
          label="Stad *"
          {...register('stad')}
          error={errors.stad?.message}
        />
      </div>

      {prijsResultaat && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Totaalprijs:</span>
            <span className="text-2xl font-black text-black">
              {new Intl.NumberFormat('nl-NL', {
                style: 'currency',
                currency: 'EUR',
              }).format(prijsResultaat.totaalPrijs)}
            </span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="w-full"
        disabled={isSubmitting || !prijsResultaat}
      >
        {isSubmitting ? 'Bestelling wordt verwerkt...' : `Bestelling ${orderType === 'kopen' ? 'afronden' : 'huren'} bevestigen`}
      </Button>
    </form>
  )
}
