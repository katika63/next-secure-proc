'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { database, ref, push, set } from '../lib/firebase'

export default function CareersPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    coverLetter: '',
    resumeFile: null as File | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const positions = [
    {
      title: 'Senior Security Analyst',
      department: 'Security Operations',
      location: 'Remote / Hybrid',
      type: 'Full-time',
      description: 'Lead threat detection and incident response activities for our clients.',
      requirements: [
        '5+ years in cybersecurity',
        'CISSP or similar certification',
        'Experience with SIEM tools',
        'Incident response expertise'
      ]
    },
    {
      title: 'Penetration Tester',
      department: 'Security Testing',
      location: 'On-site / Remote',
      type: 'Full-time',
      description: 'Conduct security assessments and penetration testing for client environments.',
      requirements: [
        '3+ years penetration testing',
        'CEH or OSCP certification',
        'Web application security',
        'Network security testing'
      ]
    },
    {
      title: 'Security Consultant',
      department: 'Advisory Services',
      location: 'Travel Required',
      type: 'Full-time',
      description: 'Provide strategic security guidance and consulting services to enterprise clients.',
      requirements: [
        '7+ years security consulting',
        'Strong communication skills',
        'Compliance frameworks knowledge',
        'Client-facing experience'
      ]
    }
  ]

  const benefits = [
    {
      icon: 'fas fa-heart',
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, dental, vision, and wellness programs.'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Learning & Development',
      description: 'Continuous training, certifications, and conference attendance support.'
    },
    {
      icon: 'fas fa-home',
      title: 'Work-Life Balance',
      description: 'Flexible work arrangements, remote options, and generous PTO policy.'
    },
    {
      icon: 'fas fa-dollar-sign',
      title: 'Competitive Compensation',
      description: 'Market-leading salaries, performance bonuses, and equity participation.'
    }
  ]

  const hiringProcess = [
    { step: 1, title: 'Application Review', description: 'Our team reviews your submission within 3 business days' },
    { step: 2, title: 'Technical Screening', description: '45-minute call with our hiring team' },
    { step: 3, title: 'Practical Assessment', description: 'Role-specific challenge to demonstrate skills' },
    { step: 4, title: 'Final Interview', description: 'Meet the team and discuss your potential impact' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Get a reference to the applications collection
      const applicationsRef = ref(database, 'jobApplications')
      
      // Create a new application entry
      const newApplicationRef = push(applicationsRef)
      
      // Prepare the data to save
      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        position: formData.position,
        resumeFileName: formData.resumeFile ? formData.resumeFile.name : 'No file uploaded',
        coverLetter: formData.coverLetter,
        submittedAt: new Date().toISOString()
      }

      // Save to Firebase
      await set(newApplicationRef, applicationData)

      setSubmitMessage('✅ Application submitted successfully! Please also email your resume to careers@btmsec.com')
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        coverLetter: '',
        resumeFile: null
      })
      
      // Reset file input
      const fileInput = document.getElementById('resume') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
    } catch (error: any) {
      console.error('Error submitting application:', error)
      
      if (error.code === 'PERMISSION_DENIED') {
        setSubmitMessage('❌ Database permission denied. Please contact support.')
      } else if (error.code === 'NETWORK_ERROR') {
        setSubmitMessage('❌ Network error. Please check your connection and try again.')
      } else {
        setSubmitMessage('❌ Error submitting application. Please try again or email us directly at careers@btmsec.com')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prevState => ({
      ...prevState,
      resumeFile: file
    }))
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white animate-gradient">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our <span className="gradient-text">Security Team</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Build your cybersecurity career with a team of experts dedicated to protecting 
              organizations from evolving cyber threats.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <i className="fas fa-users text-blue-400"></i>
                <span>Collaborative Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-rocket text-blue-400"></i>
                <span>Growth Opportunities</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-shield-alt text-blue-400"></i>
                <span>Cutting-edge Security</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">Why Join BTMSecurity?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-800/60 backdrop-blur-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Cutting-Edge Security</h3>
              <p className="text-gray-300">Work with the latest cybersecurity technologies and threat intelligence</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-800/60 backdrop-blur-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
                <i className="fas fa-globe text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Global Impact</h3>
              <p className="text-gray-300">Protect clients across 45+ countries from sophisticated cyber threats</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-800/60 backdrop-blur-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
                <i className="fas fa-graduation-cap text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Continuous Learning</h3>
              <p className="text-gray-300">$5,000 annual training budget and certification support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Open <span className="gradient-text">Positions</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore exciting career opportunities in cybersecurity and join our mission 
              to protect organizations worldwide.
            </p>
          </div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 hover:border-gray-600 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold">{position.title}</h3>
                      <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {position.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-clock"></i>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{position.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Key Requirements:</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                            <i className="fas fa-check text-blue-400"></i>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <button 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, position: position.title }))
                        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Work <span className="gradient-text">With Us</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We offer competitive benefits and a supportive environment where you can grow 
              your cybersecurity career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${benefit.icon} text-blue-400 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-16 px-6 bg-gray-800/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Our Hiring Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {hiringProcess.map((process, index) => (
              <motion.div
                key={process.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {process.step}
                </div>
                <h3 className="font-bold mb-2">{process.title}</h3>
                <p className="text-gray-300 text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Apply Now</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitMessage && (
              <div className={`p-4 rounded-lg text-center ${
                submitMessage.includes('✅') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
              }`}>
                {submitMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-300 mb-2">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-300 mb-2">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-gray-300 mb-2">Position *</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select a position</option>
                {positions.map((position) => (
                  <option key={position.title} value={position.title}>
                    {position.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="resume" className="block text-gray-300 mb-2">Resume/CV *</label>
              <input
                type="file"
                id="resume"
                onChange={handleFileChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-gray-300 mb-2">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={4}
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Tell us why you'd be a great fit for this position..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>

          {/* Important Notice */}
          <div className="mt-8 p-4 border border-gray-600 rounded-lg bg-gray-900/50">
            <h3 className="text-lg font-bold mb-2 text-blue-400">📌 Important Notice</h3>
            <p className="text-gray-300 text-sm">
              All applicants are required to <strong>submit a copy of their submitted application form</strong> to the following email address for internal review:
            </p>
            <p className="text-blue-400 font-bold mt-2">📧 careers@btmsec.com</p>
            <p className="text-gray-300 text-sm mt-2">
              Please ensure the form is filled out completely before sending it via email. This step is mandatory in addition to the online submission.
            </p>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Don't See the Right Position?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              We're always looking for talented cybersecurity professionals. 
              Send us your resume and let us know how you'd like to contribute to our mission.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Send Your Resume
              </a>
              <a 
                href="/our-team"
                className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Meet Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}