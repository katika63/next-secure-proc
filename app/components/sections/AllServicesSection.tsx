'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const AllServicesSection = () => {
  const services = [
    {
      icon: 'fas fa-shield-virus',
      title: 'Threat Detection & Response',
      description: 'Advanced AI-powered monitoring systems that identify and respond to threats in real-time, protecting your infrastructure 24/7.',
      features: ['Real-time monitoring', 'AI-powered detection', 'Automated response', 'Threat intelligence'],
      href: '/services/threat-detection',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'fas fa-bug',
      title: 'Vulnerability Management',
      description: 'Comprehensive vulnerability assessment and management services to identify and remediate security weaknesses.',
      features: ['Vulnerability scanning', 'Risk assessment', 'Patch management', 'Compliance reporting'],
      href: '/services/vulnerability-management',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'fas fa-ambulance',
      title: 'Incident Response',
      description: 'Rapid incident response services to contain, investigate, and recover from security breaches and cyber attacks.',
      features: ['24/7 emergency response', 'Forensic analysis', 'Recovery planning', 'Post-incident review'],
      href: '/services/incident-response',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: 'fas fa-network-wired',
      title: 'Network Security',
      description: 'Comprehensive network protection including firewalls, intrusion detection, and secure network architecture.',
      features: ['Firewall management', 'Network monitoring', 'Access control', 'Secure architecture'],
      href: '/services/network-security',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: 'fas fa-cloud-upload-alt',
      title: 'Cloud Security',
      description: 'Specialized security solutions for cloud environments, ensuring your cloud infrastructure remains secure.',
      features: ['Cloud assessment', 'Configuration management', 'Identity & access', 'Compliance monitoring'],
      href: '/services/cloud-security',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Security Training',
      description: 'Comprehensive security awareness training programs to educate your team and strengthen your human firewall.',
      features: ['Awareness training', 'Phishing simulation', 'Policy development', 'Compliance training'],
      href: '/services/security-training',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete <span className="gradient-text">Security Solutions</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From threat detection to incident response, we provide end-to-end cybersecurity services 
            tailored to your organization&apos;s specific needs and risk profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${service.icon} text-white text-2xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <i className="fas fa-check text-blue-400 text-sm"></i>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link 
                  href={service.href}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Learn More 
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-200"></i>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllServicesSection