'use client'

import { useEffect, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  side = 'left',
}: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sideClasses = {
    left: 'inset-y-0 left-0 w-80 max-w-[85vw] border-r',
    right: 'inset-y-0 right-0 w-80 max-w-[85vw] border-l',
    top: 'inset-x-0 top-0 h-auto max-h-[85vh] border-b',
    bottom: 'inset-x-0 bottom-0 h-auto max-h-[85vh] border-t',
  }

  const slideClasses = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    top: isOpen ? 'translate-y-0' : '-translate-y-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed z-50 bg-white shadow-2xl transition-transform duration-300 ease-out',
          sideClasses[side],
          slideClasses[side]
        )}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </>
  )
}
