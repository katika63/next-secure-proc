'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface ExposureItem {
  id: string
  category: 'Transport' | 'Email' | 'Headers' | 'Perimeter'
  title: string
  status: 'passed' | 'warning' | 'critical' | 'info'
  description: string
}

interface ScanResult {
  domain: string
  scannedAt: string
  score: number
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
  riskLevel: 'Minimal' | 'Low' | 'Moderate' | 'Elevated' | 'High'
  network: {
    ip: string
    hostOrg: string
    country: string
    hasMx: boolean
    mxHosts: string[]
  }
  securityProfile: {
    httpsOk: boolean
    hsts: boolean
    hasSpf: boolean
    hasDmarc: boolean
    dmarcPolicy: string
    csp: boolean
    xFrameOptions: boolean
    xContentTypeOptions: boolean
    serverBanner: string
  }
  exposures: ExposureItem[]
}

const QUICK_EXAMPLES = ['btmsec.com', 'github.com', 'cloudflare.com']

const AUDIT_VECTORS = [
  {
    step: '01',
    layer: 'DNS & Edge Infrastructure',
    icon: 'fas fa-network-wired',
    iconColor: 'text-cyan-400',
    description: 'Authoritative nameservers, A/AAAA resolution & hosting ASN'
  },
  {
    step: '02',
    layer: 'Transport Layer Security',
    icon: 'fas fa-lock',
    iconColor: 'text-blue-400',
    description: 'HTTPS enforcement, TLS 1.3 & HSTS header preloading'
  },
  {
    step: '03',
    layer: 'Email Anti-Spoofing Defense',
    icon: 'fas fa-envelope-shield',
    iconColor: 'text-emerald-400',
    description: 'DMARC policy enforcement, SPF records & MX routing'
  },
  {
    step: '04',
    layer: 'Defensive HTTP Headers',
    icon: 'fas fa-shield-halved',
    iconColor: 'text-indigo-400',
    description: 'Content-Security-Policy (CSP) & X-Frame Clickjacking guard'
  }
]

