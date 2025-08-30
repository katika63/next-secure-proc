'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

const blogPosts = [
  {
    slug: 'ai-cyberattacks',
    title: 'AI-Powered Cyber Attacks: The New Frontier of Digital Threats',
    excerpt: 'Exploring how artificial intelligence is being weaponized by cybercriminals and how organizations can defend against these sophisticated attacks.',
    image: '/img/ai-cyber-attacks.jpg',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'AI Security'
  },
  {
    slug: 'data-breach',
    title: 'Data Breach Response: A Comprehensive Guide for Organizations',
    excerpt: 'Learn the essential steps to take when a data breach occurs and how to minimize damage to your organization.',
    image: '/img/data-sec.jpg',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Incident Response'
  },
  {
    slug: 'human-factor',
    title: 'The Human Factor in Cybersecurity: Building a Security-Aware Culture',
    excerpt: 'Understanding why humans remain the weakest link in cybersecurity and strategies to strengthen your human firewall.',
    image: '/img/human-factor.jpg',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Security Training'
  },
  {
    slug: 'major-cyber-attacks',
    title: 'Major Cyber Attacks of 2024: Lessons Learned and Prevention Strategies',
    excerpt: 'Analyzing the biggest cyber attacks of the year and what organizations can learn from them.',
    image: '/img/cyber-threats.jpg',
    date: '2023-12-28',
    readTime: '15 min read',
    category: 'Threat Analysis'
  },
  {
    slug: 'multi-cloudenv',
    title: 'Securing Multi-Cloud Environments: Best Practices and Challenges',
    excerpt: 'Navigate the complexities of multi-cloud security with expert insights and practical recommendations.',
    image: '/img/cloud-security.jpg',
    date: '2023-12-20',
    readTime: '11 min read',
    category: 'Cloud Security'
  },
  {
    slug: 'qr-codes',
    title: 'QR Code Security Risks: What You Need to Know',
    excerpt: 'Understanding the security implications of QR codes and how to use them safely in your organization.',
    image: '/img/qr-code.jpg',
    date: '2023-12-15',
    readTime: '6 min read',
    category: 'Security Awareness'
  },
  {
    slug: 'ransomware-tactics',
    title: 'Evolving Ransomware Tactics: How Attackers Are Adapting',
    excerpt: 'Stay ahead of ransomware threats by understanding the latest tactics used by cybercriminals.',
    image: '/img/ransomware.jpg',
    date: '2023-12-10',
    readTime: '9 min read',
    category: 'Ransomware'
  },
  {
    slug: 'sap-security',
    title: 'SAP Security: Protecting Your Enterprise Resource Planning Systems',
    excerpt: 'Essential security measures for SAP environments and common vulnerabilities to watch out for.',
    image: '/img/network-security.jpg',
    date: '2023-12-05',
    readTime: '13 min read',
    category: 'Enterprise Security'
  },
  {
    slug: 'uk-cyber-attack',
    title: 'UK Cyber Attack Analysis: Impact and Response Strategies',
    excerpt: 'Detailed analysis of recent cyber attacks in the UK and their implications for global cybersecurity.',
    image: '/img/network-attack.jpg',
    date: '2023-11-30',
    readTime: '7 min read',
    category: 'Threat Intelligence'
  }
]

export default function BlogPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      // Send email using mailto link (client-side only)
      const subject = 'Newsletter Subscription Request'
      const body = `Please subscribe the following email address to the BTM Security newsletter:\n\nEmail: ${email}\n\nSubscription Details:\n- Cybersecurity insights and trends\n- Threat intelligence updates\n- Security best practices\n- Industry news and analysis\n\nThank you for your interest in BTM Security!\n\n--\nThis subscription request was sent from the BTM Security blog.`
      
      window.location.href = `mailto:admin@btmsec.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      
      // Show success message
      setMessage('✅ Thank you for your interest in our cybersecurity newsletter! Please check your email to complete the subscription process.')
      setEmail('')
      
    } catch (error) {
      setMessage('❌ There was an error processing your subscription. Please try again or contact admin@btmsec.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              Cybersecurity <span className="gradient-text">Insights</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Stay informed with the latest cybersecurity trends, threat analysis, and expert insights 
              from our security professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 text-white hover:text-blue-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Read More 
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with <span className="gradient-text">Security Insights</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              Subscribe to our newsletter for the latest cybersecurity trends, threat intelligence, 
              and expert analysis delivered to your inbox.
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap"
                >
                  {isSubmitting ? 'Processing...' : 'Subscribe to Newsletter'}
                </button>
              </div>
              
              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.includes('✅') 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  {message}
                </div>
              )}
              
              <p className="text-xs text-gray-400">
                By subscribing, you agree to receive our cybersecurity newsletter. You can unsubscribe at any time. 
                We respect your privacy and will never share your information with third parties.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}