// components/sections/CourseCategories.js
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CourseCategories() {
  const [activeTab, setActiveTab] = useState('all')

  const courses = {
    beginner: [
      {
        id: 1,
        title: 'Cybersecurity Fundamentals',
        description: 'Learn the core concepts of cybersecurity, threats, and defense mechanisms.',
        duration: '40 hours',
        certification: 'Certificate',
        price: '$499',
        level: 'Beginner',
        levelClass: 'bg-blue-900 text-blue-300'
      },
      {
        id: 2,
        title: 'Network Security Basics',
        description: 'Understand network protocols, firewalls, and basic security configurations.',
        duration: '35 hours',
        certification: 'Certificate',
        price: '$449',
        level: 'Beginner',
        levelClass: 'bg-blue-900 text-blue-300'
      },
      {
        id: 3,
        title: 'Security Awareness',
        description: 'Essential security practices for non-technical staff and end-users.',
        duration: '20 hours',
        certification: 'Certificate',
        price: '$299',
        level: 'Beginner',
        levelClass: 'bg-blue-900 text-blue-300'
      }
    ],
    intermediate: [
      {
        id: 4,
        title: 'Ethical Hacking',
        description: 'Master penetration testing methodologies and tools used by security professionals.',
        duration: '60 hours',
        certification: 'Certificate',
        price: '$899',
        level: 'Intermediate',
        levelClass: 'bg-yellow-900 text-yellow-300'
      },
      {
        id: 5,
        title: 'Cloud Security',
        description: 'Security best practices for AWS, Azure, and GCP environments.',
        duration: '50 hours',
        certification: 'Certificate',
        price: '$799',
        level: 'Intermediate',
        levelClass: 'bg-yellow-900 text-yellow-300'
      },
      {
        id: 6,
        title: 'Web Application Security',
        description: 'Learn to identify and mitigate common web application vulnerabilities.',
        duration: '45 hours',
        certification: 'Certificate',
        price: '$749',
        level: 'Intermediate',
        levelClass: 'bg-yellow-900 text-yellow-300'
      }
    ],
    advanced: [
      {
        id: 7,
        title: 'Advanced Threat Analysis',
        description: 'Deep dive into advanced persistent threats and sophisticated attack vectors.',
        duration: '80 hours',
        certification: 'Certificate',
        price: '$1,299',
        level: 'Advanced',
        levelClass: 'bg-red-900 text-red-300'
      },
      {
        id: 8,
        title: 'Digital Forensics',
        description: 'Learn forensic investigation techniques for cyber incidents.',
        duration: '70 hours',
        certification: 'Certificate',
        price: '$1,099',
        level: 'Advanced',
        levelClass: 'bg-red-900 text-red-300'
      },
      {
        id: 9,
        title: 'Malware Analysis',
        description: 'Reverse engineering and analysis of malicious software.',
        duration: '90 hours',
        certification: 'Certificate',
        price: '$1,499',
        level: 'Advanced',
        levelClass: 'bg-red-900 text-red-300'
      }
    ],
    certifications: [
      {
        id: 10,
        title: 'CISSP Prep Course',
        description: 'Comprehensive preparation for the Certified Information Systems Security Professional exam.',
        duration: '100 hours',
        certification: 'Exam Voucher Included',
        price: '$1,599',
        level: 'Certification',
        levelClass: 'bg-purple-900 text-purple-300'
      },
      {
        id: 11,
        title: 'CEH v12 Bootcamp',
        description: 'Prepare for the Certified Ethical Hacker exam with hands-on labs.',
        duration: '80 hours',
        certification: 'Exam Voucher Included',
        price: '$1,399',
        level: 'Certification',
        levelClass: 'bg-purple-900 text-purple-300'
      },
      {
        id: 12,
        title: 'CompTIA Security+',
        description: 'Foundational security certification covering core security concepts.',
        duration: '60 hours',
        certification: 'Exam Voucher Included',
        price: '$999',
        level: 'Certification',
        levelClass: 'bg-purple-900 text-purple-300'
      }
    ],
    analyst: [
      {
        id: 13,
        title: 'SOC Analyst Level 1',
        description: 'Entry-level security operations center training for monitoring and triage.',
        duration: '50 hours',
        certification: 'Certificate',
        price: '$799',
        level: 'Analyst',
        levelClass: 'bg-green-900 text-green-300'
      },
      {
        id: 14,
        title: 'Threat Intelligence',
        description: 'Learn to collect, analyze, and apply threat intelligence data.',
        duration: '65 hours',
        certification: 'Certificate',
        price: '$1,099',
        level: 'Analyst',
        levelClass: 'bg-green-900 text-green-300'
      },
      {
        id: 15,
        title: 'SIEM Fundamentals',
        description: 'Master Splunk, QRadar, and ArcSight for security monitoring.',
        duration: '55 hours',
        certification: 'Certificate',
        price: '$899',
        level: 'Analyst',
        levelClass: 'bg-green-900 text-green-300'
      }
    ]
  }

  const allCourses = [
    ...courses.beginner,
    ...courses.intermediate,
    ...courses.advanced,
    ...courses.certifications,
    ...courses.analyst
  ]

  const tabs = [
    { id: 'all', label: 'All Programs' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'analyst', label: 'Analyst Path' }
  ]

  const filteredCourses = activeTab === 'all' ? allCourses : courses[activeTab as keyof typeof courses] || []

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex overflow-x-auto pb-2 mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'tab-active text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: {
            id: number;
            title: string;
            description: string;
            duration: string;
            certification: string;
            price: string;
            level: string;
            levelClass: string;
          }) => (
            <div key={course.id} className="course-card rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${course.levelClass}`}>
                  {course.level}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{course.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                <span><i className="fas fa-clock mr-1"></i> {course.duration}</span>
                <span><i className="fas fa-certificate mr-1"></i> {course.certification}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-medium">{course.price}</span>
                <Link href="#enroll" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  Enroll Now <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}