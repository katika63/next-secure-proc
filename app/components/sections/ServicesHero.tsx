'use client'

import { motion } from 'framer-motion'

const ServicesHero = () => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Security Services</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Comprehensive cybersecurity solutions designed to protect your organization 
            from evolving threats and ensure business continuity.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <i className="fas fa-shield-alt text-blue-400"></i>
              <span>24/7 Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-users text-blue-400"></i>
              <span>Expert Team</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-clock text-blue-400"></i>
              <span>Rapid Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-certificate text-blue-400"></i>
              <span>Certified Solutions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesHero