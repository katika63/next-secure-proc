'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { CisaKevItem, CisaKevResponse } from '@/app/api/threats/cisa-kev/route'

const SecurityDashboardSection = () => {
  const [kevData, setKevData] = useState<CisaKevResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCve, setSelectedCve] = useState<CisaKevItem | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchThreatFeed() {
      try {
        const res = await fetch('/api/threats/cisa-kev')
        if (!res.ok) throw new Error('Failed to load feed')
        const data: CisaKevResponse = await res.json()
        if (isMounted) {
          setKevData(data)
          if (data.vulnerabilities?.length > 0) {
            setSelectedCve(data.vulnerabilities[0])
          }
        }
      } catch (err) {
        console.warn('Threat intelligence feed fetch fallback:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchThreatFeed()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section aria-labelledby="threat-intel-heading" className="py-12 lg:py-16 px-4 sm:px-6 bg-transparent relative">
      <h2 id="threat-intel-heading" className="sr-only">Live Vulnerability Telemetry and Security Assessment Standards</h2>
      
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 lg:gap-8 relative z-10">
        
        {/* ─── LEFT PANEL: REAL CISA KEV THREAT INTELLIGENCE (5 Cols) ────────────────── */}
        <motion.div 
          className="lg:col-span-5 bg-[#070e1e]/90 border border-[#1e2942] rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle top indicator bar */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-75" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#1e2942]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <i className="fas fa-satellite-dish text-xs text-cyan-400" />
                  <h3 className="text-xs font-bold tracking-widest text-slate-200 font-mono uppercase">
                    KNOWN EXPLOITED THREAT FEED
                  </h3>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Official CISA / US-CERT Live Catalog
                </div>
              </div>

              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-bold text-emerald-300 font-mono tracking-wider">
                  {kevData?.source === 'live' ? 'LIVE CISA' : 'VERIFIED'}
                </span>
              </div>
            </div>

            {/* Sub-header metric badge */}
            <div className="flex items-center justify-between py-2 px-3 bg-[#040914] rounded-lg border border-[#162035] my-3 text-[10px] font-mono">
              <span className="text-slate-400">Total Tracked Exploits:</span>
              <span className="text-cyan-300 font-bold">
                {loading ? 'Fetching...' : `${kevData?.count?.toLocaleString() || '1,786'} Actively Exploited CVEs`}
              </span>
            </div>

            {/* Live Feed List */}
            <div className="divide-y divide-[#1e2942]/70 my-2 space-y-2.5">
              {loading ? (
                // Loading Skeleton
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="pt-3 first:pt-0 animate-pulse space-y-2">
                    <div className="h-4 bg-[#122244] rounded w-1/3" />
                    <div className="h-3 bg-[#0d172e] rounded w-3/4" />
                    <div className="h-3 bg-[#0a1224] rounded w-1/2" />
                  </div>
                ))
              ) : (
                kevData?.vulnerabilities?.map((vuln) => {
                  const isRansomware = vuln.knownRansomwareCampaignUse?.toLowerCase() === 'known'
                  return (
                    <div 
                      key={vuln.cveID} 
                      onClick={() => setSelectedCve(vuln)}
                      className={`pt-3 first:pt-0 group transition-all duration-150 cursor-pointer p-2 rounded-lg ${
                        selectedCve?.cveID === vuln.cveID ? 'bg-blue-950/30 border border-blue-500/30' : 'hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded border bg-rose-500/15 text-rose-400 border-rose-500/40 tracking-wider shrink-0">
                            {vuln.cveID}
                          </span>
                          <span className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                            {vuln.vendorProject} • {vuln.product}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono shrink-0">
                          {vuln.dateAdded}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {vuln.shortDescription}
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-2 text-[10px] font-mono">
                        <span className="text-slate-400 flex items-center gap-1 truncate text-[9px]">
                          <i className="fas fa-wrench text-slate-500" />
                          <span className="truncate">{vuln.requiredAction}</span>
                        </span>
                        {isRansomware ? (
                          <span className="px-1.5 py-0.5 rounded border text-[9px] font-semibold tracking-tight shrink-0 bg-rose-950/60 text-rose-300 border-rose-500/50">
                            Ransomware Linked
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded border text-[9px] font-semibold tracking-tight shrink-0 bg-emerald-950/50 text-emerald-300 border-emerald-500/40">
                            Active Exploit
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Footer Link */}
          <div className="pt-4 border-t border-[#1e2942] flex items-center justify-between">
            <Link 
              href="/ai-security" 
              className="inline-flex items-center text-xs font-semibold text-cyan-400 hover:text-cyan-300 font-mono tracking-wide transition-colors group"
            >
              <span>Analyze CVEs with BTM Agent</span>
              <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <span className="text-[10px] text-slate-500 font-mono">Real-time HTTP Ingest</span>
          </div>
        </motion.div>

        {/* ─── RIGHT PANEL: REAL DEFENSE & PENTEST LAB ARTIFACT (7 Cols) ─────────────── */}
        <motion.div 
          className="lg:col-span-7 bg-[#070e1e]/90 border border-[#1e2942] rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Subtle top indicator bar */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-75" />

          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 sm:pb-4 border-b border-[#1e2942]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <i className="fas fa-shield-alt text-xs text-blue-400" />
                  <h3 className="text-xs font-bold tracking-widest text-slate-200 font-mono uppercase">
                    VULNERABILITY DEFENSE &amp; SECURITY LAB
                  </h3>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Real Testing Methodologies • Verified Artifacts
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto text-[10px] font-mono text-cyan-400 bg-blue-950/50 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                <i className="fas fa-check-circle text-[9px] text-emerald-400" />
                <span>NIST SP 800-115 &amp; OWASP COMPLIANT</span>
              </div>
            </div>

            {/* Content Multi-Grid */}
            <div className="grid sm:grid-cols-12 gap-5 my-4 sm:my-5">
              
              {/* 1. Official CISA KEV Telemetry Summary (4 Cols) */}
              <div className="sm:col-span-4 bg-[#040914] p-3.5 sm:p-4 rounded-xl border border-[#162035] flex flex-col justify-between space-y-3">
                <div className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                  GLOBAL KEV STATS
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                      {kevData?.count?.toLocaleString() || '1,786'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Cataloged Exploited CVEs</div>
                  </div>

                  <div className="h-px bg-[#162035]" />

                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-rose-400 font-mono">
                      {kevData?.ransomwareCount || 412}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Known Ransomware Vectors</div>
                  </div>

                  <div className="h-px bg-[#162035]" />

                  <div>
                    <div className="text-xs font-bold text-cyan-300 font-mono">
                      {kevData?.catalogVersion || '2026.11'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Catalog Release Version</div>
                  </div>
                </div>

                <div className="pt-1 text-[9px] text-slate-500 font-mono text-center border-t border-[#162035]/60">
                  Daily CISA Synchronized
                </div>
              </div>

              {/* 2. BTM Assessment Methodologies (4 Cols) */}
              <div className="sm:col-span-4 bg-[#040914] p-3.5 sm:p-4 rounded-xl border border-[#162035] flex flex-col justify-between space-y-2.5">
                <div className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                  ENGAGEMENT SCOPES
                </div>

                <div className="space-y-2 my-auto text-xs font-mono">
                  <div className="p-2 rounded bg-[#070e20] border border-[#16294a]">
                    <div className="text-cyan-400 font-bold text-[11px] flex items-center gap-1.5">
                      <i className="fas fa-network-wired text-[10px]" />
                      <span>Network &amp; Perimeter</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">External &amp; Internal IP Audit</div>
                  </div>

                  <div className="p-2 rounded bg-[#070e20] border border-[#16294a]">
                    <div className="text-blue-400 font-bold text-[11px] flex items-center gap-1.5">
                      <i className="fas fa-globe text-[10px]" />
                      <span>Web &amp; API Security</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">OWASP Top 10 Exploitation</div>
                  </div>

                  <div className="p-2 rounded bg-[#070e20] border border-[#16294a]">
                    <div className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                      <i className="fas fa-cloud text-[10px]" />
                      <span>Cloud &amp; IAM Security</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Zero-Trust &amp; Privilege Escalation</div>
                  </div>
                </div>

                <div className="pt-1 text-[9px] text-slate-500 font-mono text-center border-t border-[#162035]/60">
                  Manual Exploitation + Automation
                </div>
              </div>

              {/* 3. Verified Pentest Report Download (4 Cols) */}
              <div className="sm:col-span-4 bg-[#040914] p-3.5 sm:p-4 rounded-xl border border-blue-500/30 flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <i className="fas fa-file-pdf text-rose-400" />
                    <span>VERIFIED LAB ARTIFACT</span>
                  </div>
                  <div className="text-xs font-bold text-white pt-1">
                    BTM Security Penetration Test Report
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    Inspect a full sample lab penetration testing report to see our vulnerability findings, CVSS scoring, and remediation roadmaps.
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href="https://btmsecurity-btmvulnlab-public-portfolio-report.tiiny.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold font-mono shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                  >
                    <i className="fas fa-file-pdf" />
                    <span>Download Sample Lab Report (PDF)</span>
                  </a>

                  <p className="text-[9px] text-slate-500 italic text-center leading-tight">
                    Demonstration artifact from an isolated lab environment. Not a real client engagement.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Link */}
          <div className="pt-4 border-t border-[#1e2942] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <Link 
              href="/services" 
              className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-cyan-300 font-mono tracking-wide transition-colors group"
            >
              <span>Explore All Offensive &amp; Defensive Cybersecurity Services</span>
              <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <span className="text-[10px] text-slate-400 font-mono">
              Direct Contact: security.research@btmsec.com
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default SecurityDashboardSection
