// app/about/our-mission/page.tsx
import { Metadata } from 'next'
import MissionHero from '@/app/components/sections/MissionHero'
import MissionCards from '@/app/components/sections/MissionCards'
import EducationSection from '@/app/components/sections/EducationSection'
import CommunityImpact from '@/app/components/sections/CommunityImpact'
import ClientLogoStrip from '@/app/components/sections/ClientLogoStrip'

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