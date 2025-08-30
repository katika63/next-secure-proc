// components/sections/EnrollmentForm.js
'use client'

import { useState } from 'react'
import { database, ref, push, set } from '../../lib/firebase'

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    trainingFormat: '',
    experience: ''
  })

  const [status, setStatus] = useState('')

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      // Reference to enrollments in database
      const enrollmentsRef = ref(database, 'enrollments')
      
      // Push new enrollment
      const newEnrollmentRef = push(enrollmentsRef)
      
      // Set the enrollment data
      await set(newEnrollmentRef, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        course: formData.course,
        format: formData.trainingFormat,
        experience: formData.experience,
        submittedAt: new Date().toISOString()
      })

      setStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        course: '',
        trainingFormat: '',
        experience: ''
      })
      
    } catch (error) {
      console.error('Error submitting enrollment:', error)
      setStatus('error')
    }
  }

  return (
    <section id="enroll" className="py-16 px-6">
      <div className="max-w-4xl mx-auto enrollment-form rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Enroll in a Training Program</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'success' && (
            <div className="bg-green-900 text-green-300 p-4 rounded-lg mb-4">
              Enrollment submitted successfully. Our team will review your submission and get back to you shortly.
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-red-900 text-red-300 p-4 rounded-lg mb-4">
              Something went wrong. Please try again.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-300 mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-300 mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="course" className="block text-gray-300 mb-2">Select Course</label>
            <select
              id="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select a Course --</option>
              <optgroup label="Beginner Courses">
                <option value="fundamentals">Cybersecurity Fundamentals ($499)</option>
                <option value="network-basics">Network Security Basics ($449)</option>
                <option value="awareness">Security Awareness ($299)</option>
              </optgroup>
              <optgroup label="Intermediate Courses">
                <option value="ethical-hacking">Ethical Hacking ($899)</option>
                <option value="cloud-security">Cloud Security ($799)</option>
                <option value="web-app-sec">Web Application Security ($749)</option>
              </optgroup>
              <optgroup label="Advanced Courses">
                <option value="threat-analysis">Advanced Threat Analysis ($1,299)</option>
                <option value="forensics">Digital Forensics ($1,099)</option>
                <option value="malware-analysis">Malware Analysis ($1,499)</option>
              </optgroup>
              <optgroup label="Certification Courses">
                <option value="cissp">CISSP Prep Course ($1,599)</option>
                <option value="ceh">CEH v12 Bootcamp ($1,399)</option>
                <option value="security-plus">CompTIA Security+ ($999)</option>
              </optgroup>
              <optgroup label="Analyst Path">
                <option value="soc-analyst">SOC Analyst Level 1 ($799)</option>
                <option value="threat-intel">Threat Intelligence ($1,099)</option>
                <option value="siem">SIEM Fundamentals ($899)</option>
              </optgroup>
            </select>
          </div>
          
          <div>
            <label htmlFor="trainingFormat" className="block text-gray-300 mb-2">Training Format</label>
            <select
              id="trainingFormat"
              value={formData.trainingFormat}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Format --</option>
              <option value="online-live">Online Live Instructor</option>
              <option value="online-self">Online Self-Paced</option>
              <option value="in-person">In-Person (Select locations)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="experience" className="block text-gray-300 mb-2">Current Experience Level</label>
            <select
              id="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Experience --</option>
              <option value="beginner">Beginner (0-1 years)</option>
              <option value="intermediate">Intermediate (1-3 years)</option>
              <option value="advanced">Advanced (3+ years)</option>
            </select>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-lg disabled:opacity-50"
            >
              {status === 'submitting' ? 'Processing...' : 'Complete Enrollment'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}