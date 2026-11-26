'use client'

import React from 'react'

export type SearchMode = 'search' | 'generate'

interface DorkSearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (overrideQuery?: string) => void
  onClear: () => void
  loading?: boolean
  appliedDomain?: string | null
  mode: SearchMode
  onModeChange: (mode: SearchMode) => void
}

const SEARCH_EXAMPLES = ['example.com', 'btmsec.com', 'swagger.json', 'ollama', 'env']
const GENERATE_EXAMPLES = ['api key', 'aws secret', 'password', 's3 bucket', 'private key', 'jwt token']

export default function DorkSearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  loading = false,
  appliedDomain,
  mode,
  onModeChange,
}: DorkSearchBarProps) {
  const isGenerate = mode === 'generate'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <div className="bg-[#060d1f]/90 border border-[#1a2f58] rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl shadow-black/40 space-y-4">

      {/* ── Mode Toggle ────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 p-1 bg-[#030812] border border-[#122244] rounded-xl w-fit">
        <button
          type="button"
          onClick={() => onModeChange('search')}
          className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
            !isGenerate
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <i className="fas fa-search text-[10px]" />
          Search Dorks
        </button>
        <button
          type="button"
          onClick={() => onModeChange('generate')}
          className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
            isGenerate
              ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <i className="fas fa-bolt text-[10px]" />
          Generate from Keyword
        </button>
      </div>

      {/* ── Mode Hint ──────────────────────────────────────────────────────── */}
      <p className="text-[11px] font-mono text-slate-500 leading-snug">
        {isGenerate
          ? '⚡ Enter a keyword — the system synthesises targeted dork queries using proven templates and surfaces the top matching dorks from the collection.'
          : '🔍 Enter a domain (example.com) or keyword — the system searches 16,242+ indexed dork queries and scopes results to your target.'}
      </p>

      {/* ── Search Input ───────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <i className={`fas ${isGenerate ? 'fa-bolt text-cyan-500' : 'fa-crosshairs text-blue-400'} text-sm`} />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              isGenerate
                ? 'Enter keyword to generate dorks (e.g. api key, s3 bucket, password)...'
                : 'Enter a domain or search query... (e.g. example.com)'
            }
            className="w-full bg-[#030812]/90 border border-[#1a3060] hover:border-[#2a4a8a] focus:border-blue-500/70 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 font-mono outline-none transition-colors"
          />
          {value && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              aria-label="Clear"
            >
              <i className="fas fa-times text-xs" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-sm font-bold text-white shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
            isGenerate
              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 shadow-cyan-600/25'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-blue-600/25'
          }`}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin text-xs" />
              <span className="hidden sm:inline">Working…</span>
            </>
          ) : isGenerate ? (
            <>
              <i className="fas fa-bolt text-xs" />
              <span className="hidden sm:inline">Generate Dorks</span>
            </>
          ) : (
            <>
              <i className="fas fa-search text-xs" />
              <span className="hidden sm:inline">Find Dorks</span>
            </>
          )}
        </button>
      </form>

      {/* ── Quick Examples ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
        <span className="text-slate-500">Try:</span>
        {(isGenerate ? GENERATE_EXAMPLES : SEARCH_EXAMPLES).map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => {
              onChange(sample)
              onSearch(sample)
            }}
            className={`px-2 py-0.5 rounded border transition-colors ${
              isGenerate
                ? 'bg-cyan-950/30 hover:bg-cyan-950/60 border-cyan-500/25 text-cyan-400 hover:text-cyan-300'
                : 'bg-[#081229] hover:bg-[#0e1f45] border-[#162a52] text-cyan-400 hover:text-cyan-300'
            }`}
          >
            {sample}
          </button>
        ))}
      </div>

      {/* ── Applied Domain Badge ───────────────────────────────────────────── */}
      {appliedDomain && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-[11px]">
          <i className="fas fa-crosshairs text-[10px]" />
          <span>Target scoped: <strong className="text-white">{appliedDomain}</strong></span>
        </div>
      )}
    </div>
  )
}
