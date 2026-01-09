'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Calendar from './Calendar'
import TimeSlotSelector from './TimeSlotSelector'
import { useRouter } from 'next/navigation'

const appointmentSchema = z.object({
  naam: z.string().min(2, 'Naam moet minimaal 2 karakters zijn'),
  email: z.string().email('Ongeldig email adres'),
  telefoon: z.string().optional(),
  type: z.enum(['installatie', 'advies']),
  opmerkingen: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

export default function AppointmentForm() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      type: 'installatie',
    },
  })

  const onSubmit = async (data: AppointmentFormData) => {
    if (!selectedDate || !selectedTime) {
      setError('Selecteer een datum en tijd')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Eerst customer aanmaken of ophalen
      const customerResponse = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          naam: data.naam,
          email: data.email,
          telefoon: data.telefoon,
        }),
      })

      const customerData = await customerResponse.json()

      if (!customerResponse.ok) {
        throw new Error(customerData.error || 'Fout bij aanmaken klant')
      }

      // Maak afspraak aan
      const appointmentResponse = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerData.data.id,
          datum: selectedDate,
          tijd: selectedTime,
          type: data.type,
          opmerkingen: data.opmerkingen,
        }),
      })

      const appointmentData = await appointmentResponse.json()

      if (!appointmentResponse.ok) {
        throw new Error(appointmentData.error || 'Fout bij aanmaken afspraak')
      }

      router.push(`/afspraak/bevestiging?datum=${selectedDate}&tijd=${selectedTime}`)
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type Afspraak *
          </label>
          <select
            {...register('type')}
            className="input"
          >
            <option value="installatie">Installatie</option>
            <option value="advies">Adviesgesprek</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Datum *
        </label>
        <Calendar onDateSelect={setSelectedDate} selectedDate={selectedDate} />
      </div>

      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tijd *
          </label>
          <TimeSlotSelector
            datum={selectedDate}
            onTimeSelect={setSelectedTime}
            selectedTime={selectedTime}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Opmerkingen (Optioneel)
        </label>
        <textarea
          {...register('opmerkingen')}
          rows={4}
          className="input"
          placeholder="Bijvoorbeeld: Graag 's ochtends, of specifieke instructies..."
        />
      </div>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="w-full"
        disabled={isSubmitting || !selectedDate || !selectedTime}
      >
        {isSubmitting ? 'Afspraak wordt gemaakt...' : 'Afspraak Bevestigen'}
      </Button>
    </form>
  )
}
