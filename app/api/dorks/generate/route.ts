import { NextResponse } from 'next/server'
import dorkDataset from '@/app/data/dorks.json'
import type { DorkCollectionDataset, DorkEntry } from '@/app/types/dork'

const dataset = dorkDataset as DorkCollectionDataset

// ─── Dork Template Patterns ────────────────────────────────────────────────
// {KW} is replaced with the user's keyword; {DOMAIN} with the target domain.
// Templates cover common OSINT patterns used in real-world security audits.

interface DorkTemplate {
  id: string
  pattern: string
  title: string
  description: string
  category: string
  riskLevel: string
}

const DORK_TEMPLATES: DorkTemplate[] = [
  // Exposed files / configs
  {
    id: 'gen-filetype-env',
    pattern: 'filetype:env "{KW}"',
    title: 'Exposed .env file containing keyword',
    description: 'Finds publicly indexed .env files that contain the specified keyword — common source of leaked credentials.',
    category: 'Sensitive Files',
    riskLevel: 'Critical',
  },
  {
    id: 'gen-filetype-sql',
    pattern: 'filetype:sql "{KW}"',
    title: 'SQL dump containing keyword',
    description: 'Searches for publicly accessible SQL database dumps that reference the keyword.',
    category: 'Sensitive Files',
    riskLevel: 'Critical',
  },
  {
    id: 'gen-filetype-log',
    pattern: 'filetype:log "{KW}"',
    title: 'Log file leaking keyword',
    description: 'Looks for publicly exposed log files that contain the specified keyword — may reveal stack traces, tokens or PII.',
    category: 'Sensitive Files',
    riskLevel: 'High',
  },
  {
    id: 'gen-filetype-json',
    pattern: 'ext:json intext:"{KW}"',
    title: 'JSON file with keyword',
    description: 'Finds indexed JSON files (APIs, configs, dumps) that expose the keyword in their body.',
    category: 'Sensitive Files',
    riskLevel: 'High',
  },
  {
    id: 'gen-filetype-xml',
    pattern: 'ext:xml intext:"{KW}"',
    title: 'XML file with keyword',
    description: 'Discovers XML configuration or data files that contain the specified keyword.',
    category: 'Sensitive Files',
    riskLevel: 'Medium',
  },
  {
    id: 'gen-filetype-yaml',
    pattern: 'ext:yml OR ext:yaml intext:"{KW}"',
    title: 'YAML config exposing keyword',
    description: 'Finds YAML configuration files (CI/CD, Kubernetes, Docker Compose) that reference the keyword.',
    category: 'Sensitive Files',
    riskLevel: 'High',
  },
  {
    id: 'gen-filetype-txt',
    pattern: 'filetype:txt "{KW}" password OR secret OR token',
    title: 'Text file — keyword near secrets',
    description: 'Searches for plain-text files where the keyword appears alongside common secret indicators.',
    category: 'Sensitive Files',
    riskLevel: 'High',
  },
  // Index / directory listing
  {
    id: 'gen-index-of',
    pattern: 'intitle:"index of" "{KW}"',
    title: 'Directory listing exposing keyword',
    description: 'Finds open directory indexes where the keyword appears — indicates unprotected server paths.',
    category: 'Reconnaissance',
    riskLevel: 'High',
  },
  {
    id: 'gen-index-of-parent',
    pattern: 'intitle:"index of" "parent directory" "{KW}"',
    title: 'Parent directory listing with keyword',
    description: 'Looks for Apache/Nginx-style parent directory listings that expose files related to the keyword.',
    category: 'Reconnaissance',
    riskLevel: 'High',
  },
  // Admin / login panels
  {
    id: 'gen-inurl-admin',
    pattern: 'inurl:"{KW}" inurl:admin OR inurl:login OR inurl:panel',
    title: 'Admin / login panel with keyword in URL',
    description: 'Discovers administration or login panels whose URL contains the specified keyword.',
    category: 'Login Pages',
    riskLevel: 'High',
  },
  {
    id: 'gen-intitle-admin',
    pattern: 'intitle:"{KW}" inurl:admin OR intitle:"{KW}" inurl:dashboard',
    title: 'Dashboard / admin page titled with keyword',
    description: 'Finds pages whose title contains the keyword and whose URL indicates an administrative function.',
    category: 'Login Pages',
    riskLevel: 'High',
  },
  // Config / credentials
  {
    id: 'gen-inurl-config',
    pattern: 'inurl:config "{KW}"',
    title: 'Configuration file containing keyword',
    description: 'Looks for pages or files in /config paths that mention the keyword — often exposes secrets.',
    category: 'Sensitive Files',
    riskLevel: 'Critical',
  },
  {
    id: 'gen-intext-password',
    pattern: 'intext:"{KW}" intext:password OR intext:passwd OR intext:pwd',
    title: 'Page exposing keyword near password fields',
    description: 'Searches pages where the keyword appears alongside password-related terms — signals credential exposure.',
    category: 'Identity & Access',
    riskLevel: 'Critical',
  },
  {
    id: 'gen-intext-apikey',
    pattern: 'intext:"{KW}" intext:"api_key" OR intext:"apiKey" OR intext:"api key"',
    title: 'API key exposure near keyword',
    description: 'Finds pages or files that contain the keyword alongside API key indicators.',
    category: 'Identity & Access',
    riskLevel: 'Critical',
  },
  {
    id: 'gen-intext-secret',
    pattern: 'intext:"{KW}" intext:secret OR intext:token OR intext:private_key',
    title: 'Secret / token exposure near keyword',
    description: 'Discovers pages where the keyword sits near secret/token labels, suggesting sensitive data leakage.',
    category: 'Identity & Access',
    riskLevel: 'Critical',
  },
  // Error pages / stack traces
  {
    id: 'gen-error-page',
    pattern: 'intext:"{KW}" intitle:"error" OR intitle:"exception" OR intitle:"warning"',
    title: 'Error page leaking keyword context',
    description: 'Error and exception pages that mention the keyword may reveal internal paths, library names or config details.',
    category: 'Error Messages',
    riskLevel: 'Medium',
  },
  {
    id: 'gen-stack-trace',
    pattern: '"{KW}" "stack trace" OR "traceback" OR "Uncaught exception"',
    title: 'Stack trace disclosing keyword',
    description: 'Application stack traces that reference the keyword can expose internal code paths and library versions.',
    category: 'Error Messages',
    riskLevel: 'Medium',
  },
  // GitHub / source code
  {
    id: 'gen-github-code',
    pattern: 'site:github.com "{KW}" password OR secret OR token OR key',
    title: 'GitHub source code with keyword + secrets',
    description: 'Searches GitHub for public repositories where the keyword appears alongside sensitive variables.',
    category: 'OSINT',
    riskLevel: 'Critical',
  },
  {
    id: 'gen-pastebin',
    pattern: 'site:pastebin.com "{KW}"',
    title: 'Pastebin dump containing keyword',
    description: 'Looks for Pastebin pastes that contain the keyword — frequently used to publish leaked data.',
    category: 'OSINT',
    riskLevel: 'High',
  },
  // Swagger / API docs
  {
    id: 'gen-swagger',
    pattern: 'inurl:swagger "{KW}" OR inurl:api-docs "{KW}"',
    title: 'Swagger / API documentation with keyword',
    description: 'Finds exposed Swagger or OpenAPI documentation pages that reference the keyword — may reveal internal API endpoints.',
    category: 'API Exposure',
    riskLevel: 'Medium',
  },
  // Domain-scoped variants (prepend site: when domain provided)
  {
    id: 'gen-site-intext',
    pattern: 'intext:"{KW}"',
    title: 'Page body containing keyword',
    description: 'General page-body search for the keyword. When scoped to a domain, reveals where the target publishes this term.',
    category: 'Reconnaissance',
    riskLevel: 'Informational',
  },
  {
    id: 'gen-site-intitle',
    pattern: 'intitle:"{KW}"',
    title: 'Page title containing keyword',
    description: 'Finds pages whose HTML title element contains the specified keyword.',
    category: 'Reconnaissance',
    riskLevel: 'Informational',
  },
  {
    id: 'gen-site-inurl',
    pattern: 'inurl:"{KW}"',
    title: 'URL path containing keyword',
    description: 'Discovers URLs that include the keyword as a path component or query parameter.',
    category: 'Reconnaissance',
    riskLevel: 'Informational',
  },
]

