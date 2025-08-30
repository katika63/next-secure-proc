'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function OurClientsPage() {
  const clientCategories = [
    {
      title: 'Financial Services',
      icon: 'fas fa-university',
      description: 'Protecting banks, credit unions, and financial institutions from sophisticated cyber attacks.',
      clients: ['Major Banking Institution', 'Regional Credit Union', 'Investment Firm', 'Insurance Company'],
      testimonial: "BTM Security's advanced threat detection helped us prevent a sophisticated attack that could have cost millions in damages and regulatory fines.",
      stats: { protected: '50+', incidents: '200+', uptime: '99.9%' }
    },
    {
      title: 'Healthcare',
      icon: 'fas fa-heartbeat',
      description: 'Securing patient data and medical systems while ensuring HIPAA compliance.',
      clients: ['Regional Hospital Network', 'Medical Research Center', 'Healthcare Provider', 'Pharmaceutical Company'],
      testimonial: "Their incident response team was instrumental in containing a ransomware attack within hours, protecting thousands of patient records.",
      stats: { protected: '30+', incidents: '150+', uptime: '99.8%' }
    },
    {
      title: 'Manufacturing',
      icon: 'fas fa-industry',
      description: 'Protecting industrial control systems and manufacturing operations from cyber threats.',
      clients: ['Automotive Manufacturer', 'Energy Corporation', 'Chemical Plant', 'Steel Producer'],
      testimonial: "The vulnerability management program identified critical weaknesses in our industrial control systems before they could be exploited.",
      stats: { protected: '25+', incidents: '100+', uptime: '99.7%' }
    },
    {
      title: 'Technology',
      icon: 'fas fa-microchip',
      description: 'Securing software companies, startups, and technology infrastructure providers.',
      clients: ['Software Development Company', 'Cloud Service Provider', 'Tech Startup', 'IT Services Firm'],
      testimonial: "BTM Security's expertise in cloud security helped us achieve SOC 2 compliance and build customer trust.",
      stats: { protected: '40+', incidents: '180+', uptime: '99.9%' }
    },
    {
      title: 'Education',
      icon: 'fas fa-graduation-cap',
      description: 'Protecting educational institutions and research data from cyber threats.',
      clients: ['Research University', 'Community College', 'K-12 School District', 'Online Learning Platform'],
      testimonial: "Their security training programs significantly improved our staff's security awareness and response capabilities.",
      stats: { protected: '20+', incidents: '80+', uptime: '99.6%' }
    },
    {
      title: 'Government',
      icon: 'fas fa-landmark',
      description: 'Providing cybersecurity solutions for government agencies and public sector organizations.',
      clients: ['City Government', 'State Agency', 'Federal Contractor', 'Public Utility'],
      testimonial: "BTM Security helped us meet strict compliance requirements while maintaining operational efficiency.",
      stats: { protected: '15+', incidents: '60+', uptime: '99.8%' }
    }
  ]

  const overallStats = [
    { number: '500+', label: 'Organizations Protected', icon: 'fas fa-shield-alt' },
    { number: '1M+', label: 'Threats Blocked', icon: 'fas fa-ban' },
    { number: '99.9%', label: 'Average Uptime', icon: 'fas fa-clock' },
    { number: '24/7', label: 'Monitoring & Support', icon: 'fas fa-headset' }
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
              Our <span className="gradient-text">Trusted Clients</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              We partner with organizations across industries to deliver exceptional cybersecurity 
              outcomes and protect what matters most to their business.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {overallStats.map((stat, index) => (
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

      {/* Client Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industries We <span className="gradient-text">Protect</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our cybersecurity expertise spans across multiple industries, each with unique 
              security challenges and compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {clientCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 hover:border-gray-600 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${category.icon} text-blue-400 text-2xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-300">{category.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Representative Clients
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.clients.map((client, idx) => (
                      <div key={idx} className="text-sm text-gray-300">
                        • {client}
                      </div>
                    ))}
                  </div>
                </div>

                <blockquote className="border-l-4 border-blue-500 pl-4 mb-6">
                  <p className="text-gray-300 italic">"{category.testimonial}"</p>
                </blockquote>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-400">{category.stats.protected}</div>
                    <div className="text-xs text-gray-400">Protected</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-400">{category.stats.incidents}</div>
                    <div className="text-xs text-gray-400">Incidents Handled</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-400">{category.stats.uptime}</div>
                    <div className="text-xs text-gray-400">Uptime</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Real results from real clients who trust BTM Security to protect their organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Prevented $2M Loss',
                description: 'Detected and stopped a sophisticated ransomware attack targeting a financial institution.',
                metric: '< 15 minutes',
                metricLabel: 'Response Time'
              },
              {
                title: 'Zero Data Breaches',
                description: 'Maintained perfect security record for healthcare client over 3 years of service.',
                metric: '100%',
                metricLabel: 'Success Rate'
              },
              {
                title: 'Compliance Achieved',
                description: 'Helped manufacturing client achieve SOC 2 Type II certification in record time.',
                metric: '6 months',
                metricLabel: 'Implementation'
              }
            ].map((story, index) => (
              <motion.div
                key={story.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                  <p className="text-gray-300 mb-4">{story.description}</p>
                  <div className="text-3xl font-bold text-blue-400 mb-1">{story.metric}</div>
                  <div className="text-sm text-gray-400">{story.metricLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
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
              Partner with BTM Security and join hundreds of organizations that trust us 
              to protect their digital assets and ensure business continuity.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Become a Client
              </a>
              <a 
                href="/services"
                className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
              >
                View Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}