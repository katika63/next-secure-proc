import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/ui/Navigation'
import Footer from './components/ui/Footer'
import VantaBackground from './components/ui/VantaBackground'
import CookieBanner from './components/sections/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030712',
}

export const metadata: Metadata = {
  title: 'BTMSecurity | Blue Team Module Security',
  description: 'BTM Security delivers enterprise-grade cyber intelligence, combining real-time behavioral analytics and zero-day threat prevention to keep your infrastructure secure.',
  keywords: ['cybersecurity', 'threat detection', 'AI security', 'blue team', 'incident response'],
  authors: [{ name: 'BTM Security Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
        />
      </head>
      <body className={`${inter.className} bg-[#030712] text-slate-100 font-sans`}>
        <VantaBackground />
        <div className="content-wrapper min-h-screen relative z-10 bg-[#030712]/60">
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </body>
    </html>
  )
}