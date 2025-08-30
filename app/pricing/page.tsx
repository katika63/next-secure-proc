'use client'

import { motion } from 'framer-motion'
import Link from 'next/link' 

export default function PricingPage() {
  const plans = [
    {
      name: 'Essential',
      price: '$2,500',
      period: '/month',
      description: 'Perfect for small to medium businesses looking for comprehensive security coverage.',
      features: [
        '24/7 Network Monitoring',
        'Threat Detection & Response',
        'Vulnerability Scanning',
        'Email Security',
        'Basic Incident Response',
        'Monthly Security Reports',
        'Phone & Email Support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$5,000',
      period: '/month',
      description: 'Advanced security solutions for growing organizations with complex infrastructure.',
      features: [
        'Everything in Essential',
        'Advanced Threat Intelligence',
        'Penetration Testing (Quarterly)',
        'Security Awareness Training',
        'Compliance Management',
        'Dedicated Security Analyst',
        'Priority Support',
        'Custom Security Policies'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored security solutions for large enterprises with specific requirements.',
      features: [
        'Everything in Professional',
        'Custom Security Architecture',
        'On-site Security Assessments',
        'Dedicated Security Team',
        'Advanced Forensics',
        'Regulatory Compliance Support',
        '24/7 Emergency Response',
        'Executive Security Briefings'
      ],
      popular: false
    }
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
              Security <span className="gradient-text">Pricing</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transparent pricing for comprehensive cybersecurity solutions. 
              Choose the plan that best fits your organization's needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-blue-400"></i>
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-blue-400"></i>
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-blue-400"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative bg-gray-800/60 backdrop-blur-md border rounded-2xl p-8 ${
                  plan.popular 
                    ? 'border-blue-500 ring-2 ring-blue-500/20' 
                    : 'border-gray-700 hover:border-gray-600'
                } transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                      
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <i className="fas fa-check text-blue-400 mt-1 flex-shrink-0"></i>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.price === 'Custom' ? (
                  <Link href="/contact">
                    <button
                      className="w-full py-3 rounded-lg font-medium transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Contact Sales
                    </button>
                  </Link>
                ) : (
                  <Link href="/contact">
                    <button
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
                      }`}
                    >
                      Contact Sales
                    </button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'What is included in the setup process?',
                answer: 'Our team handles the complete setup including security assessment, sensor deployment, configuration, and initial monitoring setup. There are no additional setup fees.'
              },
              {
                question: 'Can I upgrade or downgrade my plan?',
                answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.'
              },
              {
                question: 'Do you offer custom solutions?',
                answer: 'Absolutely. Our Enterprise plan includes fully customized security solutions tailored to your specific requirements and compliance needs.'
              },
              {
                question: 'What kind of support do you provide?',
                answer: 'All plans include 24/7 monitoring and support. Professional and Enterprise plans include priority support with dedicated security analysts.'
              },
              {
                question: 'Is there a contract commitment?',
                answer: 'We offer flexible terms with no long-term contracts required. You can cancel your service at any time with 30 days notice.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Need a Custom Solution?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              Contact our security experts to discuss your specific requirements and get a personalized quote.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
                  Contact Sales
                </button>
              </Link>
              <Link href="/services">
                <button className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
                  View Services
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}