'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const ServicesSection = () => {
  const services = [
    {
      icon: 'fas fa-shield-virus',
      title: 'Threat Detection',
      description: 'Advanced monitoring and detection systems to identify threats before they impact your operations.',
      href: '/services/threat-detection'
    },
    {
      icon: 'fas fa-lock',
      title: 'Vulnerability Management',
      description: 'Proactive identification and remediation of security vulnerabilities across your infrastructure.',
      href: '/services/vulnerability-management'
    },
    {
      icon: 'fas fa-user-shield',
      title: 'Incident Response',
      description: '24/7 rapid response team to contain and eradicate threats when they occur.',
      href: '/services/incident-response'
    },
    {
      icon: 'fas fa-network-wired',
      title: 'Network Security',
      description: 'Comprehensive protection for your network infrastructure against intrusions and attacks.',
      href: '/services/network-security'
    },
    {
      icon: 'fas fa-cloud',
      title: 'Cloud Security',
      description: 'Specialized security solutions for cloud environments and hybrid infrastructures.',
      href: '/services/cloud-security'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Security Training',
      description: 'Employee awareness programs and technical training to strengthen your human firewall.',
      href: '/services/security-training'
    }
  ]

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Security Services</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive security solutions tailored to your organization's unique needs and threat landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl p-8 transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="w-14 h-14 bg-blue-900 bg-opacity-50 rounded-lg flex items-center justify-center mb-6">
                <i className={`${service.icon} text-blue-400 text-2xl`}></i>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              
              <p className="text-gray-300 mb-4">
                {service.description}
              </p>
              
              <Link 
                href={service.href}
                className="text-blue-400 hover:text-blue-300 flex items-center transition-colors duration-200"
              >
                Learn more <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection