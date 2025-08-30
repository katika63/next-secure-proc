'use client'

import { motion } from 'framer-motion'

interface ServiceCTAProps {
  service: string
}

const ServiceCTA = ({ service }: ServiceCTAProps) => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Enhance Your <span className="gradient-text">Security</span>?
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Don't wait for a security incident to happen. Contact our experts today to learn 
            how our {service} services can protect your organization from cyber threats.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <a 
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 text-lg"
            >
              Get Free Consultation
            </a>
            <a 
              href="/services"
              className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-8 py-4 rounded-lg font-medium transition-all duration-300 text-lg"
            >
              View All Services
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <i className="fas fa-phone text-blue-400"></i>
              <span>24/7 Emergency Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-shield-alt text-blue-400"></i>
              <span>No Long-term Contracts</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-clock text-blue-400"></i>
              <span>Rapid Deployment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceCTA