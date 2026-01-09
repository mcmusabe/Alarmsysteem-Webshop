import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Bedrijfsinformatie */}
          <div className="lg:col-span-2">
            <p className="text-gray-300 mb-6 max-w-md font-light leading-relaxed">
              Professionele alarmsystemen voor woning en bedrijf. Configureer en bestel online, wij installeren het voor u.
            </p>
            <div className="space-y-3">
              <a 
                href="https://maps.google.com/?q=Slootwijkersteeg+11,+7241DS+Lochem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-300 hover:text-accent transition-colors group"
              >
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-light">Slootwijkersteeg 11, 7241DS Lochem</span>
              </a>
              <a 
                href="tel:0573215100" 
                className="flex items-center gap-3 text-gray-300 hover:text-accent transition-colors group"
              >
                <svg className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">0573 - 21 51 00</span>
              </a>
              <a 
                href="mailto:info@demeestersintechniek.nl" 
                className="flex items-center gap-3 text-gray-300 hover:text-accent transition-colors group"
              >
                <svg className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-light">info@demeestersintechniek.nl</span>
              </a>
            </div>
          </div>

          {/* Snelle Links */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">Snelle Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent transition-colors inline-block font-light group">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Home</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/configurator" className="text-gray-300 hover:text-accent transition-colors inline-block font-light group">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Alarmsysteem Configurator</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/afspraak" className="text-gray-300 hover:text-accent transition-colors inline-block font-light group">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Afspraak Inplannen</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/bestellen" className="text-gray-300 hover:text-accent transition-colors inline-block font-light group">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Bestellen</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Diensten */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">Diensten</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/configurator" className="text-gray-300 hover:text-accent transition-colors inline-block font-light group">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>Alarm Systeem</span>
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-gray-300 font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span>Camera Bewaking</span>
                  <span className="text-xs text-gray-500 ml-1">(op aanvraag)</span>
                </span>
              </li>
              <li>
                <span className="text-gray-300 font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span>Smart Home</span>
                </span>
              </li>
              <li>
                <span className="text-gray-300 font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span>Bekabeling</span>
                </span>
              </li>
              <li>
                <span className="text-gray-300 font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span>Rookmelders</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-light">
              © {currentYear} AlarmWebshop. Alle rechten voorbehouden.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors font-light">
                Privacy verklaring
              </Link>
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors font-light">
                Algemene voorwaarden
              </Link>
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors font-light">
                Cookiebeleid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
