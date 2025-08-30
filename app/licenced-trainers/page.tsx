// app/licenced-trainers/page.js
import { Metadata } from 'next'
import TrainersHero from '../components/sections/TrainersHero'
import RegionalTrainers from '../components/sections/RegionalTrainers'
import BecomeTrainer from '../components/sections/BecomeTrainer'

export const metadata: Metadata = {
  title: 'Certified Trainers | BTMSecurity',
  description: 'Our global network of licensed cybersecurity trainers are authorized to deliver BTMSecurity curriculum and certifications.',
  keywords: ['certified trainers', 'cybersecurity trainers', 'security training', 'licensed trainers', 'BTMSecurity trainers'],
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