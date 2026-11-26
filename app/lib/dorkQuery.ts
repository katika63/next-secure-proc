/**
 * Shared utilities for normalising, scoping, and parsing Google Dork queries.
 */

const DOMAIN_REGEX =
  /^(?:https?:\/\/)?([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+)(?:\/.*)?$/i

/**
 * Standardises Google Search operators in a dork query:
 * - Converts standalone pipe `|` operators (outside double-quoted strings) into uppercase `OR`.
 * - Preserves parentheses, quotes, URL paths (e.g. `/canvas`, `/api`), and operators (`site:`, `inurl:`, etc.).
 * - Never interprets `/` as an OR operator.
 */
export function normalizeDorkOperators(query: string): string {
  if (!query) return ''

  let out = ''
  let inQuotes = false

  for (let i = 0; i < query.length; i++) {
    const ch = query[i]

    if (ch === '"') {
      // Respect escaped quotes inside strings if any
      const prev = i > 0 ? query[i - 1] : ''
      if (prev !== '\\') {
        inQuotes = !inQuotes
      }
      out += ch
      continue
    }

    if (!inQuotes && ch === '|') {
      // Trim trailing spaces already written before `|`
      out = out.replace(/[ \t]+$/, '')
      // Add a single leading space unless at start or right after `(`
      if (out.length > 0 && !out.endsWith('(')) {
        out += ' '
      }
      out += 'OR'

      // Skip any spaces immediately following `|`
      let nextIdx = i + 1
      while (nextIdx < query.length && (query[nextIdx] === ' ' || query[nextIdx] === '\t')) {
        nextIdx++
      }
      // Add a single trailing space unless at end or right before `)`
      if (nextIdx < query.length && query[nextIdx] !== ')') {
        out += ' '
      }
      i = nextIdx - 1
      continue
    }

    out += ch
  }

  return out.trim()
}

/**
 * Extracts an optional target domain and remaining search keywords from user input.
 */
export function extractDomainAndKeywords(rawInput: string): {
  domain: string | null
  keywords: string
} {
  const trimmed = rawInput.trim()
  if (!trimmed) return { domain: null, keywords: '' }

  const fullMatch = trimmed.match(DOMAIN_REGEX)
  if (fullMatch) {
    return { domain: fullMatch[1].toLowerCase(), keywords: '' }
  }

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

  return { domain: detectedDomain, keywords: remaining.join(' ').toLowerCase().trim() }
}

/**
 * Applies optional domain scoping (`<target>` replacement or `site:` prefix)
 * and standardises Google Search operators.
 */
export function customizeAndNormalizeQuery(rawQuery: string, domain: string | null): string {
  const normalized = normalizeDorkOperators(rawQuery)
  if (!domain) return normalized

  if (normalized.includes('<target>')) {
    return normalized.replace(/<target>/g, domain)
  }

  if (/\bsite:/i.test(normalized)) {
    return normalized
  }

  return `site:${domain} ${normalized}`
}
