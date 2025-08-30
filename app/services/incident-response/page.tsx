import { Metadata } from 'next'
import ServiceHero from '../../components/sections/ServiceHero'
import ServiceDetails from '../../components/sections/ServiceDetails'
import ServiceFeatures from '../../components/sections/ServiceFeatures'
import ServiceCTA from '../../components/sections/ServiceCTA'

export const metadata: Metadata = {
  title: 'Incident Response Services | BTM Security',
  description: '24/7 emergency response to contain and eradicate threats with military precision. Certified Incident Handlers with rapid response times.',
  keywords: ['incident response', 'emergency security', 'ransomware response', 'cyber attack containment'],
}

export default function IncidentResponsePage() {
  const serviceData = {
    title: 'Incident Response',
    subtitle: '24/7 Emergency Threat Response',
    description: 'Our Certified Incident Handlers average a 12-minute response time globally, with containment achieved in under 47 minutes (vs. industry average 3.2 hours).',
    icon: 'fas fa-phone-alt',
    color: 'from-red-500 to-orange-500',
    features: [
      {
        title: 'Emergency Response',
        description: 'On-site teams mobilized within 2 hours in major cities worldwide with 24/7/365 SOC support.',
        icon: 'fas fa-bolt'
      },
      {
        title: 'Ransomware Containment',
        description: '100% success rate in ransomware attack containment since 2020 with proven eradication methods.',
        icon: 'fas fa-user-shield'
      },
      {
        title: 'Forensic Analysis',
        description: 'Comprehensive digital forensics to identify root causes and prevent future incidents.',
        icon: 'fas fa-search-plus'
      },
      {
        title: 'Recovery Planning',
        description: 'Complete system restoration and business continuity implementation after containment.',
        icon: 'fas fa-shield-virus'
      }
    ],
    benefits: [
      '12-minute average initial response time',
      '47-minute average containment time (vs. 3.2 hour industry average)',
      '100% ransomware containment success rate since 2020',
      'On-site teams in major cities worldwide',
      '24/7/365 Security Operations Center',
      'Zero ransom payments through proper recovery'
    ],
    process: [
      {
        step: '1',
        title: 'Identification',
        description: 'Immediate triage within 15 minutes of notification with log analysis and threat assessment.'
      },
      {
        step: '2',
        title: 'Containment',
        description: 'Rapid containment averaging 32 minutes through network segmentation and endpoint isolation.'
      },
      {
        step: '3',
        title: 'Eradication',
        description: 'Complete threat removal including malware eradication and vulnerability patching.'
      },
      {
        step: '4',
        title: 'Recovery',
        description: 'Full system restoration with validation and continuous monitoring post-recovery.'
      }
    ]
  }

  return (
    <>
      <ServiceHero {...serviceData} />
      <ServiceDetails {...serviceData} />
      <ServiceFeatures {...serviceData} />
      <ServiceCTA service="incident response" />
    </>
  )
}