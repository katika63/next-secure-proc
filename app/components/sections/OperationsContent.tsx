'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface CountryOperation {
  name: string
  code: string
  flag: string
  region: string
}

interface OtherRegion {
  name: string
  code: string
  flag: string
  coverage: string
}

// 1. Primary Operations
const PRIMARY_OPERATIONS: CountryOperation[] = [
  { name: 'Nigeria', code: 'ng', flag: '🇳🇬', region: 'West Africa' },
  { name: 'Kenya', code: 'ke', flag: '🇰🇪', region: 'East Africa' },
  { name: 'Ghana', code: 'gh', flag: '🇬🇭', region: 'West Africa' },
  { name: 'South Africa', code: 'za', flag: '🇿🇦', region: 'Southern Africa' }
]

// 2. Priority Expansion
const PRIORITY_EXPANSION: CountryOperation[] = [
  { name: 'Ethiopia', code: 'et', flag: '🇪🇹', region: 'Horn of Africa / East Africa' },
  { name: 'Rwanda', code: 'rw', flag: '🇷🇼', region: 'East Africa' },
  { name: 'Tanzania', code: 'tz', flag: '🇹🇿', region: 'East Africa' },
  { name: 'Uganda', code: 'ug', flag: '🇺🇬', region: 'East Africa' },
  { name: 'Senegal', code: 'sn', flag: '🇸🇳', region: 'West Africa' },
  { name: 'Ivory Coast', code: 'ci', flag: '🇨🇮', region: 'West Africa' },
  { name: 'DRC', code: 'cd', flag: '🇨🇩', region: 'Central Africa' },
  { name: 'Cameroon', code: 'cm', flag: '🇨🇲', region: 'Central Africa' },
  { name: 'Togo', code: 'tg', flag: '🇹🇬', region: 'West Africa' },
  { name: 'Benin', code: 'bj', flag: '🇧🇯', region: 'West Africa' }
]

// 3. Strategic Expansion
const STRATEGIC_EXPANSION: CountryOperation[] = [
  { name: 'Morocco', code: 'ma', flag: '🇲🇦', region: 'North Africa' },
  { name: 'Egypt', code: 'eg', flag: '🇪🇬', region: 'North Africa' },
  { name: 'Angola', code: 'ao', flag: '🇦🇴', region: 'Southern Africa' },
  { name: 'Mozambique', code: 'mz', flag: '🇲🇿', region: 'Southern Africa' },
  { name: 'Zambia', code: 'zm', flag: '🇿🇲', region: 'Southern Africa' },
  { name: 'Zimbabwe', code: 'zw', flag: '🇿🇼', region: 'Southern Africa' }
]

// 4. Other Regions (Remote International Clients)
const OTHER_REGIONS: OtherRegion[] = [
  { name: 'Europe', code: 'eu', flag: '🇪🇺', coverage: 'Remote clients across UK, EU & EEA' },
  { name: 'North America', code: 'us', flag: '🇺🇸', coverage: 'Remote clients across USA & Canada' },
  { name: 'Middle East', code: 'ae', flag: '🇦🇪', coverage: 'Remote clients across GCC & Middle East' },
  { name: 'Asia', code: 'sg', flag: '🇸🇬', coverage: 'Remote clients across Asia-Pacific' }
]

// Mandatory Standard Service Tags
const STANDARD_SERVICES = [
  'Web application penetration testing',
  'API security testing',
  'Vulnerability management',
  'Continuous monitoring',
  'Incident response support',
  'Compliance advisory'
]

// Mandatory Disclaimer
const DISCLAIMER_TEXT =
  'BTM Security is a Nigeria-based cybersecurity company serving African enterprises and remote clients worldwide, with priority coverage across fintech, banking, telecom, SaaS, e-commerce, and public-sector environments. The countries shown represent regions where we deliver remote security services.'

