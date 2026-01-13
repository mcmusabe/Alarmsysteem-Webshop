import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-gray-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Main Grid - 3 kolommen naast elkaar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mb-8">
          {/* Kolom 1: Snelle Links */}
          <div>
            <h3 className="font-semibold text-white text-base mb-4">Snelle Links</h3>
            <nav className="flex flex-col space-y-2.5">
              <Link href="/" className="text-sm text-gray-400 hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/configurator" className="text-sm text-gray-400 hover:text-accent transition-colors">
                Alarmsysteem Configurator
              </Link>
              <Link href="/afspraak" className="text-sm text-gray-400 hover:text-accent transition-colors">
                Afspraak Inplannen
              </Link>
              <Link href="/bestellen" className="text-sm text-gray-400 hover:text-accent transition-colors">
                Bestellen
              </Link>
            </nav>
          </div>

          {/* Kolom 2: Diensten */}
          <div>
            <h3 className="font-semibold text-white text-base mb-4">Diensten</h3>
            <nav className="flex flex-col space-y-2.5">
              <div className="text-sm text-gray-400">
                Alarm Systeem
              </div>
              <div className="text-sm text-gray-400">
                Camera Bewaking <span className="text-xs text-gray-500">(op aanvraag)</span>
              </div>
              <div className="text-sm text-gray-400">
                Smart Home
              </div>
              <div className="text-sm text-gray-400">
                Bekabeling
              </div>
              <div className="text-sm text-gray-400">
                Rookmelders
              </div>
            </nav>
          </div>

          {/* Kolom 3: Over Ons */}
          <div>
            <h3 className="font-semibold text-white text-base mb-4">Over Ons</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-400 leading-relaxed">
                Professionele alarmsystemen voor woning en bedrijf.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Configureer en bestel online, wij installeren het voor u.
              </p>
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Slootwijkersteeg 11, 7241DS Lochem</span>
                </div>
                <a href="tel:0573215100" className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>0573 - 21 51 00</span>
                </a>
                <a href="mailto:info@demeestersintechniek.nl" className="flex items-start gap-2 text-sm text-gray-400 hover:text-accent transition-colors">
                  <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@demeestersintechniek.nl</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} AlarmWebshop. Alle rechten voorbehouden.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-accent transition-colors">
                Privacy verklaring
              </Link>
              <Link href="/voorwaarden" className="text-gray-400 hover:text-accent transition-colors">
                Algemene voorwaarden
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-accent transition-colors">
                Cookiebeleid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
