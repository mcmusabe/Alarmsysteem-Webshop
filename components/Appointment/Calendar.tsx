'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface CalendarProps {
  onDateSelect: (date: string) => void
  selectedDate?: string
}

export default function Calendar({ onDateSelect, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availableDates, setAvailableDates] = useState<string[]>([])

  useEffect(() => {
    // Haal beschikbare datums op (voorbeeld: volgende 30 dagen)
    const dates: string[] = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      // Skip weekends (optioneel)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    setAvailableDates(dates)
  }, [])

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const isDateAvailable = (date: Date) => {
    const dateStr = formatDate(date)
    return availableDates.includes(dateStr)
  }

  const isSelected = (date: Date) => {
    return formatDate(date) === selectedDate
  }

  const handleDateClick = (date: Date) => {
    if (isDateAvailable(date)) {
      onDateSelect(formatDate(date))
    }
  }

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: Date[] = []

    // Voeg dagen van vorige maand toe voor padding
    const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(year, month, -i)
      days.push(date)
    }

    // Voeg dagen van huidige maand toe
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth()
  const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={() => navigateMonth('prev')}>
          ←
        </Button>
        <h3 className="text-xl font-heading font-bold">
          {currentMonth.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}
        </h3>
        <Button variant="ghost" onClick={() => navigateMonth('next')}>
          →
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-gray-800 py-2">
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          const available = isDateAvailable(date)
          const selected = isSelected(date)
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth()

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={!available}
              className={`
                p-2 rounded-lg text-sm transition-all
                ${!isCurrentMonth ? 'text-gray-300' : ''}
                ${available && !selected ? 'hover:bg-gray-100 text-gray-700' : ''}
                ${selected ? 'bg-black text-white' : ''}
                ${!available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </Card>
  )
}
