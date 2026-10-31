import type { Metadata } from 'next'
import OperationsContent from '../components/sections/OperationsContent'

export const metadata: Metadata = {
  title: 'Areas of Operation | BTM Security',
  description: 'BTM Security operational coverage directory. We operate remotely and deliver security services globally, with priority coverage across African fintech, banking, telecom, SaaS, e-commerce, and public-sector environments.',
  keywords: [
    'areas of operation',
    'cybersecurity Africa',
    'Nigeria cybersecurity',
    'Kenya cybersecurity',
    'Ghana cybersecurity',
    'South Africa cybersecurity',
    'remote cybersecurity services',
    'fintech security',
    'banking cyber defense'
  ]
}

export default function OperationsPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <OperationsContent />
    </main>
  )
}
