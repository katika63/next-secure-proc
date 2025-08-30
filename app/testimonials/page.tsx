'use client'

import { motion } from 'framer-motion'

export default function TestimonialPage() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      title: 'CISO',
      company: 'Global Financial Services',
      industry: 'Financial Services',
      quote: "BTM Security's proactive approach to threat detection has been game-changing for our organization. Their AI-powered monitoring system identified and stopped a sophisticated attack that our previous solution missed entirely.",
      rating: 5,
      metrics: { incidents: '95%', response: '< 10 min', uptime: '99.9%' }
    },
    {
      name: 'Dr. Michael Chen',
      title: 'IT Director',
      company: 'Regional Healthcare Network',
      industry: 'Healthcare',
      quote: "The incident response team at BTM Security is exceptional. When we faced a ransomware attack, they contained it within hours and helped us recover without paying any ransom. Their expertise saved us millions.",
      rating: 5,
      metrics: { recovery: '4 hours', data: '100%', downtime: '0 days' }
    },
    {
      name: 'Jennifer Rodriguez',
      title: 'VP of Operations',
      company: 'Manufacturing Corporation',
      industry: 'Manufacturing',
      quote: "Their vulnerability management program is thorough and effective. BTM Security identified critical weaknesses in our industrial control systems that could have led to production shutdowns or safety incidents.",
      rating: 5,
      metrics: { vulnerabilities: '200+', compliance: '100%', incidents: '0' }
    },
    {
      name: 'David Thompson',
      title: 'CTO',
      company: 'Tech Startup',
      industry: 'Technology',
      quote: "As a growing startup, we needed enterprise-level security without the enterprise budget. BTM Security provided exactly that - world-class protection that scales with our business.",
      rating: 5,
      metrics: { cost: '40%', security: '300%', compliance: 'SOC 2' }
    },
    {
      name: 'Lisa Wang',
      title: 'Security Manager',
      company: 'University System',
      industry: 'Education',
      quote: "The security training programs from BTM Security transformed our campus culture. Faculty and staff are now our strongest defense against phishing and social engineering attacks.",
      rating: 5,
      metrics: { awareness: '85%', phishing: '90%', incidents: '70%' }
    },
    {
      name: 'Robert Johnson',
      title: 'IT Manager',
      company: 'City Government',
      industry: 'Government',
      quote: "BTM Security helped us achieve compliance with federal cybersecurity requirements while maintaining operational efficiency. Their expertise in government regulations is unmatched.",
      rating: 5,
      metrics: { compliance: '100%', audits: '5/5', efficiency: '95%' }
    }
  ]

  const stats = [
    { number: '98%', label: 'Client Satisfaction', icon: 'fas fa-heart' },
    { number: '500+', label: 'Happy Clients', icon: 'fas fa-users' },
    { number: '99.9%', label: 'Service Uptime', icon: 'fas fa-clock' },
    { number: '24/7', label: 'Support Available', icon: 'fas fa-headset' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Client <span className="gradient-text">Testimonials</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Hear from our clients about how BTM Security has helped protect their organizations 
              and achieve their cybersecurity goals.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className={`${stat.icon} text-blue-400 text-2xl`}></i>
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 hover:border-gray-600 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400 text-lg mr-1"></i>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-blue-400 font-medium">{testimonial.title}</p>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {testimonial.industry}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
                  {Object.entries(testimonial.metrics).map(([key, value], idx) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-blue-400">{value}</div>
                      <div className="text-xs text-gray-400 capitalize">
                        {key === 'incidents' ? 'Reduction' : 
                         key === 'response' ? 'Response Time' :
                         key === 'uptime' ? 'Uptime' :
                         key === 'recovery' ? 'Recovery Time' :
                         key === 'data' ? 'Data Recovered' :
                         key === 'downtime' ? 'Downtime' :
                         key === 'vulnerabilities' ? 'Fixed' :
                         key === 'compliance' ? 'Compliance' :
                         key === 'cost' ? 'Cost Savings' :
                         key === 'security' ? 'Security Boost' :
                         key === 'awareness' ? 'Awareness Up' :
                         key === 'phishing' ? 'Phishing Block' :
                         key === 'audits' ? 'Audit Score' :
                         key === 'efficiency' ? 'Efficiency' :
                         key}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Breakdown */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted Across <span className="gradient-text">Industries</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our clients span multiple industries, each with unique security challenges 
              and compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: 'Financial Services', icon: 'fas fa-university', count: '50+' },
              { name: 'Healthcare', icon: 'fas fa-heartbeat', count: '30+' },
              { name: 'Manufacturing', icon: 'fas fa-industry', count: '25+' },
              { name: 'Technology', icon: 'fas fa-microchip', count: '40+' },
              { name: 'Education', icon: 'fas fa-graduation-cap', count: '20+' },
              { name: 'Government', icon: 'fas fa-landmark', count: '15+' }
            ].map((industry, index) => (
              <motion.div
                key={industry.name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${industry.icon} text-blue-400 text-2xl`}></i>
                </div>
                <h3 className="font-bold mb-2">{industry.name}</h3>
                <p className="text-blue-400 font-medium">{industry.count} Clients</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              Experience the same level of protection and service that our clients rave about. 
              Contact us today for a free security consultation.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Get Free Consultation
              </a>
              <a 
                href="/our-clients"
                className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
              >
                View Client Stories
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}