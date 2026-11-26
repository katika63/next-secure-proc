'use client'

import React from 'react'
import DorkResultCard from './DorkResultCard'
import type { DorkEntry } from '@/app/types/dork'

interface DorkResultsProps {
  dorks: DorkEntry[]
  generatedDorks?: DorkEntry[]
  loading: boolean
  error: string | null
  totalMatches: number
  page: number
  totalPages: number
  onPageChange: (nextPage: number) => void
  onResetFilters: () => void
  onRetry: () => void
  isGenerateMode?: boolean
}

export default function DorkResults({
  dorks,
  generatedDorks = [],
  loading,
  error,
  totalMatches,
  page,
  totalPages,
  onPageChange,
  onResetFilters,
  onRetry,
  isGenerateMode = false,
}: DorkResultsProps) {
  if (error) {
    return (
      <div className="bg-rose-950/30 border border-rose-500/40 rounded-2xl p-8 text-center space-y-3">
        <i className="fas fa-exclamation-triangle text-2xl text-rose-400" />
        <h3 className="text-sm font-bold text-white font-mono">Unable to Load Dork Results</h3>
        <p className="text-xs text-rose-200 max-w-md mx-auto">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-semibold transition-colors"
        >
          Retry Query
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Skeleton loader for generated section placeholder */}
        {isGenerateMode && (
          <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-2xl p-5 animate-pulse space-y-3">
            <div className="h-4 w-48 bg-cyan-900/40 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-[#070e1e]/80 border border-cyan-500/20 rounded-2xl p-5 h-56 animate-pulse flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-cyan-900/30 rounded" />
                      <div className="h-4 w-16 bg-cyan-900/30 rounded" />
                    </div>
                    <div className="h-4 w-3/4 bg-[#0f1d3a] rounded" />
                    <div className="h-3 w-full bg-[#0c1730] rounded" />
                    <div className="h-10 w-full bg-[#050c1e] rounded-xl" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 flex-1 bg-[#0c1730] rounded-lg" />
                    <div className="h-8 flex-1 bg-[#122244] rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#070e1e]/80 border border-[#1a2b4c] rounded-2xl p-5 h-60 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-[#122244] rounded" />
                  <div className="h-4 w-16 bg-[#122244] rounded" />
                </div>
                <div className="h-4 w-3/4 bg-[#0f1d3a] rounded" />
                <div className="h-3 w-full bg-[#0c1730] rounded" />
                <div className="h-12 w-full bg-[#050c1e] rounded-xl" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 flex-1 bg-[#0c1730] rounded-lg" />
                <div className="h-8 flex-1 bg-[#122244] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const hasGenerated = generatedDorks.length > 0
  const hasDorks = dorks.length > 0

  if (!hasGenerated && !hasDorks) {
    return (
      <div className="bg-[#050c1e]/80 border border-[#16274a] rounded-2xl p-10 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
          <i className="fas fa-search-minus text-lg" />
        </div>
        <h3 className="text-base font-bold text-white">No Matching Dorks Found</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {isGenerateMode
            ? 'Enter a keyword like "api key", "s3 bucket", or "password" and click Generate Dorks.'
            : 'Try broadening your search terms, removing restrictive keywords, or switching back to all categories.'}
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* ── Generated Dorks Section ──────────────────────────────────────── */}
      {hasGenerated && (
        <div className="space-y-4">
          {/* Section header */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
              <i className="fas fa-bolt text-[10px]" />
              <span>{generatedDorks.length} Generated Dork Queries</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-cyan-500/50 to-transparent" />
          </div>

          <p className="text-[11px] text-slate-400 font-mono text-center">
            Synthesised from dork templates using your keyword. Each query is ready to copy or test on Google.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {generatedDorks.map((dork) => (
              <DorkResultCard key={dork.id} dork={dork} isGenerated={true} />
            ))}
          </div>
        </div>
      )}

      {/* ── Matched Dorks Section ────────────────────────────────────────── */}
      {hasDorks && (
        <div className="space-y-4">
          {hasGenerated && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/40 text-blue-300 text-xs font-mono font-semibold">
                <i className="fas fa-database text-[10px]" />
                <span>
                  {isGenerateMode
                    ? `Top ${dorks.length} Matching Dorks from Collection`
                    : `${totalMatches.toLocaleString()} Matching Queries`}
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-blue-500/40 to-transparent" />
            </div>
          )}

          {!hasGenerated && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <span>
                Showing <strong className="text-white">{dorks.length}</strong> of{' '}
                <strong className="text-cyan-400">{totalMatches.toLocaleString()}</strong> matching queries
              </span>
              <span>
                Page <strong className="text-white">{page}</strong> of{' '}
                <strong className="text-white">{totalPages.toLocaleString()}</strong>
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dorks.map((dork) => (
              <DorkResultCard key={dork.id} dork={dork} />
            ))}
          </div>

          {/* Pagination — only shown in search mode */}
          {!isGenerateMode && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="px-4 py-2 rounded-lg bg-[#050c1e] hover:bg-[#0c1a3a] disabled:opacity-40 disabled:cursor-not-allowed border border-[#1a2b4c] text-xs font-mono text-slate-200 transition-colors"
              >
                <i className="fas fa-chevron-left mr-1.5 text-[10px]" />
                Previous
              </button>

              <span className="px-3 py-2 text-xs font-mono text-slate-400">
                {page} / {totalPages.toLocaleString()}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="px-4 py-2 rounded-lg bg-[#050c1e] hover:bg-[#0c1a3a] disabled:opacity-40 disabled:cursor-not-allowed border border-[#1a2b4c] text-xs font-mono text-slate-200 transition-colors"
              >
                Next
                <i className="fas fa-chevron-right ml-1.5 text-[10px]" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
