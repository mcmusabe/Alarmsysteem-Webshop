'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/Auth/AuthProvider'
import Button from './ui/Button'
import Logo from './Logo'
import Drawer from './ui/Drawer'

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/configurator', label: 'Configurator' },
    { href: '/afspraak', label: 'Afspraak' },
  ]

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-md shadow-lg' 
            : 'bg-black shadow-md'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - Smaller on mobile */}
            <Link 
              href="/" 
              className="group flex-shrink-0"
              aria-label="Home"
              suppressHydrationWarning
            >
              <Logo 
              size="md" 
              showText={false} 
              layout="horizontal"
              className="group-hover:opacity-80 transition-opacity sm:hidden" 
            />
            <Logo 
              size="lg" 
              showText={true} 
              layout="vertical"
              className="group-hover:opacity-80 transition-opacity hidden sm:block" 
            />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="px-4 py-2 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-6 w-px bg-gray-700 mx-2"></div>
              <a 
                href="tel:0573215100" 
                className="px-4 py-2 text-white hover:text-accent hover:bg-gray-900 rounded-lg transition-all font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden xl:inline">0573 - 21 51 00</span>
                <span className="xl:hidden">Bellen</span>
              </a>
              {mounted && !loading ? (
                user ? (
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
                )
              ) : (
                <div className="ml-2 w-24 h-9 bg-gray-800 rounded-lg animate-pulse" />
              )}
            </nav>

            {/* Mobile Menu Button - Better touch target */}
            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-900 active:bg-gray-800 transition-colors touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6 text-white transition-transform"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
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
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} side="right">
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Logo size="md" showText={true} layout="horizontal" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-gray-900 hover:text-accent hover:bg-gray-100 rounded-lg transition-all font-medium active:bg-gray-200 touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 my-4"></div>
              
              <a
                href="tel:0573215100"
                className="px-4 py-3 text-gray-900 hover:text-accent hover:bg-gray-100 rounded-lg transition-all font-medium flex items-center gap-3 active:bg-gray-200 touch-manipulation"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0573 - 21 51 00
              </a>
            </div>
          </nav>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            {mounted && !loading ? (
              user ? (
                <Link href="/dashboard" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="accent" size="md" className="w-full">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="accent" size="md" className="w-full">
                    Inloggen
                  </Button>
                </Link>
              )
            ) : (
              <div className="w-full h-11 bg-gray-200 rounded-lg animate-pulse" />
            )}
          </div>
        </div>
      </Drawer>
    </>
  )
}
