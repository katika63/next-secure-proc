/**
 * Full import of ALL .txt dork files from Proviesec/google-dorks.
 * Uses the GitHub Trees API to list every file in the repo (recursive),
 * downloads each .txt, deduplicates against the existing dorks.json,
 * and appends new entries.
 *
 * Run from the project root:
 *   node scripts/import-proviesec-full.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DORKS_PATH = join(ROOT, 'app', 'data', 'dorks.json')

const REPO    = 'Proviesec/google-dorks'
const BRANCH  = 'main'
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/`
const TREE_URL = `https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`

// ── Category inference from file path ────────────────────────────────────────
function inferCategory(path) {
  const p = path.toLowerCase()
  if (p.includes('firebase'))          return { category: 'Cloud Services',    risk: 'High' }
  if (p.includes('cloud'))             return { category: 'Cloud Services',    risk: 'High' }
  if (p.includes('stripe'))            return { category: 'Identity & Access', risk: 'Critical' }
  if (p.includes('mailgun'))           return { category: 'Identity & Access', risk: 'High' }
  if (p.includes('slack'))             return { category: 'Identity & Access', risk: 'Medium' }
  if (p.includes('anthropic'))         return { category: 'AI & MLOps',        risk: 'High' }
  if (p.includes('github-action'))     return { category: 'DevOps & CI/CD',    risk: 'High' }
  if (p.includes('cicd') ||
      p.includes('ci-cd') ||
      p.includes('jenkins') ||
      p.includes('travis') ||
      p.includes('circleci'))          return { category: 'DevOps & CI/CD',    risk: 'High' }
  if (p.includes('sql') ||
      p.includes('sqli'))              return { category: 'Vulnerable Servers', risk: 'Critical' }
  if (p.includes('wordpress') ||
      p.includes('drupal') ||
      p.includes('joomla') ||
      p.includes('typo') ||
      p.includes('magento') ||
      p.includes('shopify') ||
      p.includes('cms'))               return { category: 'CMS',               risk: 'High' }
  if (p.includes('login') ||
      p.includes('auth') ||
      p.includes('admin'))             return { category: 'Login Pages',       risk: 'High' }
  if (p.includes('monitor') ||
      p.includes('dashboard') ||
      p.includes('grafana') ||
      p.includes('kibana') ||
      p.includes('prometheus'))        return { category: 'Web Server',        risk: 'Medium' }
  if (p.includes('iot') ||
      p.includes('router') ||
      p.includes('camera') ||
      p.includes('scada'))             return { category: 'IoT Devices',       risk: 'High' }
  if (p.includes('database') ||
      p.includes('mysql') ||
      p.includes('mongo') ||
      p.includes('redis') ||
      p.includes('postgres'))          return { category: 'Database',          risk: 'Critical' }
  if (p.includes('backup'))            return { category: 'Backups',           risk: 'High' }
  if (p.includes('network') ||
      p.includes('vpn') ||
      p.includes('firewall') ||
      p.includes('cisco') ||
      p.includes('juniper'))           return { category: 'Network Devices',   risk: 'High' }
  if (p.includes('osint'))             return { category: 'OSINT',             risk: 'Medium' }
  if (p.includes('threat'))            return { category: 'Threat Hunting',    risk: 'High' }
  if (p.includes('sensitive') ||
      p.includes('secret') ||
      p.includes('credential') ||
      p.includes('password') ||
      p.includes('config') ||
      p.includes('env') ||
      p.includes('key'))               return { category: 'Sensitive Files',   risk: 'Critical' }
  if (p.includes('web') ||
      p.includes('server') ||
      p.includes('apache') ||
      p.includes('nginx') ||
      p.includes('iis'))               return { category: 'Web Server',        risk: 'Medium' }
  if (p.includes('best-log') ||
      p.includes('best'))              return { category: 'Reconnaissance',    risk: 'High' }
  if (p.includes('api'))               return { category: 'API Exposure',      risk: 'High' }
  // Default fallback
  return { category: 'Reconnaissance', risk: 'Medium' }
}

// ── Pipe-operator normalisation (mirrors app/lib/dorkQuery.ts) ────────────────
function normalizeDorkOperators(query) {
  if (!query) return ''
  let out = '', inQuotes = false
  for (let i = 0; i < query.length; i++) {
    const ch = query[i]
    if (ch === '"' && (i === 0 || query[i - 1] !== '\\')) { inQuotes = !inQuotes; out += ch; continue }
    if (!inQuotes && ch === '|') {
      out = out.replace(/[ \t]+$/, '')
      if (out.length > 0 && !out.endsWith('(')) out += ' '
      out += 'OR'
      let nextIdx = i + 1
      while (nextIdx < query.length && (query[nextIdx] === ' ' || query[nextIdx] === '\t')) nextIdx++
      if (nextIdx < query.length && query[nextIdx] !== ')') out += ' '
      i = nextIdx - 1; continue
    }
    out += ch
  }
  return out.trim()
}

// ── Fetch with retries ────────────────────────────────────────────────────────
async function fetchText(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) return null
      return await res.text()
    } catch { if (i === retries - 1) return null; await new Promise(r => setTimeout(r, 600)) }
  }
  return null
}
async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'btmsec-dork-importer' } })
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`)
  return res.json()
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log('Fetching repository file tree...')
const tree = await fetchJson(TREE_URL)

const txtFiles = tree.tree
  .filter(item => item.type === 'blob' && item.path.endsWith('.txt'))
  .map(item => item.path)

console.log(`Found ${txtFiles.length} .txt files in repo:`)
txtFiles.forEach(f => console.log('  ', f))

const existing = JSON.parse(readFileSync(DORKS_PATH, 'utf8'))
const existingQueries = new Set(existing.dorks.map(d => d.query.trim().toLowerCase()))

let highestId = 0
for (const d of existing.dorks) {
  const n = parseInt(d.id.replace('dork-', ''), 10)
  if (!isNaN(n) && n > highestId) highestId = n
}

const newEntries = []
const summary = []

for (const filePath of txtFiles) {
  // Skip the mega-aggregated file — its contents are covered by the category files
  if (filePath === 'all-google-dorks.txt') {
    console.log(`  Skipping aggregated file: ${filePath}`)
    continue
  }

  const url = RAW_BASE + filePath
  const text = await fetchText(url)
  if (!text) { console.warn(`  ⚠ Could not fetch ${filePath}`); continue }

  const { category, risk } = inferCategory(filePath)
  const friendlyName = filePath.replace('cms/', '').replace('.txt', '').replace(/-/g, ' ')

  const lines = text.split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#') && !l.startsWith('//') && !l.startsWith(';'))

  let added = 0
  for (const raw of lines) {
    const query = normalizeDorkOperators(raw)
    if (!query || query.length < 4) continue
    if (existingQueries.has(query.toLowerCase())) continue

    existingQueries.add(query.toLowerCase())
    highestId++
    const id = `dork-${String(highestId).padStart(5, '0')}`
    const shortQ = query.length > 90 ? query.slice(0, 87) + '…' : query

    newEntries.push({
      id,
      title: shortQ,
      category,
      categoryKey: category.replace(/[\s&]+/g, '-'),
      description: `Google dork from Proviesec collection — ${friendlyName}.`,
      query,
      riskLevel: risk,
    })
    added++
  }

  summary.push({ file: filePath, category, risk, added })
  console.log(`  ✓ ${String(added).padStart(4)} new | ${filePath} → ${category} [${risk}]`)
}

console.log('\n── Import Summary ──────────────────────────────────────────────')
const totalNew = newEntries.length
console.log(`Total new unique dorks: ${totalNew}`)
console.log(`Previous total:         ${existing.total}`)

existing.dorks.push(...newEntries)
existing.total = existing.dorks.length

writeFileSync(DORKS_PATH, JSON.stringify(existing, null, 2), 'utf8')
console.log(`Updated total:          ${existing.total}`)
console.log('✅ dorks.json written successfully.')
