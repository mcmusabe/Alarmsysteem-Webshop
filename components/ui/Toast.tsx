'use client'

import { useEffect, ReactNode } from 'react'
import clsx from 'clsx'

export interface Toast {
  id: string
  title?: string
  message: string
  type?: 'success' | 'error' | 'info' | 'warning' | 'primary' | 'secondary' | 'neutral'
  duration?: number
  icon?: ReactNode
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

interface ToastProps {
  toast: Toast
  onClose: (id: string) => void
}

export default function Toast({ toast, onClose }: ToastProps) {
  const duration = toast.duration ?? 5000

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(toast.id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [toast.id, duration, onClose])

  const defaultIcons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    primary: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    secondary: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    neutral: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  }

  const type = toast.type || 'neutral'
  const icon = toast.icon || defaultIcons[type]

  const colorStyles = {
    success: 'bg-white shadow-lg ring ring-green-500/20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500',
    error: 'bg-white shadow-lg ring ring-red-500/20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500',
    info: 'bg-white shadow-lg ring ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500',
    warning: 'bg-white shadow-lg ring ring-yellow-500/20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500',
    primary: 'bg-white shadow-lg ring ring-black/20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black',
    secondary: 'bg-white shadow-lg ring ring-gray-500/20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500',
    neutral: 'bg-white shadow-lg ring ring-gray-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500',
  }

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    warning: 'text-yellow-600',
    primary: 'text-black',
    secondary: 'text-gray-600',
    neutral: 'text-gray-700',
  }

  return (
    <div
      className={clsx(
        'relative group overflow-hidden bg-white shadow-lg rounded-lg ring ring-gray-200 p-4 flex gap-2.5 focus:outline-none min-w-[300px] max-w-md animate-slide-in',
        colorStyles[type]
      )}
      role="alert"
    >
      {/* Icon */}
      <div className={clsx('shrink-0 size-5', iconColors[type])}>
        {icon}
      </div>

      {/* Content */}
      <div className="w-0 flex-1 flex flex-col">
        {toast.title && (
          <p className="text-sm font-medium text-gray-900">
            {toast.title}
          </p>
        )}
        <p className={clsx('text-sm text-gray-700', toast.title && 'mt-1')}>
          {toast.message}
        </p>
        {toast.actions && toast.actions.length > 0 && (
          <div className="flex gap-1.5 shrink-0 mt-2.5">
            {toast.actions.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick()
                }}
                className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={() => onClose(toast.id)}
        className="p-0 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Sluiten"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Progress Bar */}
      {duration > 0 && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-200">
          <div
            className={clsx(
              'h-full transition-all ease-linear',
              type === 'success' && 'bg-green-600',
              type === 'error' && 'bg-red-600',
              type === 'info' && 'bg-blue-600',
              type === 'warning' && 'bg-yellow-600',
              type === 'primary' && 'bg-black',
              (type === 'secondary' || type === 'neutral') && 'bg-gray-600'
            )}
            style={{
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  )
}
