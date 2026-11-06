'use client'

import { useState, useMemo } from 'react'

interface Trainer {
  name: string
  gender: 'male' | 'female'
  specialty: string
  category: 'Offensive' | 'Defensive' | 'Cloud' | 'GRC'
  location: string
  state: string
  licensedSince: number
}

const NIGERIA_TRAINERS: Trainer[] = [
  {
    name: 'Jesse Callistus',
    gender: 'male',
    specialty: 'Ethical Hacking & Penetration Testing',
    category: 'Offensive',
    location: 'Lagos, Nigeria',
    state: 'Lagos',
    licensedSince: 2019
  },
  {
    name: 'Ngozi Okonjo-Eze',
    gender: 'female',
    specialty: 'SOC Operations & SIEM Engineering',
    category: 'Defensive',
    location: 'Abuja, Nigeria',
    state: 'FCT',
    licensedSince: 2020
  },
  {
    name: 'Olumide Adesanya',
    gender: 'male',
    specialty: 'Cloud Security Architecture & DevSecOps',
    category: 'Cloud',
    location: 'Lagos, Nigeria',
    state: 'Lagos',
    licensedSince: 2021
  },
  {
    name: 'Rita Okafor',
    gender: 'female',
    specialty: 'Application Security & API Defense',
    category: 'Offensive',
    location: 'Port Harcourt, Nigeria',
    state: 'Rivers',
    licensedSince: 2022
  },
  {
    name: 'Charles Adebayo',
    gender: 'male',
    specialty: 'Enterprise Network Security & Firewalls',
    category: 'Defensive',
    location: 'Ibadan, Nigeria',
    state: 'Oyo',
    licensedSince: 2020
  },
  {
    name: 'Amina Bello',
    gender: 'female',
    specialty: 'Cryptographic Security & PKI Architecture',
    category: 'Defensive',
    location: 'Abuja, Nigeria',
    state: 'FCT',
    licensedSince: 2020
  },
  {
    name: 'Chinedu Nwosu',
    gender: 'male',
    specialty: 'Red Team Operations & Exploit Emulation',
    category: 'Offensive',
    location: 'Port Harcourt, Nigeria',
    state: 'Rivers',
    licensedSince: 2021
  },
  {
    name: 'Zainab Abubakar',
    gender: 'female',
    specialty: 'Threat Hunting & Detection Engineering',
    category: 'Defensive',
    location: 'Abuja, Nigeria',
    state: 'FCT',
    licensedSince: 2021
  },
  {
    name: 'Dominic Fashola',
    gender: 'male',
    specialty: 'Threat Intelligence Analysis & OSINT',
    category: 'Defensive',
    location: 'Lagos, Nigeria',
    state: 'Lagos',
    licensedSince: 2020
  },
  {
    name: 'Mirabel Bassey',
    gender: 'female',
    specialty: 'Incident Response & Digital Forensics (DFIR)',
    category: 'Defensive',
    location: 'Port Harcourt, Nigeria',
    state: 'Rivers',
    licensedSince: 2022
  },
  {
    name: 'Danjuma Ibrahim',
    gender: 'male',
    specialty: 'Zero Trust Architecture & Identity Security',
    category: 'Cloud',
    location: 'Abuja, Nigeria',
    state: 'FCT',
    licensedSince: 2022
  },
  {
    name: 'Adaeze Okoye',
    gender: 'female',
    specialty: 'Cyber Risk Governance & ISO 27001 Compliance',
    category: 'GRC',
    location: 'Lagos, Nigeria',
    state: 'Lagos',
    licensedSince: 2020
  },
  {
    name: 'Kelvin Adesanya',
    gender: 'male',
    specialty: 'Industrial Control Systems (ICS/SCADA) Security',
    category: 'Defensive',
    location: 'Port Harcourt, Nigeria',
    state: 'Rivers',
    licensedSince: 2021
  },
  {
    name: 'Blessing Danladi',
    gender: 'female',
    specialty: 'Security Awareness & Social Engineering Defense',
    category: 'GRC',
    location: 'Abuja, Nigeria',
    state: 'FCT',
    licensedSince: 2023
  },
  {
    name: 'Femi Olatunji',
    gender: 'male',
    specialty: 'Vulnerability Assessment & Attack Surface Management',
    category: 'Offensive',
    location: 'Lagos, Nigeria',
    state: 'Lagos',
    licensedSince: 2022
  },
  {
    name: 'Halima Sanusi',
    gender: 'female',
    specialty: 'AI & Machine Learning in Threat Detection',
    category: 'Cloud',
    location: 'Abuja, Nigeria',
    state: 'FCT',
    licensedSince: 2023
  }
]

export default function RegionalTrainers() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['All', 'Offensive', 'Defensive', 'Cloud', 'GRC']

  const filteredTrainers = useMemo(() => {
    return NIGERIA_TRAINERS.filter((trainer) => {
      const matchesCategory = selectedCategory === 'All' || trainer.category === selectedCategory
      const matchesSearch =
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>OFFICIAL NIGERIAN ROSTER</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Licensed Cybersecurity Trainers in Nigeria
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Authorized instructors vetted to deliver BTMSecurity technical training, corporate workshops, and certification bootcamps across Nigeria.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 bg-[#070e20]/70 border border-[#1e2e50] p-3 sm:p-4 rounded-2xl backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {cat === 'All' ? 'All Disciplines' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
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
              placeholder="Search trainer or specialty..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#030816] border border-[#1e2e50] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredTrainers.map((trainer, idx) => (
            <div
              key={idx}
              className="group bg-[#070e20]/80 border border-[#16274a] hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-blue-950/40 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Licensed Trainer
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Est. {trainer.licensedSince}
                  </span>
                </div>

                {/* Trainer Name */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                  {trainer.name}
                </h3>

                {/* Specialty */}
                <p className="text-xs sm:text-sm text-blue-400 font-medium mb-4 leading-snug">
                  {trainer.specialty}
                </p>
              </div>

              {/* Footer Meta: Location & Category */}
              <div className="pt-3 border-t border-[#122244] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{trainer.location}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/20 text-blue-300 text-[10px]">
                  {trainer.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTrainers.length === 0 && (
          <div className="text-center py-12 bg-[#070e20]/40 rounded-2xl border border-[#1e2e50]">
            <p className="text-slate-400 text-sm">No trainers match your filter criteria.</p>
          </div>
        )}

      </div>
    </section>
  )
}
