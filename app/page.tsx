import HeroSection from './components/sections/HeroSection'
import TrustedBySection from './components/sections/TrustedBySection'
import ServicesSection from './components/sections/ServicesSection'
import ClientsSection from './components/sections/ClientsSection'
import CookieBanner from './components/sections/CookieBanner'
import SmartsuppChat from './components/sections/SmartsuppChat'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <ClientsSection />
      <CookieBanner />
      <SmartsuppChat />
    </>
  )
}