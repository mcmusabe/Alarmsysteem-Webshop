'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/Auth/AuthProvider'
import Button from './ui/Button'
import Logo from './Logo'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg' 
          : 'bg-black shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="group"
            aria-label="Home"
          >
            <Logo 
              size="lg" 
              showText={true} 
              layout="vertical"
              className="group-hover:opacity-80 transition-opacity" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" suppressHydrationWarning>
            <Link 
              href="/" 
              className="px-4 py-2 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium"
            >
              Home
            </Link>
            <Link 
              href="/configurator" 
              className="px-4 py-2 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium"
            >
              Configurator
            </Link>
            <Link 
              href="/afspraak" 
              className="px-4 py-2 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium"
            >
              Afspraak
            </Link>
            <div className="h-6 w-px bg-gray-700 mx-2"></div>
            <a 
              href="tel:0573215100" 
              className="px-4 py-2 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium flex items-center space-x-2"
              suppressHydrationWarning
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span suppressHydrationWarning>0573 - 21 51 00</span>
            </a>
            <div suppressHydrationWarning>
              {!mounted || loading ? (
                <div className="ml-2 w-24 h-9 bg-gray-800 rounded-lg animate-pulse" />
              ) : user ? (
                <Link href="/dashboard">
                  <Button variant="accent" size="sm" className="ml-2">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="accent" size="sm" className="ml-2">
                    Inloggen
                  </Button>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 border-t border-gray-800" suppressHydrationWarning>
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-4 py-3 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/configurator"
                className="px-4 py-3 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Configurator
              </Link>
              <Link
                href="/afspraak"
                className="px-4 py-3 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Afspraak
              </Link>
              <div className="border-t border-gray-700 my-2"></div>
              <a
                href="tel:0573215100"
                className="px-4 py-3 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium flex items-center space-x-2"
                suppressHydrationWarning
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span suppressHydrationWarning>0573 - 21 51 00</span>
              </a>
              <div suppressHydrationWarning>
                {!mounted || loading ? (
                  <div className="w-full mt-2 h-9 bg-gray-800 rounded-lg animate-pulse" />
                ) : user ? (
                  <Link href="/dashboard" className="w-full">
                    <Button variant="accent" size="sm" className="w-full mt-2">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login" className="w-full">
                    <Button variant="accent" size="sm" className="w-full mt-2">
                      Inloggen
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
