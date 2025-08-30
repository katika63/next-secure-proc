// app/our-mission/page.js
import { Metadata } from 'next'
import MissionHero from '../../components/sections/MissionHero'
import MissionCards from '../../components/sections/MissionCards'
import EducationSection from '../../components/sections/EducationSection'
import CommunityImpact from '../../components/sections/CommunityImpact'

export const metadata: Metadata = {
  title: 'Our Mission | BTM Security',
  description: 'Empowering organizations and individuals with cutting-edge cybersecurity knowledge and solutions to build a safer digital future.',
  keywords: ['cybersecurity mission', 'security education', 'cyber resilience', 'security training', 'community impact'],
}

export default function OurMissionPage() {
  return (
    <>
      <MissionHero />
      <MissionCards />
      <EducationSection />
      <CommunityImpact />
    </>
  )
}