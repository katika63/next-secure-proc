import { Metadata } from 'next'
import ServiceHero from '../../components/sections/ServiceHero'
import ServiceDetails from '../../components/sections/ServiceDetails'
import ServiceFeatures from '../../components/sections/ServiceFeatures'
import ServiceCTA from '../../components/sections/ServiceCTA'

export const metadata: Metadata = {
  title: 'Threat Detection Services | BTM Security',
  description: 'Advanced AI-powered threat detection and monitoring services to identify and respond to cyber threats in real-time.',
  keywords: ['threat detection', 'cybersecurity monitoring', 'AI security', 'real-time protection'],
}

export default function ThreatDetectionPage() {
  const serviceData = {
    title: 'Threat Detection & Response',
    subtitle: 'AI-Powered Real-Time Protection',
    description: 'Our advanced threat detection system uses artificial intelligence and machine learning to identify and respond to cyber threats in real-time, protecting your organization 24/7.',
    icon: 'fas fa-shield-virus',
    color: 'from-blue-500 to-cyan-500',
    features: [
      {
        title: 'Real-Time Monitoring',
        description: 'Continuous monitoring of your network, endpoints, and cloud infrastructure for suspicious activities.',
        icon: 'fas fa-eye'
      },
      {
        title: 'AI-Powered Detection',
        description: 'Machine learning algorithms that adapt to new threats and reduce false positives.',
        icon: 'fas fa-brain'
      },
      {
        title: 'Automated Response',
        description: 'Immediate automated responses to contain threats before they can cause damage.',
        icon: 'fas fa-bolt'
      },
      {
        title: 'Threat Intelligence',
        description: 'Integration with global threat intelligence feeds for enhanced detection capabilities.',
        icon: 'fas fa-globe'
      }
    ],
    benefits: [
      'Reduce security incidents by up to 90%',
      'Minimize false positives with AI-driven analysis',
      'Faster threat response times (< 15 minutes)',
      'Comprehensive visibility across all environments',
      '24/7 monitoring and alerting',
      'Detailed forensic analysis and reporting'
    ],
    process: [
      {
        step: '1',
        title: 'Assessment',
        description: 'We analyze your current security posture and identify monitoring requirements.'
      },
      {
        step: '2',
        title: 'Deployment',
        description: 'Install and configure our threat detection sensors across your infrastructure.'
      },
      {
        step: '3',
        title: 'Monitoring',
        description: 'Continuous 24/7 monitoring with real-time threat analysis and detection.'
      },
      {
        step: '4',
        title: 'Response',
        description: 'Immediate response to threats with containment and remediation actions.'
      }
    ]
  }

  return (
    <>
      <ServiceHero {...serviceData} />
      <ServiceDetails {...serviceData} />
      <ServiceFeatures {...serviceData} />
      <ServiceCTA service="threat detection" />
    </>
  )
}