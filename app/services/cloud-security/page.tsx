import { Metadata } from 'next'
import ServiceHero from '../../components/sections/ServiceHero'
import ServiceDetails from '../../components/sections/ServiceDetails'
import ServiceFeatures from '../../components/sections/ServiceFeatures'
import ServiceCTA from '../../components/sections/ServiceCTA'

export const metadata: Metadata = {
  title: 'Cloud Security Services | BTM Security',
  description: 'Enterprise-grade protection for your cloud infrastructure across AWS, Azure, and GCP with comprehensive security solutions.',
  keywords: ['cloud security', 'AWS security', 'Azure protection', 'GCP security', 'cloud compliance', 'CSPM'],
}

export default function CloudSecurityPage() {
  const serviceData = {
    title: 'Cloud Security',
    subtitle: 'Enterprise-Grade Multi-Cloud Protection',
    description: 'Comprehensive security solutions for your cloud infrastructure across AWS, Azure, and GCP with continuous compliance monitoring, threat detection, and automated remediation.',
    icon: 'fas fa-cloud-shield-alt',
    color: 'from-blue-500 to-indigo-600',
    features: [
      {
        title: 'Cloud Security Posture Management',
        description: 'Real-time misconfiguration detection and compliance monitoring across all cloud environments.',
        icon: 'fas fa-cloud-upload-alt'
      },
      {
        title: 'Identity and Access Governance',
        description: 'Just-in-time privileges and comprehensive access controls for cloud identities.',
        icon: 'fas fa-user-lock'
      },
      {
        title: 'Cloud Workload Protection',
        description: 'Container security scanning, serverless protection, and VM vulnerability management.',
        icon: 'fas fa-server'
      },
      {
        title: 'Cloud Data Protection',
        description: 'Encryption key management, data loss prevention, and sensitive data discovery.',
        icon: 'fas fa-database'
      }
    ],
    benefits: [
      '94% reduction in cloud misconfigurations',
      'Zero cloud security incidents for compliant organizations',
      '100% compliance with industry regulations (HIPAA, SOC2, ISO)',
      '24/7 cloud security monitoring and threat detection',
      'Automated remediation of security vulnerabilities',
      'Unified security across AWS, Azure, and GCP environments'
    ],
    process: [
      {
        step: '1',
        title: 'Cloud Assessment',
        description: 'Comprehensive analysis of your current cloud security posture and compliance status.'
      },
      {
        step: '2',
        title: 'Architecture Review',
        description: 'Evaluation of your cloud architecture with security best practices and recommendations.'
      },
      {
        step: '3',
        title: 'Implementation',
        description: 'Deployment of CSPM, CWPP, and other cloud security tools tailored to your environment.'
      },
      {
        step: '4',
        title: 'Continuous Monitoring',
        description: '24/7 security monitoring, alerting, and automated response to threats.'
      }
    ]
  }

  return (
    <>
      <ServiceHero {...serviceData} />
      <ServiceDetails {...serviceData} />
      <ServiceFeatures {...serviceData} />
      <ServiceCTA service="cloud security" />
    </>
  )
}