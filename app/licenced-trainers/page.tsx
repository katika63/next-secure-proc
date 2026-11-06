import { Metadata } from 'next'
import TrainersHero from '../components/sections/TrainersHero'
import RegionalTrainers from '../components/sections/RegionalTrainers'
import BecomeTrainer from '../components/sections/BecomeTrainer'

export const metadata: Metadata = {
  title: 'Licensed Trainers in Nigeria | BTMSecurity',
  description: 'Our certified network of licensed cybersecurity trainers across Nigeria authorized to deliver BTMSecurity curriculum and certifications.',
  keywords: ['certified trainers Nigeria', 'cybersecurity trainers Nigeria', 'security training Nigeria', 'licensed trainers Lagos Abuja', 'BTMSecurity trainers'],
}

export default function LicensedTrainersPage() {
  return (
    <>
      <TrainersHero />
      <RegionalTrainers />
      <BecomeTrainer />
    </>
  )
}
