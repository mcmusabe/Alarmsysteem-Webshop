'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Logo from './Logo'
import { useAuth } from './Auth/AuthProvider'

export default function Header() {
  const { user, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen, mounted])

  useEffect(() => {
    if (!mounted || !mobileMenuOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen, mounted])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/configurator', label: 'Configurator' },
    { href: '/afspraak', label: 'Afspraak' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md shadow-md border-b border-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" aria-label="Home" className="flex-shrink-0">
              <Logo size="md" showText={true} layout="horizontal" variant="dark" className="hover:opacity-80 transition-opacity" />
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="px-4 py-2 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium">
                  {link.label}
                </Link>
              ))}
              <div className="h-6 w-px bg-gray-700 mx-2"></div>
              <a href="tel:0573215100" className="px-4 py-2 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden xl:inline">0573 - 21 51 00</span>
                <span className="xl:hidden">Bellen</span>
              </a>
              {mounted && !loading && user ? (
                <Link href="/dashboard" className="font-medium rounded-md inline-flex items-center justify-center transition-colors bg-accent text-black hover:bg-[#00AD74] active:bg-[#00AD74] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent px-2.5 py-1.5 text-xs ml-2">
                  Dashboard
                </Link>
              ) : mounted && !loading ? (
                <Link href="/login" className="font-medium rounded-md inline-flex items-center justify-center transition-colors bg-accent text-black hover:bg-[#00AD74] active:bg-[#00AD74] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent px-2.5 py-1.5 text-xs ml-2">
                  Inloggen
                </Link>
              ) : (
                <div className="px-2.5 py-1.5 text-xs ml-2">
                  <div className="w-16 h-5 bg-gray-800 rounded-md animate-pulse"></div>
                </div>
              )}
            </nav>

            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-900 active:bg-gray-800 transition-colors touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6 text-white transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mounted && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden={!mobileMenuOpen}
          />
          <div
            className={`fixed z-50 bg-white shadow-2xl transition-transform duration-300 ease-out inset-y-0 right-0 w-80 max-w-[85vw] border-l ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            role="dialog"
            aria-modal={mobileMenuOpen ? 'true' : 'false'}
            aria-hidden={!mobileMenuOpen}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Logo size="md" showText={true} layout="horizontal" variant="light" />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="px-4 py-3 text-gray-900 hover:text-accent hover:bg-gray-100 rounded-lg transition-all font-medium active:bg-gray-200 touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-200 my-4"></div>
                  <a href="tel:0573215100" className="px-4 py-3 text-gray-900 hover:text-accent hover:bg-gray-100 rounded-lg transition-all font-medium flex items-center gap-3 active:bg-gray-200 touch-manipulation">
                    <svg className="w-5 h-5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    0573 - 21 51 00
                  </a>
                </div>
              </nav>
              <div className="p-4 border-t border-gray-200">
                <div className="w-full">
                  {mounted && !loading && user ? (
                    <Link href="/dashboard" className="font-medium rounded-md flex items-center justify-center transition-colors bg-accent text-black hover:bg-[#00AD74] active:bg-[#00AD74] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent px-2.5 py-1.5 text-sm text-center" onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                  ) : mounted && !loading ? (
                    <Link href="/login" className="font-medium rounded-md flex items-center justify-center transition-colors bg-accent text-black hover:bg-[#00AD74] active:bg-[#00AD74] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent px-2.5 py-1.5 text-sm text-center" onClick={() => setMobileMenuOpen(false)}>
                      Inloggen
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center px-2.5 py-1.5 text-sm">
                      <div className="w-20 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
