'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import Toast, { Toast as ToastType } from './Toast'

interface ToastContextType {
  showToast: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning' | 'primary' | 'secondary' | 'neutral',
    options?: Partial<Omit<ToastType, 'id' | 'message' | 'type'>>
  ) => void
  add: (toast: Omit<ToastType, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const showToast = useCallback((
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' | 'primary' | 'secondary' | 'neutral' = 'neutral',
    options?: Partial<Omit<ToastType, 'id' | 'message' | 'type'>>
  ) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, message, type, ...options }])
  }, [])

  const add = useCallback((toast: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, ...toast }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, add }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
