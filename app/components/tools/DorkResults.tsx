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
  limit: number
  totalPages: number
  selectedCategory: string
  selectedRisk: string
  activeQuery: string
  onPageChange: (nextPage: number) => void
  onLimitChange: (nextLimit: number) => void
  onResetFilters: () => void
  onRetry: () => void
  isGenerateMode?: boolean
}

const PAGE_SIZE_OPTIONS = [12, 24, 48]

export default function DorkResults({
  dorks,
  generatedDorks = [],
  loading,
  error,
  totalMatches,
  page,
  limit,
  totalPages,
  selectedCategory,
  selectedRisk,
  activeQuery,
  onPageChange,
  onLimitChange,
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
  const startRange = totalMatches === 0 ? 0 : (page - 1) * limit + 1
  const endRange = Math.min(page * limit, totalMatches)

  if (!hasGenerated && !hasDorks) {
    return (
      <div className="bg-[#050c1e]/80 border border-[#16274a] rounded-2xl p-10 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
          <i className="fas fa-search-minus text-lg" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-white">No Matching Dorks Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            {isGenerateMode
              ? 'Enter a keyword like "api key", "s3 bucket", or "password" and click Generate Dorks, or clear active category/risk filters.'
              : 'No dorks matched your current search terms and active filters. Try broadening your query or resetting filters.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono">
          {selectedCategory !== 'All' && (
            <span className="px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-500/30 text-cyan-300">
              Category: {selectedCategory}
            </span>
          )}
          {selectedRisk !== 'All' && (
            <span className="px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-500/30 text-cyan-300">
              Risk: {selectedRisk}
            </span>
          )}
          {activeQuery && (
            <span className="px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-500/30 text-cyan-300">
              Query: &quot;{activeQuery}&quot;
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-colors"
        >
          Clear Filters &amp; Reset Search
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ── Results Summary Bar ──────────────────────────────────────────── */}
      <div className="bg-[#050c1e]/80 border border-[#16274a] rounded-xl px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2 text-slate-300">
          {isGenerateMode ? (
            <span>
              Showing{' '}
              <strong className="text-cyan-300">{generatedDorks.length}</strong> generated &amp;{' '}
              <strong className="text-white">{dorks.length}</strong> matching collection dorks
            </span>
          ) : (
            <span>
              Showing{' '}
              <strong className="text-white">
                {startRange.toLocaleString()}–{endRange.toLocaleString()}
              </strong>{' '}
              of <strong className="text-cyan-400">{totalMatches.toLocaleString()}</strong> matching dorks
            </span>
          )}

          <span className="text-slate-600 hidden sm:inline">•</span>

          <span className="px-2 py-0.5 rounded bg-[#08132b] border border-[#162a52] text-[11px] text-slate-300">
            Category: <strong className="text-cyan-300">{selectedCategory}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-[#08132b] border border-[#162a52] text-[11px] text-slate-300">
            Risk: <strong className="text-cyan-300">{selectedRisk}</strong>
          </span>
        </div>

        {!isGenerateMode && (
          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px]">Per page:</span>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onLimitChange(size)}
                  className={`px-2 py-0.5 rounded border text-[11px] transition-colors ${
                    limit === size
                      ? 'bg-blue-600/30 border-blue-500/60 text-cyan-300 font-semibold'
                      : 'bg-[#030816] border-[#142344] text-slate-400 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <span className="text-slate-600">•</span>
            <span>
              Page <strong className="text-white">{page}</strong> of{' '}
              <strong className="text-white">{totalPages.toLocaleString()}</strong>
            </span>
          </div>
        )}
      </div>

      {/* ── Generated Dorks Section ──────────────────────────────────────── */}
      {hasGenerated && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
              <i className="fas fa-bolt text-[10px]" />
              <span>{generatedDorks.length} Dynamically Generated Dork Queries</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-cyan-500/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {generatedDorks.map((dork) => (
              <DorkResultCard key={dork.id} dork={dork} isGenerated={true} />
            ))}
          </div>
        </div>
      )}

      {/* ── Matched Collection Dorks Section ─────────────────────────────── */}
      {hasDorks && (
        <div className="space-y-4">
          {hasGenerated && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/40 text-blue-300 text-xs font-mono font-semibold">
                <i className="fas fa-database text-[10px]" />
                <span>Top {dorks.length} Matching Collection Dorks</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-blue-500/40 to-transparent" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {dorks.map((dork) => (
              <DorkResultCard key={dork.id} dork={dork} isGenerated={false} />
            ))}
          </div>

          {/* Pagination — Search mode */}
          {!isGenerateMode && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#122240]">
              <span className="text-xs font-mono text-slate-400">
                Displaying {startRange.toLocaleString()}–{endRange.toLocaleString()} of{' '}
                {totalMatches.toLocaleString()} results
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => onPageChange(page - 1)}
                  className="px-4 py-2 rounded-lg bg-[#050c1e] hover:bg-[#0c1a3a] disabled:opacity-40 disabled:cursor-not-allowed border border-[#1a2b4c] text-xs font-mono text-slate-200 transition-colors"
                >
                  <i className="fas fa-chevron-left mr-1.5 text-[10px]" />
                  Previous
                </button>

                <span className="px-3 py-2 text-xs font-mono text-slate-300">
                  Page <strong className="text-white">{page}</strong> / {totalPages.toLocaleString()}
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
            </div>
          )}
        </div>
      )}
    </div>
  )
}
