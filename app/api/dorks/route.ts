import { NextResponse } from 'next/server'
import dorkDataset from '@/app/data/dorks.json'
import type { DorkCollectionDataset, DorkEntry } from '@/app/types/dork'
import { extractDomainAndKeywords, customizeAndNormalizeQuery } from '@/app/lib/dorkQuery'

const dataset = dorkDataset as DorkCollectionDataset

// Precompute sorted list of all category names once at module load
const ALL_CATEGORIES: string[] = (() => {
  const set = new Set<string>()
  for (const d of dataset.dorks) {
    set.add(d.category)
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b))
})()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || 'All'
    const risk = searchParams.get('risk') || 'All'
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)
    const limit = Math.min(60, Math.max(1, parseInt(searchParams.get('limit') || '24', 10) || 24))

    const { domain, keywords } = extractDomainAndKeywords(q)
    const terms = keywords ? keywords.split(/\s+/).filter(Boolean) : []

    // First filter by search terms and risk so category counts are accurate for the active query + risk
    const categoryCountMap = new Map<string, number>()
    for (const catName of ALL_CATEGORIES) {
      categoryCountMap.set(catName, 0)
    }

    const filtered: DorkEntry[] = []
    let totalMatchingAllCategories = 0

    for (const dork of dataset.dorks) {
      if (risk !== 'All' && dork.riskLevel.toLowerCase() !== risk.toLowerCase()) continue

      if (terms.length > 0) {
        const haystack = `${dork.title} ${dork.category} ${dork.description} ${dork.query}`.toLowerCase()
        const matchesAll = terms.every((term) => haystack.includes(term))
        if (!matchesAll) continue
      }

      totalMatchingAllCategories++
      categoryCountMap.set(dork.category, (categoryCountMap.get(dork.category) || 0) + 1)

      if (category !== 'All' && dork.category !== category) continue
      filtered.push(dork)
    }

    // If user entered a domain without keywords, prioritize domain-targeted dorks (<target>) first
    if (domain && !keywords) {
      filtered.sort((a, b) => {
        const aHasTarget = a.query.includes('<target>') ? 0 : 1
        const bHasTarget = b.query.includes('<target>') ? 0 : 1
        return aHasTarget - bHasTarget
      })
    }

    const categories = ALL_CATEGORIES.map((name) => ({
      name,
      count: categoryCountMap.get(name) || 0,
    }))

    const totalMatches = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalMatches / limit))
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * limit
    const slice = filtered.slice(start, start + limit).map((d) => ({
      ...d,
      query: customizeAndNormalizeQuery(d.query, domain),
    }))

    return NextResponse.json({
      dorks: slice,
      totalMatches,
      totalMatchingAllCategories,
      totalCollection: dataset.total,
      page: safePage,
      limit,
      totalPages,
      appliedDomain: domain,
      categories,
    })
  } catch (error) {
    console.error('Dork Intelligence API error:', error)
    return NextResponse.json(
      { error: 'Failed to query local Dork Intelligence collection.' },
      { status: 500 }
    )
  }
}
