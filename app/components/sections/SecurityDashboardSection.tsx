'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const SecurityDashboardSection = () => {
  const threats = [
    {
      severity: 'HIGH',
      severityColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
      title: 'Credential stuffing attack detected',
      sector: 'Financial Services Sector',
      time: '2m ago'
    },
    {
      severity: 'MEDIUM',
      severityColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      title: 'Phishing infrastructure identified',
      sector: 'Europe Region',
      time: '12m ago'
    },
    {
      severity: 'HIGH',
      severityColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
      title: 'New vulnerability exploitation observed',
      sector: 'Web Applications',
      time: '18m ago'
    },
    {
      severity: 'LOW',
      severityColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      title: 'Suspicious domain cluster identified',
      sector: 'Global',
      time: '25m ago'
    }
  ]

  const categories = [
    { name: 'Internet Exposure', percentage: 12 },
    { name: 'Identity', percentage: 7 },
    { name: 'Endpoint', percentage: 18 },
    { name: 'Cloud', percentage: 9 },
    { name: 'Applications', percentage: 14 },
    { name: 'Data', percentage: 4 }
  ]

  const recommendations = [
    { title: 'Enable Multi-Factor Authentication', icon: '🛡️' },
    { title: 'Patch 3 Critical Vulnerabilities', icon: '🔒' },
    { title: 'Review Cloud Storage Permissions', icon: '🌐' },
    { title: 'Update SSL/TLS Configurations', icon: '🔑' }
  ]

  return (
    <section className="py-16 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* Left Box: LIVE THREAT INTELLIGENCE (5 Cols) */}
        <motion.div 
          className="lg:col-span-4 bg-[#070e1e]/90 border border-[#1e2942] rounded-2xl p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1e2942]">
              <span className="text-xs font-bold tracking-widest text-slate-300 font-mono uppercase">
                LIVE THREAT INTELLIGENCE
              </span>
              <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[10px] font-bold text-rose-400 font-mono">LIVE</span>
              </div>
            </div>

            {/* Threat List */}
            <div className="divide-y divide-[#1e2942]/60 my-4 space-y-3">
              {threats.map((threat, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-start space-x-3">
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${threat.severityColor} shrink-0`}>
                    {threat.severity}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-200 truncate">
                      {threat.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {threat.sector}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono shrink-0">
                    {threat.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Link */}
          <div className="pt-4 border-t border-[#1e2942]">
            <Link href="/ai-security" className="inline-flex items-center text-xs font-bold text-blue-400 hover:text-cyan-300 font-mono tracking-wide">
              View All Threats
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Right Box: SECURITY POSTURE OVERVIEW (8 Cols) */}
        <motion.div 
          className="lg:col-span-8 bg-[#070e1e]/90 border border-[#1e2942] rounded-2xl p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            {/* Header */}
            <div className="pb-4 border-b border-[#1e2942]">
              <span className="text-xs font-bold tracking-widest text-slate-300 font-mono uppercase">
                SECURITY POSTURE OVERVIEW
              </span>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-12 gap-6 my-6 items-center">
              
              {/* Score Circular Gauge (3 Cols) */}
              <div className="md:col-span-3 flex flex-col items-center justify-center p-4 bg-[#040914] rounded-xl border border-[#162035]">
                <div className="text-[10px] font-bold text-slate-400 font-mono mb-2 uppercase tracking-wider">
                  OVERALL SECURITY SCORE
                </div>

                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="38" stroke="#1e2942" strokeWidth="6" fill="transparent" />
                    <circle 
                      cx="48" cy="48" r="38" 
                      stroke="#00d8ff" 
                      strokeWidth="6" 
                      strokeDasharray="238" 
                      strokeDashoffset="42" 
                      strokeLinecap="round" 
                      fill="transparent" 
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-2xl font-extrabold text-white font-mono leading-none">82</div>
                    <div className="text-[10px] text-slate-400 font-mono">/100</div>
                  </div>
                </div>

                <div className="text-center mt-2">
                  <span className="text-xs font-bold text-emerald-400 font-mono">Good</span>
                  <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5">▲ 6% vs last week</div>
                </div>
              </div>

              {/* Progress Bar Categories (5 Cols) */}
              <div className="md:col-span-5 space-y-2.5 px-2">
                {categories.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">{cat.name}</span>
                      <span className="text-slate-400 font-bold">{cat.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1e2942] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" 
                        style={{ width: `${cat.percentage * 3.5}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Recommendations (4 Cols) */}
              <div className="md:col-span-4 bg-[#040914] p-4 rounded-xl border border-[#162035] space-y-3">
                <div className="text-[10px] font-bold text-blue-400 font-mono tracking-wider uppercase">
                  TOP RECOMMENDATIONS
                </div>
                <div className="space-y-2.5">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 leading-snug">
                      <span className="text-sm shrink-0">{rec.icon}</span>
                      <span className="hover:text-white transition-colors cursor-pointer">{rec.title}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Footer Link */}
          <div className="pt-4 border-t border-[#1e2942]">
            <Link href="/services" className="inline-flex items-center text-xs font-bold text-blue-400 hover:text-cyan-300 font-mono tracking-wide">
              View Full Report
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default SecurityDashboardSection
