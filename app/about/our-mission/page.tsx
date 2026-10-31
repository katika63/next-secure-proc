// app/about/our-mission/page.tsx
import { Metadata } from 'next'
import MissionHero from '../../components/sections/MissionHero'
import MissionCards from '../../components/sections/MissionCards'
import EducationSection from '../../components/sections/EducationSection'
import CommunityImpact from '../../components/sections/CommunityImpact'
import ClientLogoStrip from '../../components/sections/ClientLogoStrip'

export const metadata: Metadata = {
  title: 'Our Mission | BTM Security',
  description: 'Empowering organizations and individuals with cutting-edge cybersecurity knowledge and solutions to build a safer digital future across Africa and globally.',
  keywords: ['cybersecurity mission', 'security education', 'cyber resilience', 'security training', 'community impact'],
}

export default function OurMissionPage() {
  return (
    <>
      <MissionHero />
      <ClientLogoStrip 
        title="TRUSTED BY INDUSTRY LEADERS & ENTERPRISES"
        subtitle="Partnering with top technology, fintech, and commercial enterprises across Africa"
        compact={true}
      />
      <MissionCards />
      <EducationSection />
      <CommunityImpact />
    </>
  )
}