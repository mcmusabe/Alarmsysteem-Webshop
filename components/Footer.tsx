'use client'

import Link from 'next/link'
import { useState, useEffect, ReactNode } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const FooterSection = ({ 
    title, 
    children, 
    sectionId 
  }: { 
    title: string
    children: ReactNode
    sectionId: string
  }) => {
    const isOpen = openSections[sectionId]

    return (
      <div className="border-b border-gray-800 lg:border-b-0">
        <button
          onClick={() => toggleSection(sectionId)}
          className="lg:pointer-events-none w-full flex items-center justify-between py-4 lg:py-0 text-left"
        >
          <h3 className="text-base sm:text-lg font-medium text-white">{title}</h3>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform lg:hidden ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen || !isMobile ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} lg:max-h-none lg:opacity-100`}>
          <div className="pb-4 lg:pb-0 lg:pt-6">
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-16">
        {/* Mobile: Collapsible sections, Desktop: Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-0 lg:gap-8 xl:gap-12">
          {/* Bedrijfsinformatie - Always visible */}
          <div className="lg:col-span-2 order-1 lg:order-1 pb-6 lg:pb-0 border-b border-gray-800 lg:border-b-0">
            <h3 className="text-base sm:text-lg font-medium mb-4 lg:mb-6 text-white">Over Ons</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-md font-light leading-relaxed">
              Professionele alarmsystemen voor woning en bedrijf. Configureer en bestel online, wij installeren het voor u.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <a 
                href="https://maps.google.com/?q=Slootwijkersteeg+11,+7241DS+Lochem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm sm:text-base text-gray-300 hover:text-accent transition-colors group active:text-accent touch-manipulation"
              >
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="break-words">Slootwijkersteeg 11, 7241DS Lochem</span>
              </a>
              <a 
                href="tel:0573215100" 
                className="flex items-center gap-3 text-sm sm:text-base text-gray-300 hover:text-accent transition-colors group active:text-accent touch-manipulation"
              >
                <svg className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0573 - 21 51 00
              </a>
              <a 
                href="mailto:info@demeestersintechniek.nl" 
                className="flex items-center gap-3 text-sm sm:text-base text-gray-300 hover:text-accent transition-colors group active:text-accent touch-manipulation break-all"
              >
                <svg className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@demeestersintechniek.nl
              </a>
            </div>
          </div>

          {/* Snelle Links - Collapsible on mobile */}
          <FooterSection title="Snelle Links" sectionId="links">
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="block text-sm sm:text-base text-gray-300 hover:text-accent transition-colors font-light py-1 active:text-accent touch-manipulation"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/configurator" 
                  className="block text-sm sm:text-base text-gray-300 hover:text-accent transition-colors font-light py-1 active:text-accent touch-manipulation"
                >
                  Alarmsysteem Configurator
                </Link>
              </li>
              <li>
                <Link 
                  href="/afspraak" 
                  className="block text-sm sm:text-base text-gray-300 hover:text-accent transition-colors font-light py-1 active:text-accent touch-manipulation"
                >
                  Afspraak Inplannen
                </Link>
              </li>
              <li>
                <Link 
                  href="/bestellen" 
                  className="block text-sm sm:text-base text-gray-300 hover:text-accent transition-colors font-light py-1 active:text-accent touch-manipulation"
                >
                  Bestellen
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Diensten - Collapsible on mobile */}
          <FooterSection title="Diensten" sectionId="diensten">
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link 
                  href="/configurator" 
                  className="block text-sm sm:text-base text-gray-300 hover:text-accent transition-colors font-light py-1 active:text-accent touch-manipulation"
                >
                  Alarm Systeem
                </Link>
              </li>
              <li>
                <div className="text-sm sm:text-base text-gray-300 font-light py-1">
                  Camera Bewaking
                  <span className="text-xs text-gray-500 ml-1">(op aanvraag)</span>
                </div>
              </li>
              <li>
                <div className="text-sm sm:text-base text-gray-300 font-light py-1">
                  Smart Home
                </div>
              </li>
              <li>
                <div className="text-sm sm:text-base text-gray-300 font-light py-1">
                  Bekabeling
                </div>
              </li>
              <li>
                <div className="text-sm sm:text-base text-gray-300 font-light py-1">
                  Rookmelders
                </div>
              </li>
            </ul>
          </FooterSection>
        </div>

        {/* Bottom Bar - Better mobile layout */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-xs sm:text-sm text-gray-400 font-light text-center sm:text-left">
              © {currentYear} AlarmWebshop. Alle rechten voorbehouden.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link 
                href="#" 
                className="text-gray-400 hover:text-accent transition-colors font-light active:text-accent touch-manipulation"
              >
                Privacy verklaring
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-accent transition-colors font-light active:text-accent touch-manipulation"
              >
                Algemene voorwaarden
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-accent transition-colors font-light active:text-accent touch-manipulation"
              >
                Cookiebeleid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
