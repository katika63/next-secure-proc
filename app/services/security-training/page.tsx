import { Metadata } from 'next'
import SecurityTrainingHero from '../../components/sections/SecurityTrainingHero'
import TrainingMethodology from '../../components/sections/TrainingMethodology'
import TrainingPrograms from '../../components/sections/TrainingPrograms'
import TrainingCaseStudy from '../../components/sections/TrainingCaseStudy'
import TrainingCTA from '../../components/sections/TrainingCTA'

export const metadata: Metadata = {
  title: 'Security Training | BTM Security',
  description: 'Military-grade cybersecurity training programs to transform your workforce into the first line of defense against cyber threats.',
  keywords: ['security training', 'cybersecurity training', 'employee awareness', 'technical security training', 'executive cyber leadership'],
}

export default function SecurityTrainingPage() {
  return (
    <>
      <SecurityTrainingHero />
      <TrainingMethodology />
      <TrainingPrograms />
      <TrainingCaseStudy />
      <TrainingCTA />
    </>
  )
}