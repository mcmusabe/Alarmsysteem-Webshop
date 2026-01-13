import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/Auth/AuthProvider'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

// Lazy load Header to prevent hydration issues
const Header = dynamic(() => import('@/components/Header'), {
  ssr: false,
  loading: () => (
    <header className="sticky top-0 z-50 bg-black shadow-md">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="h-8 w-32 bg-gray-800 animate-pulse rounded"></div>
        </div>
      </div>
    </header>
  ),
})

// Lazy load ChatbotWidget voor betere initial load performance
const ChatbotWidget = dynamic(() => import('@/components/Chatbot/ChatbotWidget'), {
  ssr: false,
  loading: () => null,
})
import { ToastProvider } from '@/components/ui/ToastContainer'

export const metadata: Metadata = {
  title: 'AlarmWebshop',
  description: 'Configureer en bestel uw alarmsysteem op maat. Kies tussen zwart of wit, woning of bedrijf. Real-time prijsberekening.',
  keywords: 'alarmsysteem, beveiliging, alarm installatie, Lochem, AlarmWebshop',
  openGraph: {
    title: 'AlarmWebshop',
    description: 'Configureer en bestel uw alarmsysteem op maat',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className="scroll-smooth">
      <head>
        {/* DNS prefetch voor externe resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect voor fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload belangrijkste font */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;900&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white antialiased">
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ChatbotWidget />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
