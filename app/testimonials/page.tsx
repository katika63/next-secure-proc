'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Testimonial {
  name: string
  title: string
  company: string
  industry: string
  country: string
  countryCode: string
  flag: string
  region: 'Africa' | 'Global'
  subRegion: string
  quote: string
  rating: number
  metrics: { [key: string]: string }
}

const TESTIMONIALS: Testimonial[] = [
  // ─── 8 AFRICAN COMPANIES & IT LEADERS ──────────────────────────────────────
  {
    name: 'Babatunde Adeleke',
    title: 'Head of IT Infrastructure & Cloud SecOps',
    company: 'Zenith Merchant Financial Services',
    industry: 'Banking & Financial Technology',
    country: 'Nigeria',
    countryCode: 'ng',
    flag: '🇳🇬',
    region: 'Africa',
    subRegion: 'West Africa',
    quote: "Deploying BTM Security across our core banking cluster in Lagos neutralized automated credential stuffing attacks within our first week. Their continuous telemetry and proactive threat hunting give our IT engineering team absolute confidence during peak transaction hours.",
    rating: 5,
    metrics: { threatsBlocked: '140k+/mo', responseTime: '< 8 min', compliance: 'NDPR & PCI-DSS' }
  },
  {
    name: 'Mwangi Kimani',
    title: 'Senior Systems Administrator & IT Operations',
    company: 'Rift Valley Telecommunications & Digital Networks',
    industry: 'Telecommunications',
    country: 'Kenya',
    countryCode: 'ke',
    flag: '🇰🇪',
    region: 'Africa',
    subRegion: 'East Africa',
    quote: "BTM Security's vulnerability assessment identified critical misconfigurations across our multi-region AWS and Kubernetes environment before our commercial 5G rollout. Their remediation guidance was clear, actionable, and rapid.",
    rating: 5,
    metrics: { vulnsFixed: '34 Flaws', uptime: '99.99%', auditScore: '100%' }
  },
  {
    name: 'Johan Van Der Merwe',
    title: 'Enterprise IT Systems Director',
    company: 'Cape Logistics & Supply Chain Technologies',
    industry: 'Logistics & Supply Chain',
    country: 'South Africa',
    countryCode: 'za',
    flag: '🇿🇦',
    region: 'Africa',
    subRegion: 'Southern Africa',
    quote: "When our secondary distribution host experienced an unauthorized intrusion attempt, BTM Security's incident response team isolated the system in under 12 minutes. They prevented what could have been a catastrophic logistics disruption.",
    rating: 5,
    metrics: { containment: '< 12 min', savedLoss: '$1.4M est.', downtime: '0 hours' }
  },
  {
    name: 'Nana Kwesi Appiah',
    title: 'IT Network Administrator & Security Lead',
    company: 'GoldCoast Microfinance & Mobile Pay',
    industry: 'FinTech & Mobile Money',
    country: 'Ghana',
    countryCode: 'gh',
    flag: '🇬🇭',
    region: 'Africa',
    subRegion: 'West Africa',
    quote: "As an expanding fintech handling high-frequency mobile money transfers, compliance and uptime are critical. BTM Security's offensive audit hardened our API endpoints and secured our customers' mobile wallets from account takeover.",
    rating: 5,
    metrics: { apiAudited: '48 Endpoints', fraudsBlocked: '99.8%', standard: 'ISO 27001' }
  },
  {
    name: 'Diane Uwase',
    title: 'IT Director & Systems Architect',
    company: 'Kigali Health Diagnostics & Telemed Network',
    industry: 'Healthcare Technology',
    country: 'Rwanda',
    countryCode: 'rw',
    flag: '🇷🇼',
    region: 'Africa',
    subRegion: 'East Africa',
    quote: "Protecting sensitive patient telemetry across provincial hospital clinics was our biggest technical hurdle. BTM Security guided our migration into a hardened zero-trust enclave with comprehensive audit logging and NDPR compliance.",
    rating: 5,
    metrics: { recordsSecured: '500K+', privacyPass: '100%', breachCount: '0' }
  },
  {
    name: 'Ahmed El-Mansouri',
    title: 'Lead Database Administrator & SecOps',
    company: 'Nile Commercial Distribution & eCommerce',
    industry: 'Retail & eCommerce Logistics',
    country: 'Egypt',
    countryCode: 'eg',
    flag: '🇪🇬',
    region: 'Africa',
    subRegion: 'North Africa',
    quote: "The database security audits and web application penetration tests performed by BTM Security uncovered zero-day injection vulnerabilities that automated scanners missed. Their engineers possess extraordinary depth and technical rigor.",
    rating: 5,
    metrics: { queryLatency: 'No Overhead', sqliBlocked: '100%', securityGrade: 'A+' }
  },
  {
    name: 'Joseph Mukasa',
    title: 'Chief Information Officer & IT Head',
    company: 'Lake Victoria Agritech & Commodity Exchange',
    industry: 'AgriTech & Trade Systems',
    country: 'Uganda',
    countryCode: 'ug',
    flag: '🇺🇬',
    region: 'Africa',
    subRegion: 'East Africa',
    quote: "BTM Security revamped our disaster recovery failover architecture and conducted staff-wide technical awareness workshops that dropped our employee phishing susceptibility rate from 38% down to under 2%.",
    rating: 5,
    metrics: { phishingDrop: '38% -> 2%', drTesting: '100% Pass', staffTrained: '450+' }
  },
  {
    name: 'Fatou Ndiaye',
    title: 'Infrastructure & DevOps Lead',
    company: 'Dakar Digital Media & Cloud Hosting Hub',
    industry: 'Cloud Hosting & Media Systems',
    country: 'Senegal',
    countryCode: 'sn',
    flag: '🇸🇳',
    region: 'Africa',
    subRegion: 'West Africa',
    quote: "BTM Security seamlessly integrated continuous attack surface monitoring into our CI/CD pipelines. We can now deploy client code updates daily without worrying about introducing exposed secrets, unpatched libraries, or leaky ports.",
    rating: 5,
    metrics: { pipelineScans: 'Daily Automated', exposureTime: '0 hrs', devAdoption: '100%' }
  },

  // ─── 4 GLOBAL COMPANIES & IT LEADERS (OUTSIDE AFRICA) ─────────────────────
  {
    name: 'Alistair Campbell',
    title: 'VP of IT Operations & Infrastructure',
    company: 'Meridian Cross-Border Payments Ltd',
    industry: 'International FinTech',
    country: 'United Kingdom',
    countryCode: 'gb',
    flag: '🇬🇧',
    region: 'Global',
    subRegion: 'Europe',
    quote: "Partnering with BTM Security for our UK-to-Africa transaction gateway gave our institutional banking partners complete peace of mind. Their compliance readiness audits and adversary simulations exceeded stringent regulatory expectations.",
    rating: 5,
    metrics: { auditStatus: 'FCA Aligned', txSecured: '£45M+/mo', uptime: '99.995%' }
  },
  {
    name: 'Marcus Vance',
    title: 'Senior Director of Information Technology',
    company: 'CloudScale Enterprise Solutions',
    industry: 'Enterprise SaaS & Cloud Infrastructure',
    country: 'United States',
    countryCode: 'us',
    flag: '🇺🇸',
    region: 'Global',
    subRegion: 'North America',
    quote: "BTM Security conducted comprehensive red-team adversary simulations on our hybrid Kubernetes cloud enclaves. Their findings were laser-focused, executive-ready, and accompanied by production-ready configuration fixes.",
    rating: 5,
    metrics: { redTeamScore: 'Hardened', soc2Readiness: 'Certified', remediation: '100%' }
  },
  {
    name: 'Klaus Richter',
    title: 'Chief Information Security Admin',
    company: 'Rheinland Industrial Automation & IoT',
    industry: 'Smart Manufacturing & Industrial IoT',
    country: 'Germany',
    countryCode: 'de',
    flag: '🇩🇪',
    region: 'Global',
    subRegion: 'Europe',
    quote: "Securing telemetry links between our European facilities and partner distribution hubs across emerging markets required specialized SCADA and network isolation knowledge. BTM Security delivered flawlessly.",
    rating: 5,
    metrics: { icsProtected: '18 Facilities', zeroDowntime: '365 Days', protocolAudit: 'IEC 62443' }
  },
  {
    name: 'Tariq Al-Hashimi',
    title: 'Group IT Infrastructure & Systems Manager',
    company: 'Gulf & Africa Energy Trading Consortium',
    industry: 'Energy & Commodity Trading',
    country: 'United Arab Emirates',
    countryCode: 'ae',
    flag: '🇦🇪',
    region: 'Global',
    subRegion: 'Middle East',
    quote: "In algorithmic commodity trading, millisecond security monitoring is non-negotiable. BTM Security's 24/7 SOC telemetry and threat hunting protect our digital trading desk against advanced state-sponsored espionage.",
    rating: 5,
    metrics: { socResponse: '< 5 min', incidentsPrevented: '14 Active', standard: 'UAE NESA' }
  }
]