export default function AttackSurfaceSection() {
  const [domain, setDomain] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanStep, setScanStep] = useState('')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleScan = async (e?: React.FormEvent, targetDomain?: string) => {
    if (e) e.preventDefault()
    const domainToScan = (targetDomain || domain).trim()

    if (!domainToScan) {
      setError('Please enter a domain name to evaluate.')
      return
    }

    setScanning(true)
    setError(null)
    setResult(null)
    setCopied(false)

    // Progress updates reflecting genuine audit phases
    setScanStep('Resolving authoritative DNS records & IP infrastructure...')
    const stepTimer1 = setTimeout(() => {
      setScanStep('Auditing TLS transport configuration & HSTS enforcement...')
    }, 800)
    const stepTimer2 = setTimeout(() => {
      setScanStep('Evaluating DMARC/SPF email spoofing policy & headers...')
    }, 1600)

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: domainToScan }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to scan attack surface. Please try again.')
      }

      setResult(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to complete external scan.'
      setError(message)
    } finally {
      clearTimeout(stepTimer1)
      clearTimeout(stepTimer2)
      setScanning(false)
      setScanStep('')
    }
  }

  const handleCopyReport = () => {
    if (!result) return
    const reportText = `[BTM SECURITY - EXTERNAL PERIMETER RECONNAISSANCE REPORT]
Target: ${result.domain}
Security Score: ${result.score}/100 (Grade ${result.grade})
Risk Level: ${result.riskLevel} Exposure
Primary IP: ${result.network.ip} (${result.network.hostOrg}, ${result.network.country})
HTTPS Active: ${result.securityProfile.httpsOk ? 'YES' : 'NO'}
HSTS Enforcement: ${result.securityProfile.hsts ? 'PASS' : 'FAIL'}
DMARC Policy: ${result.securityProfile.hasDmarc ? result.securityProfile.dmarcPolicy.toUpperCase() : 'MISSING'}
SPF Record: ${result.securityProfile.hasSpf ? 'CONFIGURED' : 'MISSING'}
CSP Header: ${result.securityProfile.csp ? 'PRESENT' : 'MISSING'}
X-Frame-Options: ${result.securityProfile.xFrameOptions ? 'PROTECTED' : 'MISSING'}

Exposures Detected (${result.exposures.length}):
${result.exposures.map((e) => `• [${e.status.toUpperCase()}] ${e.title}: ${e.description}`).join('\n')}

Generated at: ${new Date(result.scannedAt).toUTCString()}
Assessment by BTM Security: https://www.btmsec.com`

    navigator.clipboard.writeText(reportText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40'
    if (score >= 70) return 'text-blue-400 border-blue-500/40 bg-blue-950/40'
    if (score >= 55) return 'text-amber-400 border-amber-500/40 bg-amber-950/40'
    return 'text-rose-400 border-rose-500/40 bg-rose-950/40'
  }

  const getStatusBadge = (status: ExposureItem['status']) => {
    switch (status) {
      case 'passed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <i className="fas fa-check text-[9px]" /> PASS
          </span>
        )
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-950/60 border border-amber-500/40 text-amber-400">
            <i className="fas fa-exclamation-triangle text-[9px]" /> WARNING
          </span>
        )
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-950/60 border border-rose-500/40 text-rose-400">
            <i className="fas fa-times-circle text-[9px]" /> CRITICAL
          </span>
        )
      case 'info':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-950/60 border border-blue-500/40 text-blue-400">
            <i className="fas fa-info-circle text-[9px]" /> INFO
          </span>
        )
    }
  }

  return (
    <section aria-labelledby="recon-heading" className="py-12 lg:py-20 px-3 sm:px-6 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="bg-[#050c1e]/90 border border-[#1e2e50] rounded-2xl p-4 sm:p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle Ambient Lighting */}
          <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch relative z-10">
            
            {/* ─── LEFT: PERIMETER ARCHITECTURE MATRIX (5 Cols) ─────────────────────────── */}
            <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-6 rounded-xl bg-[#030816] border border-[#16274a] space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#16274a]">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-layer-group text-xs text-cyan-400" />
                    <span className="text-xs font-bold font-mono tracking-wider text-slate-200 uppercase">
                      AUDIT LAYER MATRIX
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    scanning 
                      ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300' 
                      : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                  }`}>
                    {scanning ? 'PROBING LAYERS' : 'SYSTEM READY'}
                  </span>
                </div>

                {/* 4 Architectural Inspection Layers */}
                <div className="space-y-3 mt-4">
                  {AUDIT_VECTORS.map((vec, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        scanning 
                          ? 'bg-[#060e22] border-blue-500/30' 
                          : 'bg-[#050b1a] border-[#13223f] hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-mono text-slate-500 font-bold">{vec.step}</span>
                          <i className={`${vec.icon} ${vec.iconColor} text-xs`} />
                          <span className="text-xs font-semibold text-slate-200 font-mono">{vec.layer}</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">
                          {scanning ? 'Auditing' : 'Standard'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-6 leading-relaxed">
                        {vec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Telemetry Standard Note */}
              <div className="pt-3 border-t border-[#16274a] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <i className="fas fa-shield-alt text-emerald-400 text-xs" />
                  <span>Non-Intrusive Passive Probe</span>
                </span>
                <span className="text-slate-500">Zero Risk to Production</span>
              </div>
            </div>

            {/* ─── RIGHT: RECONNAISSANCE SCANNER INTERFACE (7 Cols) ─────────────────────── */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
                  <i className="fas fa-satellite-dish text-xs" />
                  <span>Real-Time Reconnaissance Engine</span>
                </div>
                
                <h2 id="recon-heading" className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  EXTERNAL PERIMETER RISK ASSESSMENT
                </h2>
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Perform an instant, non-intrusive diagnostic of any public domain. We evaluate authoritative DNS resolution, TLS/HSTS transport encryption, email spoofing defense (DMARC/SPF), and exposed HTTP security headers.
                </p>
              </div>

              {/* Scanner Input Form */}
              <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <i className="fas fa-globe text-sm" />
                  </div>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => {
                      setDomain(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="Enter domain (e.g. yourcompany.com)"
                    disabled={scanning}
                    className="w-full bg-[#030816] border border-[#1a2d52] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-base sm:text-sm outline-none transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={scanning || !domain.trim()}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 shrink-0 font-mono w-full sm:w-auto"
                >
                  {scanning ? (
                    <>
                      <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Auditing...</span>
                    </>
                  ) : (
                    <>
                      <span>Run Diagnostic</span>
                      <i className="fas fa-arrow-right text-xs" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Try Suggestions */}
              {!scanning && !result && (
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>Try sample:</span>
                  {QUICK_EXAMPLES.map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => {
                        setDomain(sample)
                        handleScan(undefined, sample)
                      }}
                      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              )}

              {/* Scanning Active Status Box */}
              {scanning && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#0a1835] border border-blue-500/40 rounded-xl text-cyan-300 text-xs font-mono flex items-center gap-3 shadow-lg"
                >
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white">Reconnaissance in progress...</div>
                    <div className="text-[11px] text-cyan-400">{scanStep}</div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-mono flex items-center gap-2"
                >
                  <i className="fas fa-exclamation-circle text-rose-400 text-sm shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Feature Checklist (shown before scan) */}
              {!result && (
                <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300 font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-600/20 text-cyan-400 flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    <span>Identify Open Perimeter Exposures</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-600/20 text-cyan-400 flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    <span>Audit DMARC &amp; SPF Email Spoofing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-600/20 text-cyan-400 flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    <span>TLS 1.3 &amp; HSTS Transport Hardening</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-600/20 text-cyan-400 flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    <span>OWASP &amp; NIST Aligned Guidance</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* ─── LIVE AUDIT RESULTS DASHBOARD ────────────────────────────────────────── */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4 }}
                className="mt-10 pt-8 border-t border-[#192b4d] space-y-6"
              >
                {/* Target & Score Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl bg-[#030816] border border-[#142344]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <h3 className="text-lg font-bold text-white font-mono">{result.domain}</h3>
                      <span className="text-xs text-slate-400 font-mono">
                        ({result.network.ip} • {result.network.hostOrg})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Scanned at {new Date(result.scannedAt).toLocaleTimeString()} • Hosted in {result.network.country}
                    </p>
                  </div>

                  {/* Score & Grade Display */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-4 py-2 rounded-xl border font-mono font-bold text-center ${getScoreColor(
                        result.score
                      )}`}
                    >
                      <div className="text-2xl leading-none">{result.score}</div>
                      <div className="text-[10px] tracking-wider uppercase opacity-80">Score / 100</div>
                    </div>
                    <div
                      className={`px-3 py-2 rounded-xl border font-mono text-center ${getScoreColor(
                        result.score
                      )}`}
                    >
                      <div className="text-2xl font-bold leading-none">{result.grade}</div>
                      <div className="text-[10px] tracking-wider uppercase opacity-80">{result.riskLevel} Risk</div>
                    </div>
                  </div>
                </div>

                {/* 4 Core Security Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Pillar 1: Transport */}
                  <div className="p-4 rounded-xl bg-[#030917] border border-[#132344] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 uppercase font-mono">TLS &amp; Transport</span>
                      {result.securityProfile.httpsOk ? (
                        <span className="text-xs text-emerald-400 font-mono font-semibold">Active</span>
                      ) : (
                        <span className="text-xs text-rose-400 font-mono font-semibold">Failed</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>HTTPS:</span>
                        <span className={result.securityProfile.httpsOk ? 'text-emerald-400' : 'text-rose-400'}>
                          {result.securityProfile.httpsOk ? 'Encrypted' : 'Insecure'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>HSTS:</span>
                        <span className={result.securityProfile.hsts ? 'text-emerald-400' : 'text-amber-400'}>
                          {result.securityProfile.hsts ? 'Enforced' : 'Missing'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 2: Email Spoofing */}
                  <div className="p-4 rounded-xl bg-[#030917] border border-[#132344] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 uppercase font-mono">Email Anti-Spoof</span>
                      {result.securityProfile.hasDmarc && result.securityProfile.dmarcPolicy !== 'none' ? (
                        <span className="text-xs text-emerald-400 font-mono font-semibold">Protected</span>
                      ) : (
                        <span className="text-xs text-amber-400 font-mono font-semibold">Vulnerable</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>DMARC:</span>
                        <span className={result.securityProfile.hasDmarc ? 'text-emerald-400' : 'text-rose-400'}>
                          {result.securityProfile.hasDmarc ? result.securityProfile.dmarcPolicy.toUpperCase() : 'None'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>SPF Record:</span>
                        <span className={result.securityProfile.hasSpf ? 'text-emerald-400' : 'text-amber-400'}>
                          {result.securityProfile.hasSpf ? 'Valid' : 'Missing'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 3: Security Headers */}
                  <div className="p-4 rounded-xl bg-[#030917] border border-[#132344] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 uppercase font-mono">Security Headers</span>
                      {result.securityProfile.csp && result.securityProfile.xFrameOptions ? (
                        <span className="text-xs text-emerald-400 font-mono font-semibold">Hardened</span>
                      ) : (
                        <span className="text-xs text-amber-400 font-mono font-semibold">Partial</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>CSP Policy:</span>
                        <span className={result.securityProfile.csp ? 'text-emerald-400' : 'text-amber-400'}>
                          {result.securityProfile.csp ? 'Present' : 'Missing'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frame Guard:</span>
                        <span className={result.securityProfile.xFrameOptions ? 'text-emerald-400' : 'text-amber-400'}>
                          {result.securityProfile.xFrameOptions ? 'Protected' : 'Missing'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 4: Perimeter & Host */}
                  <div className="p-4 rounded-xl bg-[#030917] border border-[#132344] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 uppercase font-mono">Perimeter Disclosure</span>
                      {result.securityProfile.serverBanner ? (
                        <span className="text-xs text-amber-400 font-mono font-semibold">Broadcast</span>
                      ) : (
                        <span className="text-xs text-emerald-400 font-mono font-semibold">Masked</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>Server Banner:</span>
                        <span className="text-slate-300 truncate max-w-[110px]" title={result.securityProfile.serverBanner}>
                          {result.securityProfile.serverBanner || 'Hidden'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>MX Routing:</span>
                        <span className="text-slate-300">
                          {result.network.hasMx ? 'Active' : 'No Mail'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exposures & Remediation List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase font-mono text-slate-300 tracking-wider">
                      Audit Findings &amp; Technical Exposures ({result.exposures.length})
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Evaluated against OWASP &amp; NIST Guidelines
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {result.exposures.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-[#020612] border border-[#122240] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{item.title}</span>
                            <span className="text-[10px] text-slate-500 font-mono">[{item.category}]</span>
                          </div>
                          <p className="text-slate-400 leading-normal">{item.description}</p>
                        </div>
                        <div className="shrink-0">{getStatusBadge(item.status)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversion & Action Bar */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900/30 via-[#07132b] to-[#030917] border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white">Need In-Depth Penetration Testing &amp; Vulnerability Remediation?</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Our certified offensive security engineers perform comprehensive manual penetration tests, cloud security audits, and zero-day threat simulations.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleCopyReport}
                      className="w-full sm:w-auto px-4 py-3 sm:py-2.5 text-xs font-medium rounded-lg bg-[#0a1835] hover:bg-[#102450] text-slate-300 hover:text-white border border-[#1b315b] transition-colors flex items-center justify-center gap-1.5 font-mono"
                    >
                      <i className={copied ? 'fas fa-check text-emerald-400' : 'fas fa-copy'} />
                      <span>{copied ? 'Copied Telemetry!' : 'Copy Telemetry Report'}</span>
                    </button>

                    <Link
                      href={`/contact?service=Penetration+Testing&domain=${encodeURIComponent(result.domain)}`}
                      className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <span>Request Full Pentest</span>
                      <i className="fas fa-arrow-right text-[10px]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
