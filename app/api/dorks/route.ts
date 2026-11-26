import { NextResponse } from 'next/server'
import dorkDataset from '@/app/data/dorks.json'
import type { DorkCollectionDataset, DorkEntry } from '@/app/types/dork'

const dataset = dorkDataset as DorkCollectionDataset

// Precompute category counts once at module load
const CATEGORY_COUNTS: { name: string; count: number }[] = (() => {
  const map = new Map<string, number>()
  for (const d of dataset.dorks) {
    map.set(d.category, (map.get(d.category) || 0) + 1)
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
})()

const DOMAIN_REGEX = /^(?:https?:\/\/)?([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+)(?:\/.*)?$/i

function extractDomainAndKeywords(rawInput: string): { domain: string | null; keywords: string } {
  const trimmed = rawInput.trim()
  if (!trimmed) return { domain: null, keywords: '' }

  // Check if entire input is a domain or URL
  const fullMatch = trimmed.match(DOMAIN_REGEX)
  if (fullMatch) {
    return { domain: fullMatch[1].toLowerCase(), keywords: '' }
  }

  // Otherwise check if one token is a domain (e.g., "example.com swagger")
  const tokens = trimmed.split(/\s+/)
  let detectedDomain: string | null = null
  const remaining: string[] = []

  for (const token of tokens) {
    const m = token.match(DOMAIN_REGEX)
    if (!detectedDomain && m) {
      detectedDomain = m[1].toLowerCase()
    } else {
      remaining.push(token)
    }
  }

  return { domain: detectedDomain, keywords: remaining.join(' ').toLowerCase() }
}

function customizeQuery(rawQuery: string, domain: string | null): string {
  if (!domain) return rawQuery

  if (rawQuery.includes('<target>')) {
    return rawQuery.replace(/<target>/g, domain)
  }

  if (/\bsite:/i.test(rawQuery)) {
    return rawQuery
  }

  return `site:${domain} ${rawQuery}`
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || 'All'
    const risk = searchParams.get('risk') || 'All'
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)
    const limit = Math.min(60, Math.max(1, parseInt(searchParams.get('limit') || '24', 10) || 24))

    const { domain, keywords } = extractDomainAndKeywords(q)

    const filtered: DorkEntry[] = []
    for (const dork of dataset.dorks) {
      if (category !== 'All' && dork.category !== category) continue
      if (risk !== 'All' && dork.riskLevel.toLowerCase() !== risk.toLowerCase()) continue

      if (keywords) {
        const haystack = `${dork.title} ${dork.category} ${dork.description} ${dork.query}`.toLowerCase()
        const terms = keywords.split(/\s+/).filter(Boolean)
        const matchesAll = terms.every((term) => haystack.includes(term))
        if (!matchesAll) continue
      }

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

    const totalMatches = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalMatches / limit))
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * limit
    const slice = filtered.slice(start, start + limit).map((d) => ({
      ...d,
      query: customizeQuery(d.query, domain),
    }))

    return NextResponse.json({
      dorks: slice,
      totalMatches,
      totalCollection: dataset.total,
      page: safePage,
      limit,
      totalPages,
      appliedDomain: domain,
      categories: CATEGORY_COUNTS,
    })
  } catch (error) {
    console.error('Dork Intelligence API error:', error)
    return NextResponse.json(
      { error: 'Failed to query local Dork Intelligence collection.' },
      { status: 500 }
    )
  }
}
