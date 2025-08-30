'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Button from '../ui/Button'

const HeroSection = () => {
  const [visitorInfo, setVisitorInfo] = useState('Loading IP info...')

  useEffect(() => {
    // Fetch visitor IP information
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const ip = data.ip
        const country = data.country_name
        const isp = data.org
        setVisitorInfo(`${ip} • ${country} • ${isp}`)
      })
      .catch(() => {
        setVisitorInfo('IP info unavailable')
      })
  }, [])

  return (
    <section 
      id="home"
      className="relative py-28 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Hero Content */}
        <motion.div 
          className="animate-slide-in-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block px-5 py-1.5 mb-4 bg-blue-600/20 text-blue-400 rounded-full text-base font-mono tracking-wide">
            {visitorInfo}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              AI-Powered Threat Protection
            </span>
            <span className="block text-white mt-2">Designed for Modern Enterprises</span>
          </h1>

          <p className="text-gray-300 text-lg max-w-lg leading-relaxed mb-8">
            BTM Security delivers enterprise-grade cyber intelligence, combining real-time behavioral
            analytics and zero-day threat prevention to keep your infrastructure secure.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link 
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Contact Security Team
            </Link>
            <Link 
              href="/services"
              className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div 
          className="animate-slide-in-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="relative">
            <Image
              src="/img/btm-security.png"
              alt="Cybersecurity Visualization"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg border border-gray-700 max-w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection