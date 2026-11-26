'use client'

import React from 'react'

export interface CategoryOption {
  name: string
  count: number
}

interface DorkCategoryFilterProps {
  categories: CategoryOption[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  selectedRisk: string
  onSelectRisk: (risk: string) => void
  totalCollection: number
  totalAllCategories?: number
  hasActiveSearch?: boolean
  onClearAllFilters?: () => void
}

const RISK_LEVELS = ['All', 'Critical', 'High', 'Medium', 'Low', 'Informational']

export default function DorkCategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedRisk,
  onSelectRisk,
  totalCollection,
  totalAllCategories,
  hasActiveSearch = false,
  onClearAllFilters,
}: DorkCategoryFilterProps) {
  const hasFilter = selectedCategory !== 'All' || selectedRisk !== 'All' || hasActiveSearch
  const allCategoryTotal = totalAllCategories !== undefined ? totalAllCategories : totalCollection

  return (
    <div className="space-y-4">
      {/* Risk Classification Filter + Active Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1">
            Risk Level:
          </span>
          {RISK_LEVELS.map((risk) => {
            const active = selectedRisk === risk
            return (
              <button
                key={risk}
                type="button"
                onClick={() => onSelectRisk(risk)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                  active
                    ? 'bg-blue-600/25 border-blue-500/60 text-cyan-300 font-semibold shadow-sm shadow-blue-500/20'
                    : 'bg-[#050c1e]/80 border-[#16274a] text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                {risk}
              </button>
            )
          })}
        </div>

        {hasFilter && onClearAllFilters && (
          <button
            type="button"
            onClick={onClearAllFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-950/70 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-mono transition-colors"
          >
            <i className="fas fa-times-circle text-[11px]" />
            <span>Clear All Filters</span>
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="bg-[#050c1e]/80 border border-[#16274a] rounded-xl p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Intelligence Categories ({categories.length})
          </span>
          <div className="flex items-center gap-3">
            {selectedCategory !== 'All' && (
              <button
                type="button"
                onClick={() => onSelectCategory('All')}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                Reset Category
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onSelectCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border flex items-center gap-1.5 ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-400/50 text-white font-semibold shadow-md shadow-blue-600/20'
                : 'bg-[#030816] border-[#142344] text-slate-300 hover:text-white hover:border-blue-500/40'
            }`}
          >
            <span>All Dorks</span>
            <span className="text-[10px] opacity-80">({allCategoryTotal.toLocaleString()})</span>
          </button>

          {categories.map((cat) => {
            const active = selectedCategory === cat.name
            const isEmpty = cat.count === 0
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border flex items-center gap-1.5 ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-400/50 text-white font-semibold shadow-md shadow-blue-600/20'
                    : isEmpty
                    ? 'bg-[#030816]/50 border-[#101c36] text-slate-500 hover:text-slate-300 hover:border-slate-700'
                    : 'bg-[#030816] border-[#142344] text-slate-300 hover:text-white hover:border-blue-500/40'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75">({cat.count.toLocaleString()})</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
