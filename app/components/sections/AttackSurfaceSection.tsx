'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const AttackSurfaceSection = () => {
  const [domain, setDomain] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain.trim()) return
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanned(true)
    }, 1800)
  }

  return (
    <section className="py-16 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="bg-[#070e1e]/90 border border-[#1e2942] rounded-2xl p-8 lg:p-12 shadow-2xl backdrop-blur-xl grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Radial Light */}
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

          {/* Left HUD Radar Graphic (4 Cols) */}
          <div className="lg:col-span-4 flex items-center justify-center relative">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-blue-500/30 flex items-center justify-center bg-[#040914] shadow-2xl shadow-blue-500/10 overflow-hidden">
              
              {/* Concentric Circles */}
              <div className="absolute inset-4 rounded-full border border-blue-500/20" />
              <div className="absolute inset-12 rounded-full border border-blue-500/20" />
              <div className="absolute inset-20 rounded-full border border-blue-500/30" />
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping" />

              {/* Crosshair Lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[1px] bg-blue-500/20" />
                <div className="h-full w-[1px] bg-blue-500/20" />
              </div>

              {/* Rotating Radar Sweep Line */}
              <div className="absolute inset-0 animate-radar pointer-events-none">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-blue-500/40 via-cyan-400/20 to-transparent origin-bottom-right rounded-tl-full" />
              </div>

              {/* Threat Blips */}
              <div className="absolute top-12 left-16 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <div className="absolute bottom-16 right-14 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>
          </div>

          {/* Right Content & Scanner Form (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                EXPOSE YOUR ATTACK SURFACE
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Get a free security assessment of your external attack surface in less than 60 seconds.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter your domain (e.g. example.com)"
                  className="w-full bg-[#040914] border border-[#1e2942] focus:border-blue-500 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm outline-none transition-colors font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={scanning}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/35 transition-all duration-200 shrink-0 disabled:opacity-50"
              >
                {scanning ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Scanning...
                  </>
                ) : (
                  <>
                    Scan Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {scanned && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono max-w-2xl"
              >
                ✓ Initial scan completed for {domain}! Analysis report generated successfully.
              </motion.div>
            )}

            {/* Checklist items matching PNG */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px]">✓</span>
                <span>Identify Exposures</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px]">✓</span>
                <span>Evaluate Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px]">✓</span>
                <span>Get Actionable Insights</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AttackSurfaceSection
