/**
 * Fetches Google Dorks from https://github.com/Proviesec/google-dorks,
 * normalises each query, deduplicates against the existing dorks.json dataset,
 * and appends new entries.
 *
 * Run from the project root:
 *   node scripts/import-proviesec.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DORKS_PATH = join(ROOT, 'app', 'data', 'dorks.json')

// ── File → {category, categoryKey, riskLevel} mapping ────────────────────────
const FILE_MAP = [
  // Root-level files
  { file: 'google-dorks-best-log.txt',          category: 'Reconnaissance',    risk: 'High' },
  { file: 'google-dorks-for-cloud-platforms.txt', category: 'Cloud Services',   risk: 'High' },
  { file: 'google-dorks-for-firebase.txt',       category: 'Cloud Services',    risk: 'High' },
  { file: 'google-dorks-for-mailgun.txt',        category: 'Identity & Access', risk: 'High' },
  { file: 'google-dorks-for-stripe.txt',         category: 'Identity & Access', risk: 'Critical' },
  { file: 'google-dorks-for-github-actions.txt', category: 'DevOps & CI/CD',    risk: 'High' },
  { file: 'google-dorks-for-anthropic.txt',      category: 'AI & MLOps',        risk: 'High' },
  { file: 'google-dorks-for-slack.txt',          category: 'Identity & Access', risk: 'Medium' },
  { file: 'google-dorks-for-login.txt',          category: 'Login Pages',       risk: 'High' },
  { file: 'google-dorks-for-monitoring.txt',     category: 'Web Server',        risk: 'Medium' },
  { file: 'google-dorks-for-webserver.txt',      category: 'Web Server',        risk: 'Medium' },
  { file: 'google-dorks-for-sql-injection.txt',  category: 'Vulnerable Servers',risk: 'Critical' },
  // CMS subdirectory
  { file: 'cms/google-dorks-for-wordpress.txt',  category: 'CMS',               risk: 'High' },
  { file: 'cms/google-dorks-for-typo3.txt',      category: 'CMS',               risk: 'Medium' },
]

const BASE_RAW = 'https://raw.githubusercontent.com/Proviesec/google-dorks/main/'

// ── Helper: pipe-operator normalisation (matches app/lib/dorkQuery.ts) ────────
function normalizeDorkOperators(query) {
  if (!query) return ''
  let out = ''
  let inQuotes = false
  for (let i = 0; i < query.length; i++) {
    const ch = query[i]
    if (ch === '"' && (i === 0 || query[i - 1] !== '\\')) {
      inQuotes = !inQuotes
      out += ch
      continue
    }
    if (!inQuotes && ch === '|') {
      out = out.replace(/[ \t]+$/, '')
      if (out.length > 0 && !out.endsWith('(')) out += ' '
      out += 'OR'
      let nextIdx = i + 1
      while (nextIdx < query.length && (query[nextIdx] === ' ' || query[nextIdx] === '\t')) nextIdx++
      if (nextIdx < query.length && query[nextIdx] !== ')') out += ' '
      i = nextIdx - 1
      continue
    }
    out += ch
  }
  return out.trim()
}

// ── Fetch with simple retry ───────────────────────────────────────────────────
async function fetchText(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) return null
      return await res.text()
    } catch (e) {
      if (i === retries - 1) return null
      await new Promise(r => setTimeout(r, 500))
    }
  }
  return null
}

// ── Main ──────────────────────────────────────────────────────────────────────
const existing = JSON.parse(readFileSync(DORKS_PATH, 'utf8'))
const existingQueries = new Set(existing.dorks.map(d => d.query.trim().toLowerCase()))

let newEntries = []
let highestId = parseInt(existing.dorks.at(-1)?.id.replace('dork-', '') || '0', 10)

for (const { file, category, risk } of FILE_MAP) {
  const url = BASE_RAW + file
  console.log(`  Fetching ${url}`)
  const text = await fetchText(url)
  if (!text) {
    console.warn(`  ⚠ Could not fetch ${file}`)
    continue
  }

  const lines = text.split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'))

  let added = 0
  for (const raw of lines) {
    const query = normalizeDorkOperators(raw)
    if (!query) continue
    if (existingQueries.has(query.toLowerCase())) continue

    existingQueries.add(query.toLowerCase())
    highestId++
    const id = `dork-${String(highestId).padStart(4, '0')}`

    // Derive a human-readable title from the file name and query
    const shortQ = query.length > 80 ? query.slice(0, 77) + '…' : query
    const title = `${shortQ}`

    newEntries.push({
      id,
      title,
      category,
      categoryKey: category.replace(/[\s&]+/g, '-'),
      description: `Google dork from Proviesec collection (${file.replace('cms/', '').replace('.txt', '').replace(/-/g, ' ')}).`,
      query,
      riskLevel: risk,
    })
    added++
  }
  console.log(`  ✓ ${added} new dorks from ${file}`)
}

console.log(`\nTotal new entries: ${newEntries.length}`)
console.log(`Previous total:    ${existing.total}`)

existing.dorks.push(...newEntries)
existing.total = existing.dorks.length

writeFileSync(DORKS_PATH, JSON.stringify(existing, null, 2), 'utf8')
console.log(`Updated total:     ${existing.total}`)
console.log('✅ dorks.json written successfully.')
