'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function OurTeamPage() {
  const leadership = [
    {
      name: 'Dr. Lillian Monroe',
      role: 'Chief Executive Officer',
      image: '/img/75.jpg',
      bio: 'Dr. Monroe brings over 20 years of cybersecurity leadership experience, having previously served as CISO at Fortune 500 companies.',
      specialties: ['Strategic Leadership', 'Risk Management', 'Compliance']
    },
    {
      name: 'James Rodriguez',
      role: 'Chief Technology Officer',
      image: '/img/46.jpg',
      bio: 'James leads our technical innovation with expertise in AI-powered security solutions and advanced threat detection systems.',
      specialties: ['AI Security', 'Threat Detection', 'Architecture']
    },
    {
      name: 'Lillian Britney',
      role: 'Chief Security Officer',
      image: '/img/14.jpg',
      bio: 'Lillian oversees our security operations and incident response capabilities, ensuring 24/7 protection for our clients.',
      specialties: ['Incident Response', 'Security Operations', 'Forensics']
    }
  ]

  const team = [
    {
      name: 'Mei Tanaka',
      role: 'Senior Security Analyst',
      image: '/img/92.jpg',
      specialties: ['Threat Intelligence', 'Malware Analysis']
    },
    {
      name: 'Ethan Carter',
      role: 'Penetration Testing Lead',
      image: '/img/51.jpg',
      specialties: ['Penetration Testing', 'Vulnerability Assessment']
    },
    {
      name: 'Sarah Johnson',
      role: 'Security Consultant',
      image: '/img/sarah-john.jpg',
      specialties: ['Compliance', 'Risk Assessment']
    },
    {
      name: 'Amir Hassan',
      role: 'Cloud Security Specialist',
      image: '/img/amir.jpg',
      specialties: ['Cloud Security', 'DevSecOps']
    },
    {
      name: 'Elena Rodriguez',
      role: 'Incident Response Specialist',
      image: '/img/elena.jpg',
      specialties: ['Digital Forensics', 'Incident Response']
    },
    {
      name: 'Jinwoo Kim',
      role: 'Security Researcher',
      image: '/img/Jinwoo.jpg',
      specialties: ['Threat Research', 'Zero-day Analysis']
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
              Meet Our <span className="gradient-text">Expert Team</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Our cybersecurity professionals bring decades of combined experience in protecting 
              organizations from the most sophisticated cyber threats.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <i className="fas fa-certificate text-blue-400"></i>
                <span>Industry Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-award text-blue-400"></i>
                <span>Award Winning</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-users text-blue-400"></i>
                <span>Collaborative</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Leadership <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our experienced leadership team guides BTM Security&apos;s mission to provide 
              world-class cybersecurity solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 text-center hover:border-gray-600 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{leader.name}</h3>
                <p className="text-blue-400 font-medium mb-4">{leader.role}</p>
                <p className="text-gray-300 mb-6 leading-relaxed">{leader.bio}</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {leader.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Security <span className="gradient-text">Experts</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our dedicated team of security professionals work around the clock to protect 
              your organization from cyber threats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-6 text-center hover:border-gray-600 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {member.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Want to Join Our Team?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              We&apos;re always looking for talented cybersecurity professionals who share our passion 
              for protecting organizations from cyber threats.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href="/careers"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
              >
                View Open Positions
              </a>
              <a 
                href="/contact"
                className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}