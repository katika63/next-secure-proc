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
    <section className="relative py-8 sm:py-12 lg:py-24 px-4 sm:px-6 bg-transparent overflow-hidden cyber-grid-bg">
      {/* Radial Background Light Bleed */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Headline & Value Proposition (5 Cols) */}
        <motion.div 
          className="lg:col-span-5 space-y-5 sm:space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Operational Scope Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#0c1a38]/80 border border-[#1e3466]/80 backdrop-blur-md shadow-md max-w-full">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="text-[11px] sm:text-xs font-mono font-medium text-blue-400 tracking-wide truncate max-w-[260px] xs:max-w-[320px] sm:max-w-none">
                {visitorInfo}
              </span>
            </div>
            <Link
              href="/operations"
              className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#0a1124] border border-[#1e2942] text-[10px] sm:text-[11px] font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <i className="fas fa-shield text-[9px] sm:text-[10px] text-emerald-400" />
              <span>Global Reach • African Priority</span>
            </Link>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.2] text-white">
              AI-Powered Cyber Defense for <span className="gradient-text-blue">Modern Enterprises</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
              BTM Security protects web applications, APIs, cloud environments, and customer data through authorized assessment, continuous monitoring, incident response, and security advisory.
            </p>
          </div>

          {/* Action Buttons: Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link 
              id="hero-cta-consultation"
              href="/contact?type=consultation"
              className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 sm:px-6 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/35 hover:shadow-blue-500/50 transition-all duration-300 w-full sm:w-auto text-center touch-tap"
            >
              <span>Book a Free Risk Consultation</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link 
              id="hero-cta-services"
              href="/services"
              className="flex items-center justify-center gap-2 bg-[#0a1124]/90 hover:bg-[#121c38] border border-[#1e2942] hover:border-blue-500/60 text-slate-200 hover:text-white px-5 sm:px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 backdrop-blur-md w-full sm:w-auto text-center touch-tap"
            >
              <span>View Services</span>
            </Link>
          </div>

          {/* 4 Feature Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 pt-4 border-t border-[#1e2942]/60">
            <div className="flex items-center space-x-2 p-2 sm:p-0 rounded-lg bg-[#0a1124]/40 sm:bg-transparent border border-[#1e2942]/40 sm:border-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">AI-Driven</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Intelligence</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-2 sm:p-0 rounded-lg bg-[#0a1124]/40 sm:bg-transparent border border-[#1e2942]/40 sm:border-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">24/7 SOC</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Monitoring</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-2 sm:p-0 rounded-lg bg-[#0a1124]/40 sm:bg-transparent border border-[#1e2942]/40 sm:border-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">99.9%</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Uptime</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-2 sm:p-0 rounded-lg bg-[#0a1124]/40 sm:bg-transparent border border-[#1e2942]/40 sm:border-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">500+</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Protected</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: AI Cyber Defense Visual (7 Cols) */}
        <motion.div 
          className="lg:col-span-7 mt-4 lg:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative rounded-2xl border border-blue-500/20 bg-[#070e20]/80 backdrop-blur-xl p-2.5 sm:p-4 shadow-2xl shadow-blue-950/50 overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/20 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/20 rounded-full blur-[90px] pointer-events-none" />

            {/* Image Container with high-tech framing */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#1e3466]/60">
              <Image
                src="/img/ai-cybersecurity-hero.jpg"
                alt="AI-Powered Cybersecurity Defense for Modern Enterprises"
                fill
                priority
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 700px"
              />
              
              {/* Subtle tech gradient vignette overlay so it blends into the dark UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030816] via-transparent to-transparent opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030816]/30 via-transparent to-transparent" />

              {/* Top Status Pill */}
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#030816]/85 border border-blue-500/30 backdrop-blur-md shadow-lg">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white tracking-wide">
                  AI DEFENSE ARCHITECTURE
                </span>
              </div>

              {/* Bottom Feature Badges Bar */}
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#030816]/90 border border-[#1e3466]/80 backdrop-blur-md">
                <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-xs font-bold text-white leading-tight font-mono truncate">Autonomous Threat Mitigation</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono truncate">Continuous Cloud & Ingress Protection</div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-[9px] sm:text-[10px] font-mono font-bold text-emerald-400 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>24/7 OVERWATCH</span>
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