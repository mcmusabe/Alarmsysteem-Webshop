'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import clsx from 'clsx'

// Lazy load Chatbot component voor betere initial load
const Chatbot = lazy(() => import('./Chatbot'))

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoadChatbot, setShouldLoadChatbot] = useState(false)

  useEffect(() => {
    // Toon de chatbot button na een korte delay voor betere UX
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Load chatbot component alleen wanneer nodig
  useEffect(() => {
    if (isOpen && !shouldLoadChatbot) {
      setShouldLoadChatbot(true)
    }
  }, [isOpen, shouldLoadChatbot])

  if (!isVisible) return null

  return (
    <>
      {/* Chatbot Window */}
      {isOpen && shouldLoadChatbot && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden md:block hidden">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          }>
            <Chatbot onClose={() => setIsOpen(false)} />
          </Suspense>
        </div>
      )}
      
      {/* Mobile Chatbot Window */}
      {isOpen && shouldLoadChatbot && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col md:hidden">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          }>
            <Chatbot onClose={() => setIsOpen(false)} />
          </Suspense>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center group',
          isOpen && 'bg-gray-800 hover:bg-gray-700'
        )}
        aria-label={isOpen ? 'Sluit chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
        {/* Notification Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>
    </>
  )
}
