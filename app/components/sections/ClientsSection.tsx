'use client'

import { motion } from 'framer-motion'

const ClientsSection = () => {
  const clientTestimonials = [
    {
      icon: 'fas fa-building',
      industry: 'Financial Services',
      sector: 'Banking & Insurance',
      testimonial: "BTM Security's advanced threat detection helped us prevent a sophisticated attack that could have cost millions.",
      company: 'Major Banking Institution'
    },
    {
      icon: 'fas fa-hospital',
      industry: 'Healthcare',
      sector: 'Medical & Research',
      testimonial: "Their incident response team was instrumental in containing a ransomware attack within hours, protecting patient data.",
      company: 'Healthcare Network'
    },
    {
      icon: 'fas fa-industry',
      industry: 'Manufacturing',
      sector: 'Industrial & Energy',
      testimonial: "The vulnerability management program identified critical weaknesses in our industrial control systems.",
      company: 'Energy Corporation'
    },
    {
      icon: 'fas fa-graduation-cap',
      industry: 'Education',
      sector: 'Universities & Research',
      testimonial: "BTM Security's training programs significantly improved our staff's security awareness and response capabilities.",
      company: 'Research University'
    }
  ]

  return (
    <section id="clients" className="py-20 px-6 bg-gray-800 bg-opacity-60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Valued Clients</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We partner with organizations across industries to deliver exceptional security outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clientTestimonials.map((client, index) => (
            <motion.div
              key={client.industry}
              className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-900 bg-opacity-50 flex items-center justify-center mr-4">
                  <i className={`${client.icon} text-blue-400 text-2xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{client.industry}</h3>
                  <p className="text-gray-400">{client.sector}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-300 mb-4 italic">
                "{client.testimonial}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-sm"></i>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">- {client.company}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Secure Your Organization?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations that trust BTM Security to protect their critical assets and data.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Get Started Today
            </a>
            <a 
              href="/services"
              className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              View All Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ClientsSection