// Grounded, Truthful Sector Pillars (No unsupported or over-promised claims)
const SECTOR_PILLARS = [
  {
    title: 'Fintech & Digital Payments',
    icon: 'fa-mobile-alt',
    color: 'from-blue-600 to-cyan-500',
    description: 'Remote penetration testing, API vulnerability assessments, and threat monitoring for payment gateways, digital wallets, and web platforms.'
  },
  {
    title: 'Banking & Financial Institutions',
    icon: 'fa-landmark',
    color: 'from-emerald-500 to-teal-400',
    description: 'Security testing for customer web portals, digital banking interfaces, and internal APIs, combined with continuous vulnerability management.'
  },
  {
    title: 'Telecommunications',
    icon: 'fa-tower-broadcast',
    color: 'from-blue-600 to-cyan-600',
    description: 'Perimeter penetration testing, external attack surface evaluation, and cloud security reviews for telecom digital platforms.'
  },
  {
    title: 'SaaS & Enterprise Cloud',
    icon: 'fa-cloud',
    color: 'from-cyan-500 to-blue-600',
    description: 'API security assessments, cloud configuration reviews, and continuous vulnerability tracking for high-growth software scale-ups.'
  },
  {
    title: 'E-Commerce & Digital Commerce',
    icon: 'fa-cart-shopping',
    color: 'from-teal-500 to-cyan-400',
    description: 'Web application security testing, checkout integration vulnerability verification, and threat monitoring for digital retail platforms.'
  },
  {
    title: 'Public-Sector & Digital Services',
    icon: 'fa-building-columns',
    color: 'from-blue-700 to-sky-500',
    description: 'Remote vulnerability testing, secure configuration auditing, and compliance guidance for public digital service portals.'
  }
]

/**
 * Universal CountryFlag Component:
 * Solves Windows emoji rendering limitations (flags showing as letters) by loading
 * crisp FlagCDN vector/PNG flags, while gracefully falling back to native emoji.
 */
