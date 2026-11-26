'use client'

import React, { useState } from 'react'
import type { DorkEntry } from '@/app/types/dork'

interface DorkResultCardProps {
  dork: DorkEntry
  isGenerated?: boolean
}

function getRiskBadgeStyle(risk: string): string {
  switch (risk.toLowerCase()) {
    case 'critical':
      return 'bg-rose-950/70 text-rose-300 border-rose-500/50'
    case 'high':
      return 'bg-orange-950/70 text-orange-300 border-orange-500/50'
    case 'medium':
      return 'bg-amber-950/70 text-amber-300 border-amber-500/50'
    case 'low':
      return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
    default:
      return 'bg-blue-950/70 text-blue-300 border-blue-500/40'
  }
}

export default function DorkResultCard({ dork, isGenerated = false }: DorkResultCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dork.query)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback ignored
    }
  }

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(dork.query)}`

  return (
    <div className={`bg-[#070e1e]/90 border rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-md transition-all duration-200 group ${
      isGenerated
        ? 'border-cyan-500/40 hover:border-cyan-400/70 shadow-cyan-500/5'
        : 'border-[#1a2b4c] hover:border-blue-500/50'
    }`}>
      <div className="space-y-3">
        {/* Top Metadata Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-blue-950/60 border border-blue-500/30 text-cyan-300 uppercase tracking-wide">
            {dork.category}
          </span>
          <div className="flex items-center gap-1.5">
            {isGenerated && (
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border bg-cyan-950/60 border-cyan-500/40 text-cyan-300 uppercase tracking-widest flex items-center gap-1">
                <i className="fas fa-bolt text-[8px]" />
                Generated
              </span>
            )}
            {dork.riskLevel && (
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${getRiskBadgeStyle(dork.riskLevel)}`}>
                {dork.riskLevel} Risk
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
            {dork.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
            {dork.description}
          </p>
        </div>

        {/* Query Code Box */}
        <div className="bg-[#030816] border border-[#122240] rounded-xl p-3 font-mono text-xs text-cyan-300 break-all select-all">
          {dork.query}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-[#142344]">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0a1835] hover:bg-[#112654] border border-[#1b315b] text-xs font-mono font-medium text-slate-200 hover:text-white transition-colors"
        >
          <i className={`fas ${copied ? 'fa-check text-emerald-400' : 'fa-copy text-blue-400'} text-[11px]`} />
          <span>{copied ? 'Copied!' : 'Copy Query'}</span>
        </button>

        <a
          href={googleSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-xs font-mono font-semibold text-white shadow-md shadow-blue-600/20 transition-all"
        >
          <i className="fab fa-google text-[11px]" />
          <span>Test on Google</span>
          <i className="fas fa-external-link-alt text-[9px] opacity-80" />
        </a>
      </div>
    </div>
  )
}
