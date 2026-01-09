import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

// Static export voor betere performance
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate elke uur

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Sectie */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(29, 207, 142, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6 animate-fade-in">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-accent">Professionele Alarmsystemen</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-fade-in-up">
              Alarmsysteem op Maat
              <br />
              <span className="bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
                AlarmWebshop
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up-delay">
              Configureer en bestel uw alarmsysteem in 6 eenvoudige stappen. 
              <br className="hidden md:block" />
              Kies zelf de kleur (zwart of wit) en het aantal componenten.
            </p>
            <p className="text-base text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in-up-delay-2">
              Real-time prijsberekening • Direct afspraak inplannen • Kopen of huren mogelijk
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delay-3">
              <Link href="/configurator" className="group">
                <Button variant="accent" size="lg" className="text-lg px-8 py-4 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 group-hover:scale-105">
                  <span className="flex items-center gap-2">
                    Bestel Nu Uw Alarmsysteem
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </Link>
              <a href="tel:0573215100" className="group">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-white/20 text-white bg-white/5 backdrop-blur-sm hover:!bg-white hover:!text-black hover:border-white transition-all duration-300 group-hover:scale-105">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Bel: 0573 - 21 51 00
                  </span>
                </Button>
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400 animate-fade-in-up-delay-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Gratis Offerte</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Snelle Installatie</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Professioneel Advies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Belangrijkste Features - Alarmsysteem */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
              Uw Alarmsysteem Samenstellen
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto font-light">
              Kies zelf alle componenten en kleuren voor uw perfecte alarmsysteem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <Card className="text-center border-2 border-black hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Woning of Bedrijf</h3>
              <p className="text-gray-800 mb-4">
                Kies het type pand. Voor bedrijven worden automatisch alarmcentrale, flitser, sirene en bedienpaneel toegevoegd.
              </p>
            </Card>

            <Card className="text-center border-2 border-black hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Aantal Deuren & Ruimtes</h3>
              <p className="text-gray-800 mb-4">
                Geef aan hoeveel deuren u wilt beveiligen met deurcontacten en hoeveel ruimtes met PIR sensoren.
              </p>
            </Card>

            <Card className="text-center border-2 border-black hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Kleur Keuze</h3>
              <p className="text-gray-800 mb-4">
                Kies tussen <strong>zwart</strong> of <strong>wit</strong> componenten voor uw alarmsysteem.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <div className="w-16 h-16 bg-gray-900 rounded-lg border-2 border-gray-700 shadow-md"></div>
                <div className="w-16 h-16 bg-white rounded-lg border-2 border-gray-300 shadow-md"></div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/configurator">
              <Button variant="accent" size="lg" className="text-lg px-8 py-4">
                Start Alarmsysteem Configurator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hoe werkt het Sectie */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
              Hoe bestelt u uw alarmsysteem?
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto font-light">
              In 6 eenvoudige stappen naar uw perfecte alarmsysteem
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center group relative">
                <div className="absolute inset-0 bg-accent/5 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:shadow-lg shadow-accent/20">
                    1
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-black">Configureer</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Kies tussen woning of bedrijf, geef aantal deuren en ruimtes op, en selecteer uw kleur (zwart of wit)
                  </p>
                </div>
              </div>

              <div className="text-center group relative">
                <div className="absolute inset-0 bg-accent/5 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:shadow-lg shadow-accent/20">
                    2
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-black">Bekijk Prijs</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Zie direct de prijs van uw alarmsysteem inclusief alle componenten en installatie
                  </p>
                </div>
              </div>

              <div className="text-center group relative">
                <div className="absolute inset-0 bg-accent/5 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:shadow-lg shadow-accent/20">
                    3
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-black">Bestel</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Bestel online (kopen of huren) en plan direct een afspraak voor installatie
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 text-center border-2 border-gray-200 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-medium text-black mb-4">
                Klaar om te bestellen?
              </h3>
              <p className="text-lg text-gray-900 mb-6">
                Start nu met het configureren van uw alarmsysteem. Kies uw kleur, aantal componenten en bestel direct online.
              </p>
              <Link href="/configurator">
                <Button variant="accent" size="lg" className="text-lg px-8 py-4">
                  Bestel Uw Alarmsysteem Nu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kleur Keuze Sectie */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
              Kies Uw Kleur: Zwart of Wit
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto font-light">
              Alle alarmsysteem componenten zijn beschikbaar in beide kleuren
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-2 border-gray-900 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="w-32 h-32 bg-gray-900 rounded-lg mx-auto mb-6 flex items-center justify-center border-4 border-gray-700 shadow-lg">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium mb-2">Zwart</h3>
              <p className="text-gray-800 mb-4">
                Professionele, discrete uitstraling. Perfect voor moderne interieurs en bedrijfspanden.
              </p>
              <ul className="text-left text-gray-800 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Alle componenten in zwart</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Moderne uitstraling</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Discrete integratie</span>
                </li>
              </ul>
            </Card>

            <Card className="text-center border-2 border-gray-300 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-6 flex items-center justify-center border-4 border-gray-300 shadow-lg">
                <svg className="w-16 h-16 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium mb-2">Wit</h3>
              <p className="text-gray-800 mb-4">
                Moderne, lichte uitstraling. Ideaal voor lichte interieurs en woningen.
              </p>
              <ul className="text-left text-gray-800 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Alle componenten in wit</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Lichte, moderne look</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Past bij lichte muren</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/configurator">
              <Button variant="accent" size="lg" className="text-lg px-8 py-4">
                Kies Uw Kleur en Bestel Nu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Wat zit er in uw alarmsysteem */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
              Wat zit er in uw alarmsysteem?
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto font-light">
              Alle componenten die u nodig heeft voor een compleet alarmsysteem
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative w-full min-h-[400px] md:min-h-[500px] rounded-lg overflow-hidden shadow-2xl bg-gray-50 p-4 md:p-8">
              <Image
                src="/foto's/syst.png.png"
                alt="Alarmsysteem componenten: Alarmcentrale, Deurcontacten, PIR Sensoren, Flitser, Sirene en Bedienpaneel"
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Optionele Extra's */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
              Optionele Extra&apos;s
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto font-light">
              Naast uw alarmsysteem kunnen wij ook camera&apos;s leveren en installeren
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="text-center border-2 border-black hover:border-accent transition-all duration-300 hover:shadow-xl group">
              <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-black">Camera Bewaking</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Wilt u naast uw alarmsysteem ook camera&apos;s? Neem contact met ons op voor een offerte op maat.
              </p>
              <a href="tel:0573215100" className="group/btn">
                <Button variant="outline" size="md" className="group-hover/btn:scale-105 transition-transform">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Bel voor Camera Offerte: 0573 - 21 51 00
                  </span>
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Sectie */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(29, 207, 142, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Klaar om uw alarmsysteem te bestellen?
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-2xl mx-auto leading-relaxed">
              Configureer nu uw alarmsysteem, kies uw kleur (zwart of wit) en bestel direct online.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mb-10">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Kopen of huren mogelijk</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Real-time prijsberekening</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Direct afspraak inplannen</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/configurator" className="group">
                <Button variant="accent" size="lg" className="text-lg px-8 py-4 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 group-hover:scale-105">
                  <span className="flex items-center gap-2">
                    Bestel Nu Uw Alarmsysteem
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </Link>
              <Link href="/afspraak" className="group">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-white/20 text-white bg-white/5 backdrop-blur-sm hover:!bg-white hover:!text-black hover:border-white transition-all duration-300 group-hover:scale-105">
                  <span className="flex items-center gap-2">
                    Plan Installatie Afspraak
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