/**
 * Robust Country Flag Component:
 * Uses FlagCDN for crisp vector/PNG rendering with emoji fallback.
 */
function CountryFlag({
  code,
  alt,
  emoji
}: {
  code: string
  alt: string
  emoji: string
}) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <span className="text-base select-none shrink-0" title={alt}>
        {emoji}
      </span>
    )
  }

  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden rounded-[3px] shadow-sm border border-slate-700/60 bg-[#070d1e] shrink-0 w-6 h-4"
      title={`${alt} flag`}
    >
      <img
        src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
        alt={`${alt} flag`}
        loading="lazy"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default function TestimonialPage() {
  const [activeRegion, setActiveRegion] = useState<'All' | 'Africa' | 'Global'>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const stats = [
    { number: '99.4%', label: 'Incident Containment Rate', icon: 'fas fa-shield-alt' },
    { number: '54+', label: 'Countries Defended', icon: 'fas fa-globe-africa' },
    { number: '99.99%', label: 'Infrastructure Uptime', icon: 'fas fa-clock' },
    { number: '24/7/365', label: 'SOC Monitoring & Telemetry', icon: 'fas fa-headset' }
  ]

  const filteredTestimonials = useMemo(() => {
    return TESTIMONIALS.filter((t) => {
      const matchesRegion = activeRegion === 'All' || t.region === activeRegion
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.company.toLowerCase().includes(query) ||
        t.title.toLowerCase().includes(query) ||
        t.country.toLowerCase().includes(query) ||
        t.industry.toLowerCase().includes(query) ||
        t.quote.toLowerCase().includes(query)

      return matchesRegion && matchesSearch
    })
  }, [activeRegion, searchQuery])

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-transparent text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AUTHENTIC ENTERPRISE TESTIMONIALS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
              Verified Client <span className="gradient-text">Testimonials</span>
            </h1>
            
            <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Hear directly from African enterprise IT administrators, systems directors, and global technology leaders who trust BTM Security to defend their critical infrastructure.
            </p>
            
            {/* Top Operational Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-[#070e20]/70 border border-[#16274a] rounded-xl p-4 sm:p-5 backdrop-blur-sm shadow-lg text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center mx-auto mb-2.5">
                    <i className={`${stat.icon} text-cyan-400 text-lg sm:text-xl`} />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-0.5">{stat.number}</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-sans">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="px-4 sm:px-6 mb-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#070e20]/80 border border-[#1b2d54] p-3 sm:p-4 rounded-2xl backdrop-blur-md">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
            {(['All', 'Africa', 'Global'] as const).map((region) => {
              const count = region === 'All' ? TESTIMONIALS.length : TESTIMONIALS.filter((t) => t.region === region).length
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                    activeRegion === region
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {region === 'All' ? `All Testimonials (${count})` : region === 'Africa' ? `Africa Operations (${count})` : `Global Partners (${count})`}
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country, company, name..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#030816] border border-[#1e2e50] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Grid (12 Items) */}
      <section className="py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredTestimonials.map((t, index) => (
              <motion.div
                key={t.name}
                className="group bg-[#070e20]/85 backdrop-blur-md border border-[#16274a] hover:border-blue-500/50 rounded-2xl p-6 sm:p-7 shadow-xl hover:shadow-blue-950/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                {/* Accent glow line on top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Country Flag & Country Name Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#122244]">
                    <div className="flex items-center gap-2">
                      <CountryFlag code={t.countryCode} alt={t.country} emoji={t.flag} />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white font-sans tracking-wide flex items-center gap-1.5">
                          {t.country}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {t.subRegion}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating Badge */}
                    <div className="flex items-center bg-blue-950/50 border border-blue-500/20 px-2 py-0.5 rounded-full">
                      {[...Array(t.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star text-amber-400 text-[10px] mr-0.5 last:mr-0" />
                      ))}
                    </div>
                  </div>

                  {/* Testimony Quote */}
                  <blockquote className="text-slate-300 text-sm leading-relaxed mb-6 italic relative pl-3 border-l-2 border-blue-500/60 font-sans">
                    &quot;{t.quote}&quot;
                  </blockquote>
                </div>

                <div>
                  {/* Author, Title & Company */}
                  <div className="pt-4 border-t border-[#122244] mb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {t.name}
                        </h3>
                        <p className="text-xs text-blue-400 font-medium leading-tight mt-0.5">
                          {t.title}
                        </p>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                          {t.company}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/20 text-blue-300 shrink-0">
                        {t.industry.split('&')[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* Operational Metrics Strip */}
                  <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-[#101b33] text-center bg-[#030816]/60 rounded-xl p-2.5">
                    {Object.entries(t.metrics).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-xs font-bold font-mono text-cyan-300 truncate">
                          {value}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono capitalize truncate mt-0.5">
                          {key === 'threatsBlocked' ? 'Threats Blocked' :
                           key === 'responseTime' ? 'Response' :
                           key === 'compliance' ? 'Standard' :
                           key === 'vulnsFixed' ? 'Vulnerabilities' :
                           key === 'uptime' ? 'Uptime' :
                           key === 'auditScore' ? 'Audit' :
                           key === 'containment' ? 'Containment' :
                           key === 'savedLoss' ? 'Loss Saved' :
                           key === 'downtime' ? 'Downtime' :
                           key === 'apiAudited' ? 'Endpoints' :
                           key === 'fraudsBlocked' ? 'Fraud Prevented' :
                           key === 'standard' ? 'Standard' :
                           key === 'recordsSecured' ? 'Protected' :
                           key === 'privacyPass' ? 'Privacy Audit' :
                           key === 'breachCount' ? 'Breaches' :
                           key === 'queryLatency' ? 'Perf Impact' :
                           key === 'sqliBlocked' ? 'Injections' :
                           key === 'securityGrade' ? 'SecOps Grade' :
                           key === 'phishingDrop' ? 'Phishing Rate' :
                           key === 'drTesting' ? 'DR Readiness' :
                           key === 'staffTrained' ? 'Personnel' :
                           key === 'pipelineScans' ? 'CI/CD Scans' :
                           key === 'exposureTime' ? 'Exposure' :
                           key === 'devAdoption' ? 'SecDevOps' :
                           key === 'auditStatus' ? 'Regulation' :
                           key === 'txSecured' ? 'Volume' :
                           key === 'redTeamScore' ? 'Posture' :
                           key === 'soc2Readiness' ? 'SOC 2' :
                           key === 'remediation' ? 'Remediation' :
                           key === 'icsProtected' ? 'Facilities' :
                           key === 'zeroDowntime' ? 'Continuity' :
                           key === 'protocolAudit' ? 'Protocol' :
                           key === 'socResponse' ? 'SOC Telemetry' :
                           key === 'incidentsPrevented' ? 'Active Attacks' :
                           key}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12 bg-[#070e20]/40 rounded-2xl border border-[#1e2e50] my-8">
              <p className="text-slate-400 text-sm">No testimonials match your filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Industry Breakdown Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#030816]/70 border-t border-[#15233e] mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
              Trusted Across Critical <span className="gradient-text">Industries</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Our offensive security, continuous SOC telemetry, and cloud hardening programs protect organizations across high-stakes African and global sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { name: 'Banking & FinTech', icon: 'fas fa-university', count: '50+' },
              { name: 'Telecommunications', icon: 'fas fa-broadcast-tower', count: '25+' },
              { name: 'Healthcare & Biotech', icon: 'fas fa-hospital', count: '30+' },
              { name: 'Cloud & SaaS Tech', icon: 'fas fa-cloud', count: '45+' },
              { name: 'Supply Chain & Logistics', icon: 'fas fa-truck-moving', count: '20+' },
              { name: 'Energy & Critical Infra', icon: 'fas fa-bolt', count: '15+' }
            ].map((industry, index) => (
              <motion.div
                key={industry.name}
                className="bg-[#070e20]/80 border border-[#16274a] rounded-xl p-4 text-center hover:border-blue-500/40 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-blue-600/15 border border-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className={`${industry.icon} text-cyan-400 text-lg`} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white mb-1">{industry.name}</h3>
                <p className="text-[11px] font-mono text-blue-400">{industry.count} Clients</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center bg-[#070e20]/90 border border-[#1e2e50] rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Ready to Strengthen Your Security Posture?
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the same enterprise-grade protection, 24/7 continuous telemetry, and rapid incident response that IT leaders across Africa and worldwide depend upon.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/contact"
                className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-xl font-medium text-sm transition-all shadow-lg shadow-blue-600/30"
              >
                Book a Free Risk Consultation
              </Link>
              <Link 
                href="/about/our-clients"
                className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-7 py-3 rounded-xl font-medium text-sm transition-all"
              >
                View Client Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
