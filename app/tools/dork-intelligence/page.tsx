'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import DorkSearchBar, { type SearchMode } from '@/app/components/tools/DorkSearchBar'
import DorkCategoryFilter, { type CategoryOption } from '@/app/components/tools/DorkCategoryFilter'
import DorkResults from '@/app/components/tools/DorkResults'
import type { DorkEntry } from '@/app/types/dork'

interface DorkApiResponse {
  dorks: DorkEntry[]
  totalMatches: number
  totalMatchingAllCategories?: number
  totalCollection: number
  page: number
  limit: number
  totalPages: number
  appliedDomain: string | null
  categories: CategoryOption[]
}

interface GenerateApiResponse {
  generated: DorkEntry[]
  matched: DorkEntry[]
  keyword: string
  domain: string | null
  totalGenerated: number
  totalMatched: number
}

export default function DorkIntelligencePage() {
  const [mode, setMode] = useState<SearchMode>('search')
  const [searchInput, setSearchInput] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRisk, setSelectedRisk] = useState('All')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(24)

  const [dorks, setDorks] = useState<DorkEntry[]>([])
  const [generatedDorks, setGeneratedDorks] = useState<DorkEntry[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [totalMatches, setTotalMatches] = useState(0)
  const [totalAllCategories, setTotalAllCategories] = useState<number | undefined>(undefined)
  const [totalCollection, setTotalCollection] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [appliedDomain, setAppliedDomain] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSearchDorks = useCallback(
    async (queryToRun: string, category: string, risk: string, targetPage: number, pageSize: number) => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          q: queryToRun,
          category,
          risk,
          page: String(targetPage),
          limit: String(pageSize),
        })

        const res = await fetch(`/api/dorks?${params.toString()}`)
        const data: DorkApiResponse & { error?: string } = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Failed to retrieve dork collection.')
        }

        setDorks(data.dorks || [])
        setGeneratedDorks([])
        setCategories(data.categories || [])
        setTotalMatches(data.totalMatches || 0)
        setTotalAllCategories(data.totalMatchingAllCategories)
        setTotalCollection(data.totalCollection || 0)
        setTotalPages(data.totalPages || 1)
        setAppliedDomain(data.appliedDomain || null)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Unexpected error querying dorks.'
        setError(msg)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const fetchGeneratedDorks = useCallback(async (queryToRun: string) => {
    const trimmed = queryToRun.trim()
    if (!trimmed) {
      setGeneratedDorks([])
      setDorks([])
      setTotalMatches(0)
      setAppliedDomain(null)
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ q: trimmed })
      const res = await fetch(`/api/dorks/generate?${params.toString()}`)
      const data: GenerateApiResponse & { error?: string } = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate dork queries.')
      }

      setGeneratedDorks(data.generated || [])
      setDorks(data.matched || [])
      setTotalMatches(data.totalMatched || 0)
      setTotalPages(1)
      setAppliedDomain(data.domain || null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unexpected error generating dorks.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (mode === 'search') {
      fetchSearchDorks(activeQuery, selectedCategory, selectedRisk, page, limit)
    } else {
      fetchGeneratedDorks(activeQuery)
    }
  }, [mode, activeQuery, selectedCategory, selectedRisk, page, limit, fetchSearchDorks, fetchGeneratedDorks])

  const filteredGeneratedDorks = useMemo(() => {
    if (mode !== 'generate') return []
    return generatedDorks.filter((d) => {
      if (selectedCategory !== 'All' && d.category !== selectedCategory) return false
      if (selectedRisk !== 'All' && d.riskLevel.toLowerCase() !== selectedRisk.toLowerCase()) return false
      return true
    })
  }, [mode, generatedDorks, selectedCategory, selectedRisk])

  const filteredMatchedDorks = useMemo(() => {
    if (mode !== 'generate') return dorks
    return dorks.filter((d) => {
      if (selectedCategory !== 'All' && d.category !== selectedCategory) return false
      if (selectedRisk !== 'All' && d.riskLevel.toLowerCase() !== selectedRisk.toLowerCase()) return false
      return true
    })
  }, [mode, dorks, selectedCategory, selectedRisk])

  const handleModeChange = (nextMode: SearchMode) => {
    if (nextMode === mode) return
    setMode(nextMode)
    setPage(1)
    setError(null)
  }

  const handleSearch = (overrideQuery?: string) => {
    const nextQuery = overrideQuery !== undefined ? overrideQuery : searchInput
    setPage(1)
    setActiveQuery(nextQuery.trim())
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setActiveQuery('')
    setPage(1)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setPage(1)
  }

  const handleRiskSelect = (risk: string) => {
    setSelectedRisk(risk)
    setPage(1)
  }

  const handleLimitChange = (nextLimit: number) => {
    setLimit(nextLimit)
    setPage(1)
  }

  const handleResetFilters = () => {
    setSearchInput('')
    setActiveQuery('')
    setSelectedCategory('All')
    setSelectedRisk('All')
    setPage(1)
  }

  return (
    <main className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 bg-transparent relative z-10">
      {/* Subtle Ambient Lighting */}
      <div className="fixed top-24 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed bottom-12 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* ─── HEADER HERO ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
              <i className="fas fa-terminal text-xs" />
              <span>BTM Security • OSINT &amp; Reconnaissance Suite</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071229] border border-[#1a2e57] text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                <strong className="text-white">{totalCollection ? totalCollection.toLocaleString() : '16,242'}</strong> Local Dorks Indexed
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Dork <span className="gradient-text">Intelligence</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Google Dork Search and Intelligence for Security Research.
            </p>
          </div>
        </motion.div>

        {/* ─── SEARCH BAR ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <DorkSearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
            onClear={handleClearSearch}
            loading={loading}
            appliedDomain={appliedDomain}
            mode={mode}
            onModeChange={handleModeChange}
          />
        </motion.div>

        {/* ─── CATEGORY & RISK FILTERS ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <DorkCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            selectedRisk={selectedRisk}
            onSelectRisk={handleRiskSelect}
            totalCollection={totalCollection}
            totalAllCategories={mode === 'search' ? totalAllCategories : undefined}
            hasActiveSearch={Boolean(activeQuery)}
            onClearAllFilters={handleResetFilters}
          />
        </motion.div>

        {/* ─── RESULTS GRID ─────────────────────────────────────────────────────── */}
        <DorkResults
          dorks={filteredMatchedDorks}
          generatedDorks={filteredGeneratedDorks}
          loading={loading}
          error={error}
          totalMatches={mode === 'generate' ? filteredMatchedDorks.length : totalMatches}
          page={page}
          limit={limit}
          totalPages={totalPages}
          selectedCategory={selectedCategory}
          selectedRisk={selectedRisk}
          activeQuery={activeQuery}
          onPageChange={(nextPage) => {
            setPage(nextPage)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onLimitChange={handleLimitChange}
          onResetFilters={handleResetFilters}
          onRetry={() =>
            mode === 'search'
              ? fetchSearchDorks(activeQuery, selectedCategory, selectedRisk, page, limit)
              : fetchGeneratedDorks(activeQuery)
          }
          isGenerateMode={mode === 'generate'}
        />

        {/* ─── RESPONSIBLE DISCLOSURE / AUTHORIZED USE NOTICE ─────────────────── */}
        <div className="bg-[#050c1e]/70 border border-[#16274a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2.5">
            <i className="fas fa-shield-alt text-blue-400 text-sm shrink-0" />
            <span>
              Intended for authorized security assessments, OSINT research, and defensive attack-surface auditing only.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 shrink-0">
            Powered by SecOps Google Dork Collection
          </span>
        </div>
      </div>
    </main>
  )
}
