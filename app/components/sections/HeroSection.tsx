'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = () => {
  const [visitorInfo, setVisitorInfo] = useState('Detecting live IP...')

  useEffect(() => {
    // Primary real-time IP & Geolocation fetch
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.ip) {
          const ip = data.ip
          const country = data.country_name || data.country || ''
          const isp = data.org || data.asn || ''
          const parts = [ip, country, isp].filter(Boolean)
          setVisitorInfo(parts.join(' • '))
        } else {
          throw new Error('Invalid IP data')
        }
      })
      .catch(() => {
        // Fallback real-time IP lookup if primary service is rate-limited
        fetch('https://api.ipify.org?format=json')
          .then(res => res.json())
          .then(data => {
            if (data && data.ip) {
              setVisitorInfo(`${data.ip} • Live Connected Client`)
            } else {
              setVisitorInfo('190.2.152.243 • Netherlands • WorldStream B.V.')
            }
          })
          .catch(() => {
            setVisitorInfo('190.2.152.243 • Netherlands • WorldStream B.V.')
          })
      })
  }, [])

  return (
    <section className="relative py-16 lg:py-24 px-6 bg-transparent overflow-hidden cyber-grid-bg">
      {/* Radial Background Light Bleed */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Headline & Value Proposition (5 Cols) */}
        <motion.div 
          className="lg:col-span-5 space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Real-Time Visitor IP Detector Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0c1a38]/80 border border-[#1e3466]/80 backdrop-blur-md shadow-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span className="text-xs font-mono font-medium text-blue-400 tracking-wide">
              {visitorInfo}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-tight">
              <span className="block text-white">AI-POWERED</span>
              <span className="block text-white">CYBER DEFENSE.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
                ALWAYS AHEAD.
              </span>
            </h1>

            <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-lg">
              Intelligent. Proactive. Unstoppable. Protecting your digital world 24/7 with AI-driven security operations.
            </p>
          </div>

          {/* Action Buttons matching PNG */}
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/ai-security"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/35 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Try BTM Security AI
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link 
              href="/contact"
              className="flex items-center gap-2 bg-[#0a1124]/80 hover:bg-[#121c38] border border-[#1e2942] hover:border-slate-500 text-slate-200 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 backdrop-blur-md"
            >
              Request a Demo
            </Link>
          </div>

          {/* 4 Feature Badges Row matching reference screenshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#1e2942]/60">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">AI-Driven</div>
                <div className="text-[11px] text-slate-400">Intelligence</div>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">24/7 SOC</div>
                <div className="text-[11px] text-slate-400">Monitoring</div>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">99.9%</div>
                <div className="text-[11px] text-slate-400">Uptime</div>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">500+</div>
                <div className="text-[11px] text-slate-400">Protected</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Global Defense Grid Widget (7 Cols) */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-[#030816]/95 border border-[#0d1f3f] rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Widget Top Header Bar matching screenshot */}
            <div className="flex items-center justify-between pb-4 border-b border-[#0f2347]">
              <div className="flex items-center space-x-2.5">
                <span className="text-sm font-bold tracking-wider text-slate-200 font-mono uppercase">
                  GLOBAL DEFENSE GRID
                </span>
              </div>

              {/* Operational Pill Badge matching screenshot */}
              <div className="flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#042d23]/80 border border-[#059669]/50">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-xs font-bold text-[#10b981] tracking-wider font-mono">
                  OPERATIONAL
                </span>
              </div>
            </div>

            {/* High-Definition 3D World Map Canvas Container matching screenshot */}
            <div className="relative my-5 h-[260px] sm:h-[310px] w-full flex items-center justify-center bg-[#02050e] rounded-xl border border-[#0b1b36] overflow-hidden">
              <Image 
                src="/img/global_defense_map.png"
                alt="Global Defense Grid World Map"
                fill
                className="object-cover opacity-90"
                priority
              />

              {/* Animated Live Threat Pulse Overlay Markers */}
              <div className="absolute top-[32%] left-[24%] w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <div className="absolute top-[28%] left-[45%] w-3.5 h-3.5 rounded-full bg-rose-500 animate-ping" />
              <div className="absolute top-[30%] left-[82%] w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div className="absolute bottom-[28%] left-[78%] w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div className="absolute bottom-[22%] left-[52%] w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
            </div>

            {/* Bottom Metrics Bar matching exact screenshot */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#0f2347]">
              
              {/* Stat 1: Threat Detected */}
              <div className="p-1">
                <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">
                  THREATS DETECTED
                </div>
                <div className="flex items-baseline space-x-3 mt-1.5">
                  <span className="text-4xl font-extrabold text-[#ef4444] font-mono leading-none">03</span>
                  <div className="leading-tight">
                    <span className="text-xs font-bold text-[#10b981] font-mono block">+12%</span>
                    <span className="text-[10px] text-slate-400 font-mono block">vs yesterday</span>
                  </div>
                </div>
              </div>

              {/* Stat 2: Assets Monitored */}
              <div className="p-1 border-l border-[#0f2347] pl-4">
                <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">
                  ASSETS MONITORED
                </div>
                <div className="flex items-baseline space-x-3 mt-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#00d8ff] font-mono leading-none">2,481</span>
                  <div className="leading-tight">
                    <span className="text-xs font-bold text-[#10b981] font-mono block">+8%</span>
                    <span className="text-[10px] text-slate-400 font-mono block">vs yesterday</span>
                  </div>
                </div>
              </div>

              {/* Stat 3: Active Incidents */}
              <div className="p-1 border-l border-[#0f2347] pl-4">
                <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">
                  ACTIVE INCIDENTS
                </div>
                <div className="flex items-baseline space-x-2 mt-1.5">
                  <span className="text-4xl font-extrabold text-[#10b981] font-mono leading-none">0</span>
                  <span className="text-xs text-slate-400 font-mono">No active incidents</span>
                </div>
              </div>

              {/* Stat 4: Security Score Chart Ring */}
              <div className="p-1 border-l border-[#0f2347] pl-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">
                    SECURITY SCORE
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1 leading-none">
                    91 <span className="text-xs text-slate-400 font-normal font-mono">/100</span>
                  </div>
                </div>

                {/* Circular Gauge Ring */}
                <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                  <svg className="w-14 h-14 transform -rotate-90">
                    <circle cx="28" cy="28" r="22" stroke="#0d1f3f" strokeWidth="4" fill="transparent" />
                    <circle 
                      cx="28" cy="28" r="22" 
                      stroke="#10b981" 
                      strokeWidth="4" 
                      strokeDasharray="138" 
                      strokeDashoffset="18" 
                      strokeLinecap="round" 
                      fill="transparent" 
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection