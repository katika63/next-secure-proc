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
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const [expanded, setExpanded] = useState(false)

  const hasLongDescription = (dork.description?.length || 0) > 135

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(dork.query)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = dork.query
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(textarea)
        if (!ok) throw new Error('Copy command failed')
      }
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 2500)
    }
  }

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(dork.query)}`

  return (
    <article
      className={`h-full bg-[#070e1e]/90 border rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-md transition-all duration-200 group ${
        isGenerated
          ? 'border-cyan-500/40 hover:border-cyan-400/70 hover:shadow-cyan-500/10'
          : 'border-[#1a2b4c] hover:border-blue-500/50 hover:shadow-blue-500/10'
      }`}
    >
      <div className="space-y-3.5 flex-1 flex flex-col">
        {/* Top Metadata Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-500/30 text-cyan-300 uppercase tracking-wide">
            {dork.category}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {isGenerated ? (
              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-md border bg-cyan-950/60 border-cyan-500/40 text-cyan-300 uppercase tracking-wider inline-flex items-center gap-1">
                <i className="fas fa-bolt text-[9px]" />
                Generated
              </span>
            ) : (
              <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded-md border bg-slate-900/70 border-slate-700/70 text-slate-300 uppercase tracking-wider inline-flex items-center gap-1">
                <i className="fas fa-database text-[9px] text-blue-400" />
                Collection
              </span>
            )}
            {dork.riskLevel && (
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider ${getRiskBadgeStyle(
                  dork.riskLevel
                )}`}
              >
                {dork.riskLevel} Risk
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug break-words">
            {dork.title}
          </h3>
          {dork.description && (
            <div>
              <p
                className={`text-xs text-slate-300/90 leading-relaxed ${
                  expanded ? '' : 'line-clamp-3'
                }`}
              >
                {dork.description}
              </p>
              {hasLongDescription && (
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="mt-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>{expanded ? 'Show less' : 'Read full description'}</span>
                  <i className={`fas fa-chevron-${expanded ? 'up' : 'down'} text-[9px]`} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Query Code Box — wraps only at natural spaces, scrolls horizontally for long unbroken tokens */}
        <div className="mt-auto pt-1">
          <div className="bg-[#030816] border border-[#122240] rounded-xl p-3 font-mono text-xs text-cyan-300 leading-relaxed whitespace-pre-wrap break-normal overflow-x-auto select-all">
            {dork.query}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-[#142344]">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-mono font-medium transition-colors ${
            copyState === 'copied'
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              : copyState === 'error'
              ? 'bg-rose-950/60 border-rose-500/50 text-rose-300'
              : 'bg-[#0a1835] hover:bg-[#112654] border-[#1b315b] text-slate-200 hover:text-white'
          }`}
        >
          <i
            className={`fas ${
              copyState === 'copied'
                ? 'fa-check text-emerald-400'
                : copyState === 'error'
                ? 'fa-exclamation-circle text-rose-400'
                : 'fa-copy text-blue-400'
            } text-[11px]`}
          />
          <span>
            {copyState === 'copied'
              ? 'Copied!'
              : copyState === 'error'
              ? 'Copy Failed'
              : 'Copy Query'}
          </span>
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
    </article>
  )
}
