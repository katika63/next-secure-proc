// app/enrollment/page.js
import { Metadata } from 'next'
import EnrollmentHero from '../components/sections/EnrollmentHero'
import CourseCategories from '../components/sections/CourseCategories'
import EnrollmentForm from '../components/sections/EnrollmentForm'
import Testimonials from '../components/sections/Testimonials'

export const metadata: Metadata = {
  title: 'Security Training Programs | BTMSecurity',
  description: 'Advance your cybersecurity skills with our industry-recognized training programs',
  keywords: ['security training', 'cybersecurity courses', 'training programs', 'certification courses', 'cybersecurity education'],
}

export default function EnrollmentPage() {
  return (
    <>
      <EnrollmentHero />
      <CourseCategories />
      <EnrollmentForm />
      <Testimonials />
    </>
  )
}