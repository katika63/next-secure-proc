'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ClientLogoStrip from '@/app/components/sections/ClientLogoStrip'

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
      description: 'Securing patient data and medical systems while ensuring HIPAA and data privacy compliance.',
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

  const caseStudies = [
    {
      id: 'CS-01',
      title: 'Tier-1 Pan-African Payments Gateway',
      client: 'Regional FinTech & Payments Processing Gateway',
      scope: 'Full-Scope Web App & API Pentest, AWS & Kubernetes Cloud Security Audit, Remediation Validation',
      result: '14 Critical & High vulnerabilities resolved prior to regional launch; 0 production security incidents across 12M+ monthly transactions.',
      tag: 'FINTECH',
      badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-950/40',
      metrics: [
        { label: 'Flaws Remediated', val: '14' },
        { label: 'Uptime Maintained', val: '99.99%' },
        { label: 'Breaches Post-Launch', val: '0' }
      ]
    },
    {
      id: 'CS-02',
      title: 'Regional Healthcare & Diagnostics Network',
      client: 'Multisite Hospital Network & Patient Telehealth Platform',
      scope: 'Electronic Health Record (EHR) Portal Pentest, HIPAA / NDPR Data Privacy Audit, External Surface Monitoring',
      result: 'Attained full regulatory compliance; secured 350,000+ sensitive patient records with zero data leaks over 3 consecutive years.',
      tag: 'HEALTHCARE',
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
      metrics: [
        { label: 'Records Protected', val: '350K+' },
        { label: 'Compliance Pass', val: '100%' },
        { label: 'Security Audits', val: 'Annual Clean' }
      ]
    },
    {
      id: 'CS-03',
      title: 'Commercial Banking & Wealth Management',
      client: 'Tier-2 Commercial Bank & Cross-Border Remittance Provider',
      scope: 'Adversary Simulation, Red Team Exercises, Continuous Vulnerability Scanning & Ransomware Defense Drill',
      result: 'Neutralized simulated advanced persistent threat in under 15 minutes; prevented estimated $2M in ransomware and business interruption losses.',
      tag: 'BANKING',
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
      metrics: [
        { label: 'Containment Speed', val: '< 15m' },
        { label: 'Estimated Loss Saved', val: '$2M+' },
        { label: 'Staff Trained', val: '1,200+' }
      ]
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-transparent text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
                ENTERPRISE CLIENT ENGAGEMENTS
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Trusted Clients</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              We partner with organizations across Africa and worldwide to deliver exceptional cybersecurity 
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

      {/* Client Logo Strip (10 Logos) */}
      <ClientLogoStrip 
        title="TRUSTED BY AFRICAN ENTERPRISES & GLOBAL TECHNOLOGY LEADERS"
        subtitle="Empowering secure operations across leading African fintechs, banks, and enterprise organizations"
      />

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
                  <p className="text-gray-300 italic">&quot;{category.testimonial}&quot;</p>
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

      {/* Success Stories: Structured (Client, Scope, Result) */}
      <section id="case-studies" className="py-20 px-6 bg-[#030816]/70 border-t border-[#1e2942]/70">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
                VERIFIED OUTCOMES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Client <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Real results with verified Client, Scope, and Result breakdowns from organizations secured by BTM Security.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                className="bg-[#070e1e]/90 backdrop-blur-md border border-[#1e2942] hover:border-blue-500/60 rounded-2xl p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${study.badgeColor}`}>
                      {study.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      {study.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-5 leading-snug">
                    {study.title}
                  </h3>

                  {/* Client, Scope, Result Stack */}
                  <div className="space-y-4 text-xs">
                    <div className="bg-[#030712]/60 p-3.5 rounded-lg border border-[#15233e]">
                      <div className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                        Client
                      </div>
                      <p className="text-slate-200 font-medium">
                        {study.client}
                      </p>
                    </div>

                    <div className="bg-[#030712]/60 p-3.5 rounded-lg border border-[#15233e]">
                      <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                        Scope
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {study.scope}
                      </p>
                    </div>

                    <div className="bg-[#030712]/60 p-3.5 rounded-lg border border-[#15233e]">
                      <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        Result
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {study.result}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrics Footer */}
                <div className="mt-6 pt-5 border-t border-[#1e2942] grid grid-cols-3 gap-2 text-center">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-base font-extrabold text-blue-400 font-mono">{m.val}</div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">{m.label}</div>
                    </div>
                  ))}
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
              <Link 
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-600/30"
              >
                Book a 15-Minute Scoping Call
              </Link>
              <Link 
                href="/services"
                className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}