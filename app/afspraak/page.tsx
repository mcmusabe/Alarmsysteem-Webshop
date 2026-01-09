import AppointmentForm from '@/components/Appointment/AppointmentForm'

export default function AfspraakPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-2">
          Afspraak Inplannen
        </h1>
        <p className="text-gray-600 mb-8">
          Plan een afspraak in voor installatie of een adviesgesprek.
        </p>

        <AppointmentForm />
      </div>
    </div>
  )
}
