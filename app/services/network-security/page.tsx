import { Metadata } from 'next'
import ServiceHero from '../../components/sections/ServiceHero'
import ServiceDetails from '../../components/sections/ServiceDetails'
import ServiceFeatures from '../../components/sections/ServiceFeatures'
import ServiceCTA from '../../components/sections/ServiceCTA'

export const metadata: Metadata = {
  title: 'Enterprise Network Security Services | BTM Security',
  description: 'Military-grade network protection with 24/7 monitoring and threat prevention. Multi-layered defense strategy with 99.99% threat blocking efficacy.',
  keywords: ['network security', 'enterprise firewall', 'intrusion prevention', 'zero trust', 'network monitoring'],
}

export default function NetworkSecurityPage() {
  const serviceData = {
    title: 'Enterprise Network Security',
    subtitle: 'Military-Grade Network Protection',
    description: 'BTMSecurity implements multi-layered network protection combining next-gen firewalls, intrusion prevention, and AI-driven anomaly detection with 99.99% threat blocking efficacy.',
    icon: 'fas fa-shield-alt',
    color: 'from-green-500 to-teal-500',
    features: [
      {
        title: 'Firewall Management',
        description: '24/7 firewall monitoring with automated rule optimization and threat intelligence integration.',
        icon: 'fas fa-lock'
      },
      {
        title: 'Intrusion Prevention',
        description: 'Anomaly-based detection with behavioral analysis and automated threat blocking capabilities.',
        icon: 'fas fa-bug'
      },
      {
        title: 'Zero Trust Implementation',
        description: 'Identity-based access controls with micro-segmentation and continuous authentication.',
        icon: 'fas fa-user-secret'
      },
      {
        title: 'Network Monitoring',
        description: 'Real-time traffic analysis with deep packet inspection and AI-powered behavioral analysis.',
        icon: 'fas fa-network-wired'
      }
    ],
    benefits: [
      '99.99% threat blocking efficacy rate',
      'Zero successful breaches for protected networks',
      '78% reduced attack surface through micro-segmentation',
      '24/7 network monitoring and threat detection',
      'Real-time traffic analysis with deep packet inspection',
      'AI-powered behavioral analysis detecting novel threats'
    ],
    process: [
      {
        step: '1',
        title: 'Security Assessment',
        description: 'Comprehensive analysis of current network infrastructure and vulnerability assessment.'
      },
      {
        step: '2',
        title: 'Architecture Design',
        description: 'Custom Zero Trust architecture design with multi-layered defense strategy.'
      },
      {
        step: '3',
        title: 'Implementation',
        description: 'Deployment of next-gen firewalls, IPS, and network monitoring solutions.'
      },
      {
        step: '4',
        title: 'Continuous Monitoring',
        description: '24/7 security operations with real-time threat detection and response.'
      }
    ]
  }

  return (
    <>
      <ServiceHero {...serviceData} />
      <ServiceDetails {...serviceData} />
      <ServiceFeatures {...serviceData} />
      <ServiceCTA service="network security" />
    </>
  )
}