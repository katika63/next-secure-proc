import type { Metadata } from 'next'
import PricingContent from './PricingContent'

export const metadata: Metadata = {
  title: 'Standard & Enterprise Plans | BTM Security',
  description: 'Nigeria based cybersecurity pricing for African organizations. Three transparent tiers: Starter ($1,500/mo), Standard ($3,000/mo), and Premium Enterprise ($5,000/week)  penetration testing, monitoring, and incident response.',
  keywords: [
    'cybersecurity pricing Nigeria',
    'penetration test cost Africa',
    'security monitoring pricing',
    'incident response retainer',
    'BTM security plans',
    'African cybersecurity packages'
  ]
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PricingContent />
    </main>
  )
}