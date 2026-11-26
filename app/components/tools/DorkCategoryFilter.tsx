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
}

const RISK_LEVELS = ['All', 'Critical', 'High', 'Medium', 'Low', 'Informational']

export default function DorkCategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedRisk,
  onSelectRisk,
  totalCollection,
}: DorkCategoryFilterProps) {
  return (
    <div className="space-y-4">
      {/* Risk Classification Filter */}
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

      {/* Category Filter Pills */}
      <div className="bg-[#050c1e]/80 border border-[#16274a] rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Intelligence Categories ({categories.length})
          </span>
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
            <span className="text-[10px] opacity-80">({totalCollection.toLocaleString()})</span>
          </button>

          {categories.map((cat) => {
            const active = selectedCategory === cat.name
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border flex items-center gap-1.5 ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-400/50 text-white font-semibold shadow-md shadow-blue-600/20'
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
