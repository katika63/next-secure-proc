import HeroSection from './components/sections/HeroSection'
import TrustedBySection from './components/sections/TrustedBySection'
import ServicesSection from './components/sections/ServicesSection'
import SecurityDashboardSection from './components/sections/SecurityDashboardSection'
import AttackSurfaceSection from './components/sections/AttackSurfaceSection'
import CookieBanner from './components/sections/CookieBanner'
import SmartsuppChat from './components/sections/SmartsuppChat'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <SecurityDashboardSection />
      <AttackSurfaceSection />
      <CookieBanner />
      <SmartsuppChat />
    </>
  )
}