// ─── Helpers ───────────────────────────────────────────────────────────────

function buildQuery(template: DorkTemplate, keyword: string, domain: string | null): string {
  const q = template.pattern.replace(/\{KW\}/g, keyword)
  if (!domain) return q
  // If the template itself contains no site: operator, prepend it
  if (!/\bsite:/i.test(q)) return `site:${domain} ${q}`
  return q
}

const DOMAIN_REGEX =
  /^(?:https?:\/\/)?([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+)(?:\/.*)?$/i

function extractDomainAndKeyword(raw: string): { domain: string | null; keyword: string } {
  const trimmed = raw.trim()
  if (!trimmed) return { domain: null, keyword: '' }

  const tokens = trimmed.split(/\s+/)
  let domain: string | null = null
  const kws: string[] = []

  for (const tok of tokens) {
    const m = tok.match(DOMAIN_REGEX)
    if (!domain && m) {
      domain = m[1].toLowerCase()
    } else {
      kws.push(tok)
    }
  }

  return { domain, keyword: kws.join(' ').toLowerCase().trim() }
}

/** Score a dork's relevance to the keyword; higher = more relevant. */
function scoreRelevance(dork: DorkEntry, terms: string[]): number {
  let score = 0
  for (const t of terms) {
    if (dork.query.toLowerCase().includes(t)) score += 3
    if (dork.title.toLowerCase().includes(t)) score += 2
    if (dork.description.toLowerCase().includes(t)) score += 1
  }
  return score
}

// ─── Route Handler ─────────────────────────────────────────────────────────

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rawQ = searchParams.get('q') || ''

    if (!rawQ.trim()) {
      return NextResponse.json({ generated: [], matched: [], keyword: '', domain: null }, { status: 200 })
    }

    const { domain, keyword } = extractDomainAndKeyword(rawQ)

    if (!keyword) {
      // No keyword — just return domain-scoped generic dorks from the main dataset
      return NextResponse.json({ generated: [], matched: [], keyword: '', domain }, { status: 200 })
    }

    const terms = keyword.split(/\s+/).filter(Boolean)

    // ── 1. Generate template-based dork cards ──────────────────────────────
    const generated: (DorkEntry & { isGenerated: true })[] = DORK_TEMPLATES.map((tpl) => ({
      id: `${tpl.id}::${keyword}`,
      title: tpl.title,
      description: tpl.description,
      category: tpl.category,
      categoryKey: tpl.category.replace(/\s+/g, '-'),
      riskLevel: tpl.riskLevel,
      query: buildQuery(tpl, keyword, domain),
      isGenerated: true as const,
    }))

    // ── 2. Surface matched dorks from the existing dataset ─────────────────
    const scored: { dork: DorkEntry; score: number }[] = []

    for (const dork of dataset.dorks) {
      const haystack = `${dork.title} ${dork.description} ${dork.category} ${dork.query}`.toLowerCase()
      const anyMatch = terms.some((t) => haystack.includes(t))
      if (!anyMatch) continue
      const score = scoreRelevance(dork, terms)
      scored.push({ dork, score })
    }

    scored.sort((a, b) => b.score - a.score)

    const TOP_N = 30
    const matched: DorkEntry[] = scored.slice(0, TOP_N).map(({ dork }) => {
      const q = domain
        ? dork.query.includes('<target>')
          ? dork.query.replace(/<target>/g, domain)
          : /\bsite:/i.test(dork.query)
          ? dork.query
          : `site:${domain} ${dork.query}`
        : dork.query
      return { ...dork, query: q }
    })

    return NextResponse.json({
      generated,
      matched,
      keyword,
      domain,
      totalGenerated: generated.length,
      totalMatched: matched.length,
    })
  } catch (err) {
    console.error('Dork Generate API error:', err)
    return NextResponse.json(
      { error: 'Failed to generate dork queries.' },
      { status: 500 }
    )
  }
}
