'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CaseStudyHighlight() {
  return (
    <section aria-labelledby="case-study-heading" className="py-20 px-6 bg-transparent relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
              PROVEN RESULTS IN PRODUCTION
            </span>
          </div>
          <h2 id="case-study-heading" className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Client Success & Real-World Impact
          </h2>
          <p className="text-slate-400 text-sm lg:text-base">
            See how BTM Security delivers rigorous offensive assessments and protective defense for African and global enterprises.
          </p>
        </div>

        {/* Featured Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-b from-[#0a1329]/95 to-[#040815]/95 border border-[#1e2942] hover:border-blue-500/50 rounded-2xl p-8 lg:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Card Top Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1e2942]/70">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <i className="fas fa-file-shield text-blue-400 text-lg" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
                  CASE STUDY #CS-2408
                </span>
                <h3 className="text-lg lg:text-xl font-bold text-white">
                  Securing a Tier-1 Pan-African Payments Gateway
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold">
              <i className="fas fa-check-circle text-xs" aria-hidden="true" />
              <span>VERIFIED OUTCOME</span>
            </div>
          </div>

          {/* 3-Column Structured Breakdown: Client | Scope | Result */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-[#1e2942]/70">
            
            {/* 1. CLIENT */}
            <div className="space-y-3 bg-[#030712]/50 p-6 rounded-xl border border-[#142038]">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-900/40 flex items-center justify-center text-blue-400 text-xs">
                  <i className="fas fa-building" aria-hidden="true" />
                </div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
                  1. CLIENT
                </h4>
              </div>
              <p className="text-white font-semibold text-base leading-snug">
                Pan-African Digital Payments & Processing Gateway
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operating across 8 African markets, processing over 12M+ monthly transactions for merchants, commercial banks, and cross-border remittances.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono bg-[#0c1830] text-slate-300 px-2 py-0.5 rounded border border-[#1b2b4d]">
                  FinTech
                </span>
                <span className="text-[10px] font-mono bg-[#0c1830] text-slate-300 px-2 py-0.5 rounded border border-[#1b2b4d]">
                  Nigeria / Pan-Africa
                </span>
                <span className="text-[10px] font-mono bg-[#0c1830] text-slate-300 px-2 py-0.5 rounded border border-[#1b2b4d]">
                  Cloud Native
                </span>
              </div>
            </div>

            {/* 2. SCOPE */}
            <div className="space-y-3 bg-[#030712]/50 p-6 rounded-xl border border-[#142038]">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-900/40 flex items-center justify-center text-cyan-400 text-xs">
                  <i className="fas fa-crosshairs" aria-hidden="true" />
                </div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  2. SCOPE
                </h4>
              </div>
              <p className="text-white font-semibold text-base leading-snug">
                Full-Scope Web App, API & Cloud Pentest
              </p>
              <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">▸</span>
                  <span>Deep authorization & business logic assessment on 40+ microservice REST/GraphQL endpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">▸</span>
                  <span>AWS & Kubernetes infrastructure configuration audit and IAM privilege escalation testing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">▸</span>
                  <span>Remediation re-test and CI/CD security gating advisory before Tier-1 bank launch.</span>
                </li>
              </ul>
            </div>

            {/* 3. RESULT */}
            <div className="space-y-3 bg-[#030712]/50 p-6 rounded-xl border border-[#142038]">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-900/40 flex items-center justify-center text-emerald-400 text-xs">
                  <i className="fas fa-chart-line" aria-hidden="true" />
                </div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                  3. RESULT
                </h4>
              </div>
              <p className="text-white font-semibold text-base leading-snug">
                Zero Exploitable Vulns & Rapid Compliance
              </p>
              <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span><strong className="text-white">14 Critical & High vulnerabilities</strong> remediated and validated within 10 business days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span><strong className="text-white">0 Post-launch security breaches</strong> across $500M+ processed settlement volumes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>Accelerated ISO 27001 & PCI-DSS Level 1 readiness by 4 months.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Metrics Highlights Bar & CTAs */}
          <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 w-full lg:w-auto text-center lg:text-left">
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-blue-400 font-mono">14</div>
                <div className="text-[11px] text-slate-400 font-sans">Flaws Remediated</div>
              </div>
              <div className="border-x border-[#1e2942] px-6">
                <div className="text-2xl lg:text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
                <div className="text-[11px] text-slate-400 font-sans">Pass on Retest</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-cyan-400 font-mono">0</div>
                <div className="text-[11px] text-slate-400 font-sans">Production Breaches</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-center lg:justify-end">
              <Link
                href="/about/our-clients"
                className="inline-flex items-center gap-2 bg-[#0a152e] hover:bg-[#122247] border border-[#1e3466] hover:border-blue-400 text-slate-200 hover:text-white px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200"
              >
                <span>View Success Stories</span>
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold shadow-md shadow-blue-600/30 transition-all duration-200"
              >
                <span>Book a 15-Minute Scoping Call</span>
                <i className="fas fa-phone-volume text-xs" aria-hidden="true" />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
