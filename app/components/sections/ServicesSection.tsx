'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    title: 'Threat Detection & Response',
    description: 'AI-powered threat hunting and real-time detection to stop attacks before they impact your business.',
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z M12 8v8 M8 12h8" />
      </svg>
    ),
    link: '/services'
  },
  {
    title: 'Vulnerability Management',
    description: 'Continuous scanning, assessment and remediation to eliminate vulnerabilities across your infrastructure.',
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    link: '/services'
  },
  {
    title: 'Incident Response',
    description: 'Rapid containment, analysis and recovery to minimize downtime and damage.',
    icon: (
      <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    link: '/services'
  },
  {
    title: 'Network Security',
    description: 'Protect your network with advanced firewalls, IDS/IPS and zero-trust security architectures.',
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    link: '/services'
  },
  {
    title: 'Cloud Security',
    description: 'Secure your cloud environments with best-in-class tools and expert security management.',
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    link: '/services'
  },
  {
    title: 'Security Training & Awareness',
    description: 'Empower your teams with training and simulations to build a security-first culture.',
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    link: '/enrollment'
  }
]

const ServicesSection = () => {
  return (
    <section className="py-20 px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-block text-xs font-bold tracking-widest text-blue-400 uppercase font-mono bg-blue-950/40 border border-blue-500/20 px-3 py-1 rounded-full">
            OUR SERVICES
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Cybersecurity Solutions
          </h2>
          <p className="text-slate-400 text-sm lg:text-base">
            End-to-end protection for your organization in an evolving threat landscape.
          </p>
        </div>

        {/* 6 Grid Cards aligned in 6 columns on desktop matching PNG screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-[#050b18]/80 border border-[#12203a] rounded-xl p-5 hover:border-blue-500/60 transition-all duration-300 group flex flex-col justify-between hover:shadow-xl hover:shadow-blue-600/10 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div className="space-y-4">
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md shadow-blue-500/10">
                  {service.icon}
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Link */}
              <div className="pt-5">
                <Link
                  href={service.link}
                  className="inline-flex items-center text-[11px] font-bold text-blue-400 hover:text-cyan-300 font-mono tracking-wide transition-colors group-hover:translate-x-1 duration-200"
                >
                  Learn More
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServicesSection