import HeroSection from './components/sections/HeroSection'
import TrustedBySection from './components/sections/TrustedBySection'
import ServicesSection from './components/sections/ServicesSection'
import SecurityDashboardSection from './components/sections/SecurityDashboardSection'
import CaseStudyHighlight from './components/sections/CaseStudyHighlight'
import AttackSurfaceSection from './components/sections/AttackSurfaceSection'
import SmartsuppChat from './components/sections/SmartsuppChat'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <SecurityDashboardSection />
      <CaseStudyHighlight />
      <AttackSurfaceSection />
      <SmartsuppChat />
    </>
  )
}