function CountryFlag({
  code,
  alt,
  emoji,
  size = 'md'
}: {
  code: string
  alt: string
  emoji: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const [imgError, setImgError] = useState(false)

  const sizeClasses = {
    sm: 'w-7 h-5',
    md: 'w-10 h-7',
    lg: 'w-12 h-8'
  }

  if (imgError) {
    return (
      <span
        title={alt}
        className="inline-flex items-center justify-center text-xl select-none"
      >
        {emoji}
      </span>
    )
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-md shadow-md border border-slate-700/70 bg-[#070d1e] shrink-0 ${sizeClasses[size]}`}
      title={`${alt} flag`}
    >
      <img
        src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w160/${code.toLowerCase()}.png 2x`}
        alt={`${alt} flag`}
        loading="lazy"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  )
}

/**
 * Country Card Component rendering the exact requested simple, truthful structure:
 * - Country name
 * - Country flag
 * - Region
 * - "Remote cybersecurity services available"
 * - Standard replacement wording
 * - Optional service tags
 */
function CountryCard({
  country,
  index
}: {
  country: CountryOperation
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      viewport={{ once: true }}
      className="glass-card glass-card-hover rounded-2xl p-6 border border-[#1e2942] flex flex-col justify-between group"
    >
      <div>
        {/* Header: Flag, Name, Region, Status */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <CountryFlag
              code={country.code}
              alt={country.name}
              emoji={country.flag}
              size="md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {country.name}
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {country.code.toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">{country.region}</span>
            </div>
          </div>

          <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Remote cybersecurity services available
          </span>
        </div>
      </div>

      {/* Available Service Tags */}
      <div className="pt-3 border-t border-[#1e2942]/70 space-y-2">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
          Available Remote Services:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STANDARD_SERVICES.map((service, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#040914] border border-[#1e2942] text-slate-300 hover:border-blue-500/40 transition-colors"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function OperationsContent() {
  const [activeTab, setActiveTab] = useState<'all' | 'primary' | 'priority' | 'strategic' | 'other'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Search filter across country name, region, and services
  const query = searchQuery.toLowerCase().trim()

  const matchesSearch = (item: { name: string; region?: string; coverage?: string }) => {
    if (!query) return true
    const inName = item.name.toLowerCase().includes(query)
    const inRegion = item.region ? item.region.toLowerCase().includes(query) : false
    const inCoverage = item.coverage ? item.coverage.toLowerCase().includes(query) : false
    const inServices = STANDARD_SERVICES.some(s => s.toLowerCase().includes(query))
    return inName || inRegion || inCoverage || inServices
  }

  const filteredPrimary = useMemo(() => PRIMARY_OPERATIONS.filter(matchesSearch), [query])
  const filteredPriority = useMemo(() => PRIORITY_EXPANSION.filter(matchesSearch), [query])
  const filteredStrategic = useMemo(() => STRATEGIC_EXPANSION.filter(matchesSearch), [query])
  const filteredOther = useMemo(() => OTHER_REGIONS.filter(matchesSearch), [query])

  return (
    <div className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Command Banner */}
      <section className="text-center relative pt-4 pb-2">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1124] border border-blue-500/40 text-blue-400 text-xs font-mono tracking-wider uppercase mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>NIGERIA-BASED · PAN-AFRICAN CYBERSECURITY</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300">REMOTE SERVICES WORLDWIDE</span>
        </motion.div>

        {/* 1. Areas of Operation Heading (Retained) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
        >
          Areas of <span className="gradient-text-blue">Operation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          BTM Security is a Nigeria-based cybersecurity company serving African enterprises and remote clients worldwide. We deliver rigorous penetration testing, vulnerability management, continuous monitoring, and security compliance advisory — built for the pace and scale of African digital growth.
        </motion.p>

        {/* 6. Top Disclaimer Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 max-w-4xl mx-auto p-6 md:p-7 rounded-2xl bg-gradient-to-r from-[#0a1329] via-[#0d1b3a] to-[#0a1329] border border-blue-500/40 shadow-xl relative overflow-hidden text-left"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 text-2xl shrink-0 shadow-inner">
              <i className="fas fa-shield-halved" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                  OPERATIONAL COVERAGE & DISCLAIMER
                </span>
                <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-700/50 font-mono">
                  REMOTE DELIVERY MODEL
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                &ldquo;{DISCLAIMER_TEXT}&rdquo;
              </p>
            </div>
          </div>
        </motion.div>

        {/* Telemetry Summary Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-[#0a1124]/80 border border-[#1e2942] backdrop-blur-md text-center">
            <div className="text-3xl font-extrabold text-blue-400 font-mono">4</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Primary Operations</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0a1124]/80 border border-[#1e2942] backdrop-blur-md text-center">
            <div className="text-3xl font-extrabold text-cyan-400 font-mono">10</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Priority Expansion</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0a1124]/80 border border-[#1e2942] backdrop-blur-md text-center">
            <div className="text-3xl font-extrabold text-sky-400 font-mono">6</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Strategic Expansion</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0a1124]/80 border border-[#1e2942] backdrop-blur-md text-center">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Remote Service Delivery</div>
          </div>
        </div>

      </section>

      {/* Strategic Positioning: The Remote Delivery Advantage */}
      <section className="p-6 md:p-8 rounded-2xl bg-[#070d1e]/80 border border-[#1e2942] backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-1 space-y-3">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">STRATEGIC CAPABILITY</span>
            <h2 className="text-2xl font-bold text-white">How Remote Security Delivery Protects Your Organization</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Cyber threats do not respect physical boundaries. By operating remotely, BTM Security delivers specialized security assessments and continuous defense without unnecessary on-premise operational overhead.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0a1329] border border-[#1c2944]">
              <div className="flex items-center gap-2.5 mb-2 text-blue-400 font-bold text-sm">
                <i className="fas fa-network-wired" />
                <span>External & API Penetration Testing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Comprehensive testing of web apps, mobile APIs, and external infrastructure to identify vulnerabilities before malicious attackers exploit them.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a1329] border border-[#1c2944]">
              <div className="flex items-center gap-2.5 mb-2 text-cyan-400 font-bold text-sm">
                <i className="fas fa-radar" />
                <span>Continuous Vulnerability Management</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ongoing scanning, vulnerability triage, and remediation guidance to keep attack surfaces minimized across dynamic environments.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a1329] border border-[#1c2944]">
              <div className="flex items-center gap-2.5 mb-2 text-emerald-400 font-bold text-sm">
                <i className="fas fa-life-ring" />
                <span>Incident Response Support</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Structured remote incident investigation, root-cause analysis, and containment recommendations when unexpected security anomalies emerge.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a1329] border border-[#1c2944]">
              <div className="flex items-center gap-2.5 mb-2 text-sky-400 font-bold text-sm">
                <i className="fas fa-shield-check" />
                <span>Security Compliance Advisory</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Expert guidance aligning technical security controls with industry standards and regional regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs & Search Controls */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a1124]/70 border border-[#1e2942] backdrop-blur-md">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              id="filter-tab-all"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-[#12203a]'
              }`}
            >
              All Regions (24)
            </button>
            <button
              id="filter-tab-primary"
              onClick={() => setActiveTab('primary')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'primary'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-[#12203a]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Primary Operations (4)
            </button>
            <button
              id="filter-tab-priority"
              onClick={() => setActiveTab('priority')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'priority'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-[#12203a]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Priority Expansion (10)
            </button>
            <button
              id="filter-tab-strategic"
              onClick={() => setActiveTab('strategic')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'strategic'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-[#12203a]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Strategic Expansion (6)
            </button>
            <button
              id="filter-tab-other"
              onClick={() => setActiveTab('other')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'other'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-[#12203a]'
              }`}
            >
              <i className="fas fa-globe text-xs" />
              Other Regions (4)
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-72">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input
              id="country-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country, region or service..."
              className="w-full bg-[#040914] border border-[#1e2942] rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 5.1 PRIMARY OPERATIONS (Nigeria, Kenya, Ghana, South Africa) */}
      {(activeTab === 'all' || activeTab === 'primary') && (
        <section id="primary-operations" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e2942] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Primary Operations</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Core African regional coverage providing remote cybersecurity services, vulnerability management, and incident response support.
              </p>
            </div>
            <div className="text-xs font-mono px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg shrink-0 self-start sm:self-auto">
              PRIMARY // 4 COUNTRIES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrimary.map((country, index) => (
              <CountryCard key={country.name} country={country} index={index} />
            ))}
          </div>

          {filteredPrimary.length === 0 && (
            <div className="p-8 text-center text-slate-400 border border-dashed border-[#1e2942] rounded-xl">
              No primary operation countries match your query &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </section>
      )}

      {/* 5.2 PRIORITY EXPANSION (10 Countries) */}
      {(activeTab === 'all' || activeTab === 'priority') && (
        <section id="priority-expansion" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e2942] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Priority Expansion</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Fast-scaling African markets where BTM Security delivers dedicated remote cybersecurity services and compliance advisory.
              </p>
            </div>
            <div className="text-xs font-mono px-3 py-1 bg-blue-950/60 border border-blue-500/40 text-blue-300 rounded-lg shrink-0 self-start sm:self-auto">
              EXPANSION // 10 COUNTRIES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPriority.map((country, index) => (
              <CountryCard key={country.name} country={country} index={index} />
            ))}
          </div>

          {filteredPriority.length === 0 && (
            <div className="p-8 text-center text-slate-400 border border-dashed border-[#1e2942] rounded-xl">
              No priority expansion countries match your query &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </section>
      )}

      {/* 5.3 STRATEGIC EXPANSION (6 Countries) */}
      {(activeTab === 'all' || activeTab === 'strategic') && (
        <section id="strategic-expansion" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e2942] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Strategic Expansion</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Strategic regional markets where BTM Security extends remote cybersecurity testing, vulnerability management, and continuous monitoring.
              </p>
            </div>
            <div className="text-xs font-mono px-3 py-1 bg-sky-950/60 border border-sky-500/40 text-sky-300 rounded-lg shrink-0 self-start sm:self-auto">
              STRATEGIC // 6 COUNTRIES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStrategic.map((country, index) => (
              <CountryCard key={country.name} country={country} index={index} />
            ))}
          </div>

          {filteredStrategic.length === 0 && (
            <div className="p-8 text-center text-slate-400 border border-dashed border-[#1e2942] rounded-xl">
              No strategic expansion countries match your query &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </section>
      )}

      {/* 5.4 OTHER REGIONS (Europe, Middle East, Asia, North America) */}
      {(activeTab === 'all' || activeTab === 'other') && (
        <section id="other-regions" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e2942] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Other Regions</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Remote clients in Europe, Middle East, Asia, and North America.
              </p>
            </div>
            <div className="text-xs font-mono px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 rounded-lg shrink-0 self-start sm:self-auto">
              GLOBAL // 4 REGIONS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOther.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-[#1e2942] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <CountryFlag
                        code={region.code}
                        alt={region.name}
                        emoji={region.flag}
                        size="md"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {region.name}
                        </h3>
                        <span className="text-xs font-mono text-cyan-400">{region.coverage}</span>
                      </div>
                    </div>

                    <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      Remote cybersecurity services available
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1e2942]/70 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Available Remote Services:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {STANDARD_SERVICES.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#040914] border border-[#1e2942] text-slate-300 hover:border-cyan-500/40 transition-colors"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOther.length === 0 && (
            <div className="p-8 text-center text-slate-400 border border-dashed border-[#1e2942] rounded-xl">
              No regions match your query &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </section>
      )}

      {/* 6. Bottom Disclaimer Card */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#0a1124]/90 border border-blue-500/30 text-center max-w-4xl mx-auto shadow-xl">
        <div className="flex items-center justify-center gap-2 mb-2 text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold">
          <i className="fas fa-info-circle text-sm" />
          <span>Operational Disclaimer</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl mx-auto">
          &ldquo;{DISCLAIMER_TEXT}&rdquo;
        </p>
      </section>

      {/* Grounded Sector Matrix */}
      <section className="py-8 border-t border-[#1e2942]/80 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block text-xs font-mono px-3 py-1 bg-blue-900/30 border border-blue-500/30 text-blue-400 rounded-full">
            SECTOR FOCUS
          </div>
          <h2 className="text-3xl font-bold text-white">
            Remote Cybersecurity Across Core Sectors
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            BTM Security engineers tailored remote security assessments for sectors that drive economic velocity across Africa and global partner markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTOR_PILLARS.map((sec, idx) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-[#0a1124]/70 border border-[#1e2942] hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sec.color} flex items-center justify-center text-white text-xl mb-4 shadow-lg shadow-blue-500/10`}>
                  <i className={`fas ${sec.icon}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{sec.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {sec.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0a1535] via-[#091129] to-[#040915] border border-blue-500/40 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <span>REMOTE CYBERSECURITY SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Protect Your Infrastructure?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Get in touch with our team to schedule a penetration test, security assessment, or continuous monitoring advisory for your organization.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              id="cta-contact-operations"
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all flex items-center gap-2"
            >
              <span>Contact BTM Security</span>
              <i className="fas fa-arrow-right text-xs" />
            </Link>
            <Link
              id="cta-services-overview"
              href="/services"
              className="px-8 py-3.5 rounded-xl bg-[#0a1124] border border-[#1e2942] hover:border-blue-500/60 text-slate-200 hover:text-white font-semibold text-sm transition-all"
            >
              Explore Security Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
