'use client'

import { useEffect, ReactNode } from 'react'
import clsx from 'clsx'
import Button from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  variant?: 'default' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'
  dismissible?: boolean
  header?: ReactNode
  footer?: ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmText = 'Bevestigen',
  cancelText = 'Annuleren',
  onConfirm,
  variant = 'default',
  size = 'md',
  dismissible = true,
  header,
  footer,
}: ModalProps) {
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
    if (!dismissible) return
    
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
  }, [isOpen, onClose, dismissible])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'w-[calc(100vw-2rem)] max-w-md',
    md: 'w-[calc(100vw-2rem)] max-w-lg',
    lg: 'w-[calc(100vw-2rem)] max-w-2xl',
    xl: 'w-[calc(100vw-2rem)] max-w-4xl',
    fullscreen: 'inset-0',
  }

  const hasHeader = !!title || !!description || !!header
  const hasFooter = !!footer || (onConfirm !== undefined)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={clsx(
          'absolute inset-0 bg-gray-900/75 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={dismissible ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={clsx(
          'relative bg-white divide-y divide-gray-200 flex flex-col focus:outline-none shadow-lg ring ring-gray-200 rounded-lg',
          size === 'fullscreen' ? sizeClasses.fullscreen : sizeClasses[size],
          size !== 'fullscreen' && 'max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden',
          isOpen ? 'animate-[scale-in_200ms_ease-out]' : 'animate-[scale-out_200ms_ease-in]'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        {/* Header */}
        {hasHeader && (
          <div className="flex items-center gap-1.5 p-4 sm:px-6 min-h-16">
            {header ? (
              header
            ) : (
              <>
                <div className="flex-1">
                  {title && (
                    <h2 id="modal-title" className="text-gray-900 font-semibold text-lg">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-description" className="mt-1 text-gray-500 text-sm">
                      {description}
                    </p>
                  )}
                </div>
                {dismissible && (
                  <button
                    onClick={onClose}
                    className="absolute top-4 end-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                    aria-label="Sluiten"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {hasFooter && (
          <div className="flex items-center gap-1.5 p-4 sm:px-6">
            {footer ? (
              footer
            ) : (
              <div className="flex items-center justify-end gap-3 w-full">
                <Button variant="ghost" onClick={onClose}>
                  {cancelText}
                </Button>
                {onConfirm && (
                  <Button
                    variant={variant === 'danger' ? 'accent' : 'primary'}
                    onClick={() => {
                      onConfirm()
                      onClose()
                    }}
                  >
                    {confirmText}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
