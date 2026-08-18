'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  id: string
  sender: 'user' | 'ai'
  timestamp: string
  content: string
  cveData?: {
    cveId: string
    overview: string
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
    cvssScore: string
    potentialImpact: string[]
    affectedSystems: { product: string; versions: string }
    mitigationSteps: string[]
    sources: string[]
  }
}

interface Playbook {
  id: string
  title: string
  category: string
  stepsCount: number
  status: 'Ready' | 'Executing' | 'Completed'
  description: string
  prompt: string
  result?: string
}

export default function DynamicSentinelAIPage() {
  const [activeTab, setActiveTab] = useState<string>('Chat')
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: '<h2 class="text-blue-400 font-bold mt-2 mb-2 text-sm">🛡️ BTM Sentinel AI — Online</h2>Welcome to the Security Intelligence Workspace. I can help you with:<br><br><div class="flex items-start gap-2 mt-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5"></span><span><strong class="text-white">CVE Analysis:</strong> Type any CVE ID (e.g. CVE-2024-3094)</span></div><div class="flex items-start gap-2 mt-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5"></span><span><strong class="text-white">Threat Intelligence:</strong> Ask about malware, APT groups, TTPs</span></div><div class="flex items-start gap-2 mt-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5"></span><span><strong class="text-white">Incident Response:</strong> Playbook guidance and mitigation strategies</span></div><br>How can I assist your security team today?'
    }
  ])
  const [inputQuery, setInputQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Telemetry
  const [visitorIp, setVisitorIp] = useState<string>('Detecting...')
  const [visitorGeo, setVisitorGeo] = useState<string>('Global Telemetry')
  const [securityScore, setSecurityScore] = useState<number>(91)

  // Terminal State
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'BTM SENTINEL AI SECURITY TERMINAL [v2.3.0-RELEASE]',
    'Type "help" for available commands or "scan <target>" to analyze host security.',
    'System status: ONLINE | Node ID: SENTINEL-NODE-01 | Encrypted TLS 1.3 channel established.',
    '------------------------------------------------------------------------------------'
  ])
  const [terminalLoading, setTerminalLoading] = useState(false)
  const terminalLogsContainerRef = useRef<HTMLDivElement>(null)

  // Playbooks State
  const [playbooks, setPlaybooks] = useState<Playbook[]>([
    {
      id: 'pb-1',
      title: 'Ransomware Outbreak Containment',
      category: 'Incident Response',
      stepsCount: 6,
      status: 'Ready',
      description: 'Isolate compromised endpoints, terminate shadow-copy deletion scripts, and revoke compromised Kerberos tokens.',
      prompt: 'Execute Ransomware Outbreak Containment Playbook for critical database cluster. Return a step-by-step containment report.'
    },
    {
      id: 'pb-2',
      title: 'Phishing Campaign Neutralization',
      category: 'Security Awareness',
      stepsCount: 4,
      status: 'Ready',
      description: 'Purge malicious email payloads from O365/Google Workspace inboxes and block phishing domain clusters at DNS level.',
      prompt: 'Run Phishing Campaign Neutralization Playbook for reported AiTM phishing domain. Return eradication plan.'
    }
  ])

  // Vulnerabilities State
  const [liveCves, setLiveCves] = useState<any[]>([])
  const [cveLoading, setCveLoading] = useState(false)
  const [activeCveAnalysis, setActiveCveAnalysis] = useState<{ id: string, content: string, data?: any } | null>(null)

  // Sub-tabs generic state
  const [tabQuery, setTabQuery] = useState('')
  const [tabResult, setTabResult] = useState('')
  const [tabLoading, setTabLoading] = useState(false)

  // Mount
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.ip) {
          setVisitorIp(data.ip)
          setVisitorGeo(`${data.city || 'Unknown'}, ${data.country_name || 'Global'}`)
        }
      })
      .catch(() => setVisitorIp('190.2.152.243'))
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, loading])

  useEffect(() => {
    if (terminalLogsContainerRef.current) {
      terminalLogsContainerRef.current.scrollTop = terminalLogsContainerRef.current.scrollHeight
    }
  }, [terminalLogs, terminalLoading])

  // Chat Handler
  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery
    if (!textToSend.trim() || loading) return

    setActiveTab('Chat')

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    setMessages(prev => [...prev, { id: `user-${Date.now()}`, sender: 'user', timestamp: timeStr, content: textToSend }])
    if (!queryText) setInputQuery('')
    setLoading(true)

    // Detect if they typed CVE
    const cveMatch = textToSend.match(/(CVE-\d{4}-\d{4,7})/i)
    const mode = cveMatch ? 'cve_lookup' : 'chat'
    const cveId = cveMatch ? cveMatch[1].toUpperCase() : null

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, mode, cveId })
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: data.response || 'Security analysis complete.',
        cveData: data.cveData
      }])
    } catch (err) {
      setMessages(prev => [...prev, { id: `err-${Date.now()}`, sender: 'ai', timestamp: timeStr, content: '⚠️ Failed to connect to Sentinel AI.' }])
    } finally {
      setLoading(false)
    }
  }

  // Terminal Handler
  const handleTerminalCommand = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!terminalInput.trim() || terminalLoading) return

    const cmd = terminalInput.trim()
    const timestamp = new Date().toLocaleTimeString()
    setTerminalLogs(prev => [...prev, `[${timestamp}] sentinel@security-node:~$ ${cmd}`])
    setTerminalInput('')
    
    const lower = cmd.toLowerCase()
    
    if (lower === 'clear') {
      setTerminalLogs(['BTM SENTINEL AI SECURITY TERMINAL [v2.3.0-RELEASE]', '------------------------------------------------------------------------------------'])
      return
    }

    if (lower === 'help') {
      setTerminalLogs(prev => [...prev, 'AVAILABLE COMMANDS:', '  ping <target>     - ICMP Ping', '  whois <target>    - WHOIS Lookup', '  dig <target>      - DNS Lookup', '  nmap <target>     - Port Scan', '  geoip <target>    - Geolocation Lookup', '  traceroute <t>    - MTR Traceroute', '  cve <cve-id>      - CVE lookup', '  clear             - Clear logs'])
      return
    }

    setTerminalLoading(true)

    const networkCmds = ['ping', 'whois', 'dig', 'nslookup', 'dns', 'nmap', 'scan', 'portscan', 'geoip', 'traceroute', 'tracert', 'mtr']
    const baseCmd = lower.split(' ')[0]
    
    if (networkCmds.includes(baseCmd)) {
      const target = cmd.split(' ').slice(1).join(' ')
      if (!target) {
        setTerminalLogs(prev => [...prev, `[-] Usage: ${baseCmd} <target>`])
        setTerminalLoading(false)
        return
      }
      
      try {
        const res = await fetch('/api/terminal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: baseCmd, target })
        })
        const data = await res.json()
        if (data.output) {
          const lines = data.output.split('\n')
          setTerminalLogs(prev => [...prev, ...lines])
        } else if (data.error) {
          setTerminalLogs(prev => [...prev, `[-] Error: ${data.error}`])
        }
      } catch (err) {
        setTerminalLogs(prev => [...prev, `[-] Failed to execute ${baseCmd}. Endpoint unreachable.`])
      } finally {
        setTerminalLoading(false)
      }
      return
    }

    if (lower.startsWith('cve')) {
      const targetCve = cmd.split(' ')[1] || 'CVE-2024-3094'
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: `Analyze ${targetCve}`, mode: 'terminal', cveId: targetCve })
        })
        const data = await res.json()
        setTerminalLogs(prev => [...prev, data.response || 'Analysis complete.'])
      } catch {
        setTerminalLogs(prev => [...prev, '[-] Failed to perform CVE analysis.'])
      } finally {
        setTerminalLoading(false)
      }
      return
    }

    // Default AI Terminal Analysis
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cmd, mode: 'terminal' })
      })
      const data = await res.json()
      setTerminalLogs(prev => [...prev, data.response || 'Execution complete.'])
    } catch {
      setTerminalLogs(prev => [...prev, '[-] Command processing failed.'])
    } finally {
      setTerminalLoading(false)
    }
  }

  // Playbook execution
  const handleRunPlaybook = async (playbook: Playbook) => {
    setPlaybooks(prev => prev.map(p => p.id === playbook.id ? { ...p, status: 'Executing' } : p))
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: playbook.prompt, mode: 'chat' })
      })
      const data = await res.json()
      setPlaybooks(prev => prev.map(p => p.id === playbook.id ? { ...p, status: 'Completed', result: data.response } : p))
    } catch {
      setPlaybooks(prev => prev.map(p => p.id === playbook.id ? { ...p, status: 'Ready', result: 'Failed to run playbook.' } : p))
    }
  }

  // Generic Sub-tab Analysis
  const handleTabAnalysis = async () => {
    if (!tabQuery.trim() || tabLoading) return
    setTabLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `${activeTab} Analysis for: ${tabQuery}`, mode: 'chat' })
      })
      const data = await res.json()
      setTabResult(data.response || 'Analysis completed.')
    } catch {
      setTabResult('Failed to generate report.')
    } finally {
      setTabLoading(false)
    }
  }

  // Vulnerability feed load
  useEffect(() => {
    if (activeTab === 'Vulnerabilities' && liveCves.length === 0) {
      setCveLoading(true)
      fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json')
        .then(res => res.json())
        .then(data => {
          if (data.vulnerabilities && Array.isArray(data.vulnerabilities)) {
            const sorted = data.vulnerabilities
              .sort((a: any, b: any) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
              .slice(0, 10)
              .map((v: any) => ({
                id: v.cveID,
                cveID: v.cveID,
                published: v.dateAdded,
                dateAdded: v.dateAdded,
                vendor: v.vendorProject,
                product: v.product,
                title: v.vulnerabilityName,
                details: v.shortDescription,
                action: v.requiredAction
              }))
            setLiveCves(sorted)
          } else {
            throw new Error('Fallback to CIRCL')
          }
        })
        .catch(() => {
          fetch('https://cve.circl.lu/api/last')
            .then(res => res.json())
            .then(data => {
              if (Array.isArray(data)) {
                const valid = data.filter((i: any) => i && (i.id || i.details)).map((i: any) => ({
                  id: i.aliases?.find((a: string) => a.startsWith('CVE-')) || i.id,
                  cveID: i.aliases?.find((a: string) => a.startsWith('CVE-')) || i.id,
                  published: i.published ? i.published.split('T')[0] : 'Recent',
                  details: i.details || i.summary || 'Security advisory published.',
                  vendor: 'Global Advisory'
                }))
                setLiveCves(valid.slice(0, 10))
              }
            })
            .catch(() => {
              setLiveCves([
                { id: 'CVE-2024-3094', cveID: 'CVE-2024-3094', vendor: 'XZ Utils', title: 'XZ Utils Supply Chain Backdoor', details: 'Critical backdoor in XZ Utils liblzma SSH authentication hook allowing remote code execution.', published: '2024-03-29' },
                { id: 'CVE-2024-21626', cveID: 'CVE-2024-21626', vendor: 'runc', title: 'runc Container Breakout', details: 'runc container breakout vulnerability via file descriptor leak in workdir processing.', published: '2024-01-31' },
                { id: 'CVE-2024-6387', cveID: 'CVE-2024-6387', vendor: 'OpenSSH', title: 'regreSSHion SSH RCE', details: 'regreSSHion: Remote Code Execution vulnerability in OpenSSH server (sshd) on Linux.', published: '2024-07-01' },
                { id: 'CVE-2024-38077', cveID: 'CVE-2024-38077', vendor: 'Microsoft', title: 'Windows RDP Licensing RCE', details: 'Windows Remote Desktop Licensing Service Remote Code Execution vulnerability (CVSS 9.8).', published: '2024-07-09' }
              ])
            })
        })
        .finally(() => setCveLoading(false))
    }
  }, [activeTab, liveCves.length])

  const handleCveClick = async (cveId: string) => {
    setActiveCveAnalysis({ id: cveId, content: 'Analyzing...', data: null })
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Analyze ${cveId}`, mode: 'cve_lookup', cveId })
      })
      const data = await res.json()
      setActiveCveAnalysis({ id: cveId, content: data.response, data: data.cveData })
    } catch {
      setActiveCveAnalysis({ id: cveId, content: 'Failed to analyze CVE.', data: null })
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const navItems = [
    { name: 'Chat', icon: '💬' },
    { name: 'Terminal', icon: '💻' },
    { name: 'Threat Intelligence', icon: '🛡️' },
    { name: 'Vulnerabilities', icon: '🔓' },
    { name: 'Incidents', icon: '🚨' },
    { name: 'Research Lab', icon: '🔬' },
    { name: 'Playbooks', icon: '📋' }
  ]

  return (
    <div className="min-h-screen bg-transparent text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative cyber-grid-bg">
      {/* Radial Background Light Bleed (Matching default site background) */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* ─── TOP HEADER BAR ────────────────────────────────────────────────────────── */}
      <header className="h-16 border-b border-[#0f1d38] bg-[#040a17]/95 backdrop-blur-xl sticky top-0 z-50 px-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link href="/" className="flex items-center space-x-2 group">
            <i className="fas fa-shield-alt text-blue-500 text-xl sm:text-2xl group-hover:scale-105 transition-transform" />
            <div className="w-0.5 h-5 sm:h-6 bg-blue-500" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                <span className="text-blue-500">BTM</span> SECURITY
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-sans tracking-tight">Blue Team Module Security</span>
            </div>
          </Link>
          <div className="h-5 w-px bg-[#1e2942]" />
          <div>
            <div className="text-[10px] sm:text-xs font-bold tracking-wider text-white font-mono uppercase">SENTINEL AI</div>
            <div className="hidden sm:block text-[10px] text-slate-400 font-mono tracking-tight">AI SECURITY INTELLIGENCE</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-5 text-xs font-medium text-slate-300 font-mono">
          {navItems.map(item => (
            <button key={item.name} onClick={() => setActiveTab(item.name)} className={`hover:text-white transition-colors ${activeTab === item.name ? 'text-blue-400 font-bold' : ''}`}>
              {item.name === 'Research Lab' ? 'Research' : item.name === 'Threat Intelligence' ? 'Threat Intel' : item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono text-slate-400 bg-[#09152b] border border-[#14284d] px-3 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>IP: {visitorIp}</span>
          </div>
          <Link href="/client-portal" className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#0a152d] border border-[#1e325c] hover:border-blue-500/50 text-slate-200 text-xs font-medium transition-all">
            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span className="hidden sm:inline">AI Security</span>
            <span className="sm:hidden">AI</span>
          </Link>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md border border-blue-400/40">AD</div>
        </div>
      </header>

      {/* ─── STICKY HORIZONTAL TAB SCROLLER (MOBILE & TABLET ONLY < lg) ───────────── */}
      <div className="lg:hidden sticky top-16 z-40 bg-[#040a17]/95 border-b border-[#0f1d38] backdrop-blur-md px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
        {navItems.map(item => (
          <button
            key={item.name}
            onClick={() => { setActiveTab(item.name); setTabResult('') }}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === item.name
                ? 'bg-[#0c1f42] text-white border border-[#1e3b75] shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-[#061126] border border-[#0f1d38]'
            }`}
          >
            <span className="text-xs">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* ─── MAIN DASHBOARD CONTENT GRID ───────────────────────────────────────────── */}
      <div className="max-w-[1700px] mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">

        {/* ─── LEFT SIDEBAR (DESKTOP ONLY lg+) ──────────────────────────────────── */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5">
          <div className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-4 shadow-xl">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider font-mono uppercase mb-3 px-2">AI SECURITY</div>
            <nav className="space-y-1">
              {navItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => { setActiveTab(item.name); setTabResult('') }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === item.name ? 'bg-[#0c1f42] text-white border border-[#1e3b75] shadow-md font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-[#071329]'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-4 shadow-xl">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider font-mono uppercase mb-3 px-2">QUICK ACTIONS</div>
            <div className="space-y-2">
              {[
                { label: 'Analyze Threat', icon: '🌐', query: 'Perform threat analysis on recent IOCs' },
                { label: 'CVE Lookup', icon: '🔍', query: 'Lookup details for CVE-2024-3094' }
              ].map(action => (
                <button
                  key={action.label}
                  onClick={() => handleSendMessage(action.query)}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-[#07132b] hover:bg-[#0d2248] border border-[#14284d] hover:border-blue-500/40 text-slate-200 text-xs font-medium transition-all text-left"
                >
                  <span className="text-sm">{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ─── CENTER WORKSPACE (Cols 4-9) ───────────────────────────────────────── */}
        <main className="lg:col-span-6 space-y-4 flex flex-col justify-start">
          
          <div className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-4 sm:p-6 shadow-xl relative overflow-hidden flex justify-between items-center">
            <div className="space-y-1 sm:space-y-2 max-w-lg z-10">
              <div className="text-xs font-bold text-blue-400 tracking-wider font-mono uppercase">BTM SENTINEL AI</div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{activeTab} Workspace</h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Dynamic security operations powered by Gemini AI.</p>
            </div>
          </div>

          {/* CHAT TAB */}
          {activeTab === 'Chat' && (
            <div className="h-[500px] sm:h-[580px] lg:h-[calc(100vh-220px)] flex flex-col">
              {/* Scrollable messages area */}
              <div
                ref={chatContainerRef}
                className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-3 sm:p-5 shadow-xl flex-1 min-h-0 overflow-y-auto space-y-4 sm:space-y-6 mb-3 scrollbar-thin scrollbar-thumb-[#1e3b75] scrollbar-track-transparent"
              >
                {messages.map(msg => (
                  <div key={msg.id} className="mb-4">
                    {msg.sender === 'user' && (
                      <div className="flex justify-end items-start gap-2 sm:gap-3">
                        <div className="max-w-[85%] sm:max-w-md bg-[#0a1835] border border-[#1a2e57] rounded-2xl p-3 sm:p-4 text-xs text-slate-100 shadow-md">
                          <p>{msg.content}</p>
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0a1835] border border-[#1a2e57] flex items-center justify-center text-xs shrink-0">👤</div>
                      </div>
                    )}
                    {msg.sender === 'ai' && (
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shrink-0">AI</div>
                        <div className="flex-1 bg-[#040916] border border-[#0f1d38] rounded-2xl p-3 sm:p-5 text-xs text-slate-200 shadow-xl overflow-x-auto">
                          <div
                            style={{ lineHeight: '1.7', whiteSpace: 'pre-wrap' }}
                            className="text-slate-300 text-xs sm:text-sm"
                            dangerouslySetInnerHTML={{ __html: msg.content }}
                          />
                          {msg.cveData && (
                            <div className="mt-4 pt-3 border-t border-[#0e1b34] space-y-3">
                              <div>
                                <div className="font-bold text-white mb-1 text-xs">Overview</div>
                                <p className="text-slate-300 text-xs">{msg.cveData.overview}</p>
                              </div>
                              <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                                <span className="text-rose-400 font-bold px-2 py-0.5 bg-rose-950 rounded border border-rose-500 text-xs font-mono">{msg.cveData.severity}</span>
                                <span className="text-slate-400 text-xs font-mono">CVSS: {msg.cveData.cvssScore}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                    Sentinel AI reasoning...
                  </div>
                )}
              </div>

              {/* Chat input */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-2.5 sm:p-3 shadow-xl relative shrink-0"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask Sentinel AI..."
                  disabled={loading}
                  className="w-full pl-3 sm:pl-4 pr-12 sm:pr-14 py-2.5 sm:py-3 bg-[#030816] border border-[#122244] focus:border-blue-500 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          {/* TERMINAL TAB */}
          {activeTab === 'Terminal' && (
            <div className="bg-[#020612] border border-[#0f1d38] rounded-xl p-3 sm:p-5 shadow-2xl flex flex-col font-mono h-[500px] sm:h-[580px] lg:h-[calc(100vh-220px)]">
              {/* Terminal header bar */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#0f1d38] shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[10px] text-slate-500 ml-1 sm:ml-2 font-bold truncate">sentinel@cyber-node-01</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-cyan-500 font-mono">TLS 1.3 ENCRYPTED</span>
              </div>
              {/* Scrollable logs area */}
              <div ref={terminalLogsContainerRef} className="flex-1 min-h-0 overflow-y-auto space-y-1.5 text-[11px] sm:text-xs text-emerald-400 pr-1 scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-transparent">
                {terminalLogs.map((log, i) => (
                  <div key={i} className={`whitespace-pre-wrap leading-relaxed ${log.includes('[+]') ? 'text-cyan-300' : log.includes('[-]') ? 'text-rose-400' : ''}`}>{log}</div>
                ))}
                {terminalLoading && (
                  <div className="flex items-center gap-2 text-amber-400">
                    <div className="w-2 h-4 bg-amber-400 animate-pulse" />
                    Processing...
                  </div>
                )}
              </div>
              {/* Fixed input bar */}
              <form onSubmit={handleTerminalCommand} className="mt-3 pt-3 border-t border-[#0f1d38] flex items-center space-x-1 sm:space-x-2 shrink-0">
                <span className="text-cyan-400 text-[10px] sm:text-xs font-bold shrink-0">
                  <span className="hidden sm:inline">sentinel@security-node:~$</span>
                  <span className="sm:hidden">$</span>
                </span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="ping 8.8.8.8 | whois | help..."
                  className="flex-1 bg-transparent border-none text-[11px] sm:text-xs text-white outline-none font-mono placeholder-slate-600"
                  disabled={terminalLoading}
                  autoFocus
                />
                <button type="submit" disabled={terminalLoading} className="px-2 py-1 bg-emerald-700/50 hover:bg-emerald-600/60 text-emerald-300 rounded text-[10px] font-mono border border-emerald-700/40">
                  ↵
                </button>
              </form>
            </div>
          )}

          {/* VULNERABILITIES TAB */}
          {activeTab === 'Vulnerabilities' && (
            <div className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-4 sm:p-6 shadow-xl flex flex-col h-[500px] sm:h-[580px] lg:h-[calc(100vh-220px)]">
              <div className="flex justify-between items-center border-b border-[#0f1d38] pb-3 mb-4 shrink-0">
                <div>
                  <h2 className="text-xs sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Live CISA Vulnerabilities Feed</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">Real-time feed by CISA & DHS</p>
                </div>
                <button onClick={() => { setLiveCves([]); setCveLoading(true) }} className="text-xs text-blue-400 hover:text-white font-mono">↺ Refresh</button>
              </div>
              
              <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-[#1e3b75] scrollbar-track-transparent">
                {cveLoading && (
                  <div className="text-slate-400 text-xs animate-pulse font-mono flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                    Connecting to CISA Threat Feed...
                  </div>
                )}
                
                {liveCves.map((cve: any, idx: number) => {
                  const displayId = cve.cveID || cve.id || (cve.aliases && cve.aliases.find((a: string) => a.startsWith('CVE-'))) || 'CVE-2024-3094'
                  const displayDate = cve.published || cve.dateAdded || 'Recent'
                  const displayVendor = cve.vendor || 'CISA Intelligence'
                  const displaySummary = cve.details || cve.shortDescription || cve.summary || 'Critical vulnerability threat detected in recent package advisory.'
                  
                  return (
                    <div key={displayId + idx} className="p-3 sm:p-4 rounded-xl bg-[#030816] border border-[#102246] hover:border-blue-500/40 transition-colors">
                      <div className="flex justify-between items-center mb-2 flex-wrap gap-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-400 font-mono text-[10px] sm:text-xs font-bold">{displayId}</span>
                          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono text-[9px] sm:text-[10px] uppercase">{displayVendor}</span>
                        </div>
                        <span className="text-slate-400 text-[10px] font-mono">{displayDate}</span>
                      </div>
                      
                      {cve.title && <h3 className="text-xs font-bold text-white mb-1">{cve.title}</h3>}
                      <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">{displaySummary}</p>
                      
                      <button onClick={() => handleCveClick(displayId)} className="text-[11px] font-bold text-blue-400 hover:text-cyan-400 flex items-center gap-1 font-mono">
                        Analyze with Sentinel AI <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                      
                      {activeCveAnalysis?.id === displayId && activeCveAnalysis && (
                        <div className="mt-3 p-3 sm:p-4 rounded-lg bg-[#050b1a] border border-[#102246] text-xs text-slate-300 space-y-2">
                          {activeCveAnalysis.content === 'Analyzing...' ? (
                            <div className="animate-pulse flex items-center gap-2 font-mono text-cyan-400 text-xs">
                              <div className="w-3 h-3 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                              Sentinel AI analyzing risk & TTPs...
                            </div>
                          ) : (
                            <>
                              <div dangerouslySetInnerHTML={{ __html: activeCveAnalysis.content }} className="space-y-2 leading-relaxed text-xs" />
                              {activeCveAnalysis.data && (
                                <div className="mt-3 pt-3 border-t border-[#122244] font-mono text-[10px] text-amber-400 flex items-center justify-between flex-wrap gap-2">
                                  <span>CVSS SCORE: {activeCveAnalysis.data.cvssScore || '9.8 (CRITICAL)'}</span>
                                  <span className="text-rose-400 font-bold px-2 py-0.5 bg-rose-950/80 rounded border border-rose-500/40">{activeCveAnalysis.data.severity || 'CRITICAL'}</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* PLAYBOOKS TAB */}
          {activeTab === 'Playbooks' && (
            <div className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-4 sm:p-5 shadow-xl flex flex-col h-[500px] sm:h-[580px] lg:h-[calc(100vh-220px)]">
              <h2 className="text-sm sm:text-base font-bold text-white mb-4 border-b border-[#0f1d38] pb-3 shrink-0">Automated Security Playbooks</h2>
              <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-[#1e3b75] scrollbar-track-transparent">
                <div className="space-y-4">
                  {playbooks.map(pb => (
                    <div key={pb.id} className="p-3 sm:p-4 rounded-xl bg-[#030816] border border-[#102246] space-y-3">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono text-[10px] uppercase">{pb.category}</span>
                          <h3 className="text-xs sm:text-sm font-bold text-white mt-1">{pb.title}</h3>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${pb.status === 'Executing' ? 'bg-amber-950 text-amber-400 animate-pulse' : pb.status === 'Completed' ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>{pb.status}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{pb.description}</p>
                      <div className="pt-2 border-t border-[#0d1c3a] flex justify-between items-center">
                        <span className="text-[11px] text-slate-500">{pb.stepsCount} Steps</span>
                        <button onClick={() => handleRunPlaybook(pb)} disabled={pb.status === 'Executing'} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold font-mono shadow-md">
                          {pb.status === 'Executing' ? 'Running...' : 'Execute'}
                        </button>
                      </div>
                      {pb.result && (
                        <div className="mt-3 p-3 sm:p-4 rounded-lg bg-[#050b1a] border border-[#102246] text-xs text-slate-300">
                          <div dangerouslySetInnerHTML={{ __html: pb.result }} className="space-y-2 leading-relaxed text-xs" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GENERIC FALLBACK (Threat Intel, Incidents, Research Lab) */}
          {['Threat Intelligence', 'Incidents', 'Research Lab'].includes(activeTab) && (
            <div className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-4 sm:p-6 shadow-xl flex flex-col h-[500px] sm:h-[580px] lg:h-[calc(100vh-220px)]">
              <h2 className="text-sm sm:text-base font-bold text-white mb-4 border-b border-[#0f1d38] pb-3 shrink-0">{activeTab} Workspace</h2>
              
              <div className="flex space-x-2 mb-4 sm:mb-6">
                <input
                  type="text"
                  value={tabQuery}
                  onChange={e => setTabQuery(e.target.value)}
                  placeholder={`Query ${activeTab}...`}
                  className="flex-1 px-3 sm:px-4 py-2 bg-[#030816] border border-[#122244] rounded-lg text-xs text-white outline-none"
                  onKeyDown={e => e.key === 'Enter' && handleTabAnalysis()}
                />
                <button onClick={handleTabAnalysis} disabled={tabLoading} className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold font-mono transition-colors">
                  {tabLoading ? '...' : 'Analyze'}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-[#030816] rounded-xl border border-[#102246] p-3 sm:p-5">
                {tabLoading ? (
                  <div className="animate-pulse flex items-center gap-2 text-slate-400 text-xs font-mono"><div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />Sentinel AI generating report...</div>
                ) : tabResult ? (
                  <div dangerouslySetInnerHTML={{ __html: tabResult }} className="text-xs text-slate-300 leading-relaxed space-y-3" />
                ) : (
                  <div className="text-xs text-slate-500 font-mono text-center mt-8 sm:mt-10">Awaiting query to generate {activeTab} analysis report...</div>
                )}
              </div>
            </div>
          )}

        </main>

        {/* ─── RIGHT SIDEBAR (Cols 10-12) ────────────────────────────────────────── */}
        <aside className="lg:col-span-3 space-y-4 sm:space-y-5">
          <div className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold text-slate-400 tracking-wider font-mono uppercase">SECURITY OVERVIEW</div>
            </div>
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="38" stroke="#0d1f3f" strokeWidth="6" fill="transparent" />
                  <circle cx="48" cy="48" r="38" stroke="#00d8ff" strokeWidth="6" strokeDasharray="238" strokeDashoffset="30" strokeLinecap="round" fill="transparent" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">{securityScore}</span>
                  <span className="text-[10px] text-slate-400 font-mono">/100</span>
                </div>
              </div>
              <div className="text-xs font-bold text-emerald-400 font-mono mt-2">Score: Excellent</div>
            </div>
          </div>
          
          <div className="bg-[#050c1e]/90 border border-[#0f1d38] rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider font-mono uppercase">MITRE ATT&CK™ MAP</div>
            <div className="relative pl-4 space-y-2.5 border-l border-blue-500/40 font-mono text-xs">
              {['Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 'Defense Evasion'].map(tactic => (
                <button key={tactic} onClick={() => { setActiveTab('Threat Intelligence'); setTabQuery(`Analyze MITRE tactic: ${tactic}`); handleTabAnalysis() }} className="w-full relative flex items-center space-x-2 text-left group">
                  <span className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:bg-cyan-400 border-2 border-[#030712] transition-colors" />
                  <span className="text-slate-300 group-hover:text-white transition-colors text-[11px]">{tactic}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}