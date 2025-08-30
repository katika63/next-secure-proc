'use client'

import { motion } from 'framer-motion'

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: 'fas fa-award',
      title: 'Industry Expertise',
      description: 'Over 15 years of experience protecting organizations across various industries from cyber threats.'
    },
    {
      icon: 'fas fa-clock',
      title: '24/7 Support',
      description: 'Round-the-clock monitoring and support to ensure your security posture is maintained at all times.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Proven Track Record',
      description: 'Successfully prevented thousands of cyber attacks and helped organizations recover from incidents.'
    },
    {
      icon: 'fas fa-users-cog',
      title: 'Expert Team',
      description: 'Certified security professionals with extensive experience in threat detection and incident response.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Measurable Results',
      description: 'Transparent reporting and metrics to demonstrate the effectiveness of our security solutions.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Trusted Partnership',
      description: 'We work as an extension of your team, providing personalized service and strategic guidance.'
    }
  ]

  const stats = [
    { number: '500+', label: 'Organizations Protected' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '< 15min', label: 'Average Response Time' },
    { number: '24/7', label: 'Monitoring & Support' }
  ]

  return (
    <section className="py-20 px-6 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        {/* Why Choose Us */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">BTM Security</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We combine cutting-edge technology with human expertise to deliver comprehensive 
            cybersecurity solutions that protect what matters most to your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${reason.icon} text-blue-400 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-gray-300 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Strengthen Your Security?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our security experts today to discuss your specific needs and learn how 
            we can help protect your organization from cyber threats.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Get Free Consultation
            </a>
            <a 
              href="/pricing"
              className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              View Pricing
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection