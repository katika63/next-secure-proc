'use client'

import { motion } from 'framer-motion'

interface ServiceHeroProps {
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
}

const ServiceHero = ({ title, subtitle, description, icon, color }: ServiceHeroProps) => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <i className={`${icon} text-white text-2xl`}></i>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
                <p className="text-xl text-blue-400 mt-2">{subtitle}</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {description}
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <a 
                href="#details"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Learn More
              </a>
              <a 
                href="/contact"
                className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Get Quote
              </a>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/20 rounded-lg p-4 text-center">
                  <i className="fas fa-shield-alt text-green-400 text-2xl mb-2"></i>
                  <div className="text-sm text-gray-300">Protected</div>
                  <div className="text-lg font-bold text-green-400">99.9%</div>
                </div>
                <div className="bg-blue-500/20 rounded-lg p-4 text-center">
                  <i className="fas fa-eye text-blue-400 text-2xl mb-2"></i>
                  <div className="text-sm text-gray-300">Monitored</div>
                  <div className="text-lg font-bold text-blue-400">24/7</div>
                </div>
                <div className="bg-yellow-500/20 rounded-lg p-4 text-center">
                  <i className="fas fa-bolt text-yellow-400 text-2xl mb-2"></i>
                  <div className="text-sm text-gray-300">Response</div>
                  <div className="text-lg font-bold text-yellow-400">&lt;15min</div>
                </div>
                <div className="bg-purple-500/20 rounded-lg p-4 text-center">
                  <i className="fas fa-brain text-purple-400 text-2xl mb-2"></i>
                  <div className="text-sm text-gray-300">AI Powered</div>
                  <div className="text-lg font-bold text-purple-400">Smart</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServiceHero