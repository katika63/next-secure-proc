'use client'

import React, { useState, useEffect } from 'react'

interface SecurityNode {
  id: string
  name: string
  code: string
  region: string
  role: string
  x: number
  y: number
  status: 'optimal' | 'filtering' | 'active'
  latency: string
  priority?: boolean
}

const NODES: SecurityNode[] = [
  {
    id: 'lagos',
    name: 'Lagos',
    code: 'LOS',
    region: 'af-south-1',
    role: 'Primary African SOC & Threat Intelligence Core',
    x: 508,
    y: 236,
    status: 'optimal',
    latency: '14ms',
    priority: true
  },
  {
    id: 'jnb',
    name: 'Johannesburg',
    code: 'JNB',
    region: 'af-south-2',
    role: 'Southern African Cloud Enclave',
    x: 568,
    y: 336,
    status: 'optimal',
    latency: '22ms',
    priority: true
  },
  {
    id: 'london',
    name: 'London',
    code: 'LON',
    region: 'eu-west-2',
    role: 'European Edge Gateway',
    x: 485,
    y: 118,
    status: 'optimal',
    latency: '18ms'
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt',
    code: 'FRA',
    region: 'eu-central-1',
    role: 'Continental Telemetry Hub',
    x: 520,
    y: 124,
    status: 'optimal',
    latency: '20ms'
  },
  {
    id: 'nyc',
    name: 'New York',
    code: 'NYC',
    region: 'us-east-1',
    role: 'Atlantic Perimeter Defense',
    x: 288,
    y: 148,
    status: 'filtering',
    latency: '29ms'
  },
  {
    id: 'sfo',
    name: 'San Francisco',
    code: 'SFO',
    region: 'us-west-1',
    role: 'Pacific Edge Ingress',
    x: 168,
    y: 154,
    status: 'optimal',
    latency: '38ms'
  },
  {
    id: 'sao_paulo',
    name: 'São Paulo',
    code: 'GRU',
    region: 'sa-east-1',
    role: 'South American Enclave',
    x: 362,
    y: 326,
    status: 'optimal',
    latency: '45ms'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'SIN',
    region: 'ap-southeast-1',
    role: 'APAC Edge Hub',
    x: 772,
    y: 248,
    status: 'filtering',
    latency: '34ms'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    code: 'TYO',
    region: 'ap-northeast-1',
    role: 'East Asia Gateway',
    x: 872,
    y: 156,
    status: 'optimal',
    latency: '41ms'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    code: 'SYD',
    region: 'ap-southeast-2',
    role: 'Oceania Ingress Node',
    x: 902,
    y: 350,
    status: 'optimal',
    latency: '52ms'
  }
]

// Real geodesic telemetry arcs connecting global nodes
const TELEMETRY_ARCS = [
  // Lagos to Europe & Americas
  { from: [508, 236], to: [485, 118], control: [485, 170] },
  { from: [508, 236], to: [288, 148], control: [380, 160] },
  { from: [508, 236], to: [568, 336], control: [550, 280] },
  // Transatlantic & Intra-Continental
  { from: [485, 118], to: [288, 148], control: [380, 90] },
  { from: [485, 118], to: [520, 124], control: [502, 112] },
  { from: [288, 148], to: [168, 154], control: [225, 120] },
  { from: [288, 148], to: [362, 326], control: [340, 230] },
  // Euro-Asia & Transpacific
  { from: [520, 124], to: [772, 248], control: [650, 140] },
  { from: [772, 248], to: [872, 156], control: [830, 185] },
  { from: [772, 248], to: [902, 350], control: [855, 310] },
  { from: [168, 154], to: [872, 156], control: [520, 30] }
]

const LIVE_EVENTS = [
  { region: 'af-south-1', msg: 'WAF: Mitigated SQLi & Path Traversal probe on client perimeter', type: 'block' },
  { region: 'eu-central-1', msg: 'TLS: Deprecated cipher handshake isolated & rejected', type: 'info' },
  { region: 'us-east-1', msg: 'DDoS: Volumetric ingress burst suppressed by edge shield', type: 'block' },
  { region: 'ap-southeast-1', msg: 'Zero-Trust: Enforced step-up MFA challenge on administrative API', type: 'auth' },
  { region: 'af-south-2', msg: 'Posture: Continuous cryptographic compliance verified across enclaves', type: 'pass' }
]

export default function EnterpriseDefenseMap() {
  const [activeNode, setActiveNode] = useState<SecurityNode | null>(NODES[0]) // default to Lagos
  const [eventIndex, setEventIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % LIVE_EVENTS.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-full bg-[#020612] rounded-xl border border-[#0d1e3d] overflow-hidden flex flex-col justify-between">
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0d264f 1px, transparent 1px),
            linear-gradient(to bottom, #0d264f 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* SVG Canvas */}
      <div className="relative w-full h-[270px] sm:h-[360px] flex items-center justify-center p-1 sm:p-2">
        <svg 
          viewBox="0 0 1000 460" 
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Telemetry Arc Gradient */}
            <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d8ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>

            {/* African Priority Radial Pulse */}
            <radialGradient id="africaCore">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#059669" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Accurate Vector Continent Landmass Paths */}
          <g className="fill-[#08152e] stroke-[#122852] stroke-[1.2] transition-colors duration-300">
            {/* North America */}
            <path d="M 120 70 Q 180 50, 240 60 Q 300 70, 310 110 Q 290 150, 260 170 Q 220 180, 210 210 Q 180 230, 160 210 Q 130 180, 110 140 Z" />
            {/* Greenland */}
            <path d="M 330 40 Q 380 35, 390 60 Q 360 85, 330 75 Z" />
            {/* South America */}
            <path d="M 270 240 Q 340 230, 380 280 Q 390 340, 350 400 Q 320 420, 300 370 Q 280 300, 270 240 Z" />
            {/* Europe */}
            <path d="M 460 90 Q 520 80, 560 100 Q 550 140, 510 150 Q 470 150, 460 120 Z" />
            {/* British Isles */}
            <path d="M 450 100 Q 470 95, 470 120 Q 450 125, 450 100 Z" />
            {/* Africa - Prominent & Accurately Shaped */}
            <path d="M 460 170 Q 560 160, 580 220 Q 610 270, 580 360 Q 540 400, 510 370 Q 470 300, 460 230 Z" className="fill-[#0a1a38] stroke-[#1a3870]" />
            {/* Asia */}
            <path d="M 570 90 Q 720 70, 840 90 Q 890 140, 840 220 Q 760 240, 710 200 Q 640 180, 570 140 Z" />
            {/* Indian Subcontinent */}
            <path d="M 680 180 Q 730 190, 740 240 Q 700 270, 680 220 Z" />
            {/* Japan */}
            <path d="M 870 130 Q 890 140, 880 180 Q 860 160, 870 130 Z" />
            {/* Southeast Asia Archipelago */}
            <path d="M 770 240 Q 820 250, 840 280 Q 790 290, 770 240 Z" />
            {/* Australia */}
            <path d="M 820 320 Q 920 310, 930 360 Q 900 410, 840 390 Q 810 360, 820 320 Z" />
          </g>

          {/* African Priority Regional Beacon Glow (Centered on Lagos) */}
          <circle cx="508" cy="236" r="65" fill="url(#africaCore)" className="animate-pulse pointer-events-none" />

          {/* Active Geodesic Telemetry Arcs */}
          {TELEMETRY_ARCS.map((arc, i) => {
            const d = `M ${arc.from[0]} ${arc.from[1]} Q ${arc.control[0]} ${arc.control[1]} ${arc.to[0]} ${arc.to[1]}`
            return (
              <g key={i}>
                {/* Background Shadow Line */}
                <path
                  d={d}
                  fill="none"
                  stroke="#082046"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                {/* Glowing Active Arc */}
                <path
                  d={d}
                  fill="none"
                  stroke="url(#arcGlow)"
                  strokeWidth="1.2"
                  strokeOpacity="0.75"
                />
                {/* Traveling Packet Animation */}
                <circle r="2" fill="#00d8ff" filter="drop-shadow(0 0 3px #00d8ff)">
                  <animateMotion
                    path={d}
                    dur={`${3.5 + (i % 3) * 1.2}s`}
                    repeatCount="indefinite"
                    begin={`${(i * 0.4).toFixed(1)}s`}
                  />
                </circle>
              </g>
            )
          })}

          {/* Security Telemetry Hub Nodes */}
          {NODES.map((node) => {
            const isSelected = activeNode?.id === node.id
            const isLagos = node.id === 'lagos'
            return (
              <g 
                key={node.id} 
                className="cursor-pointer group"
                onClick={() => setActiveNode(node)}
              >
                {/* Outer Ping Ring for Priority / Selected Nodes */}
                {(isLagos || isSelected) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isLagos ? 10 : 8}
                    fill="none"
                    stroke={isLagos ? '#10b981' : '#00d8ff'}
                    strokeWidth="1.5"
                    className="animate-ping"
                    opacity="0.8"
                  />
                )}

                {/* Node Outer Halo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isLagos ? 6 : 4.5}
                  fill={isLagos ? '#064e3b' : isSelected ? '#0369a1' : '#071630'}
                  stroke={isLagos ? '#10b981' : isSelected ? '#38bdf8' : '#22d3ee'}
                  strokeWidth={isLagos ? 2 : 1.5}
                  className="transition-all duration-200 group-hover:scale-125"
                />

                {/* Node Center Dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isLagos ? 2.8 : 2}
                  fill={isLagos ? '#34d399' : '#ffffff'}
                />

                {/* Clean IATA Code Label */}
                <text
                  x={node.x}
                  y={node.y - (isLagos ? 12 : 9)}
                  textAnchor="middle"
                  className={`text-[9px] font-mono font-bold select-none transition-all ${
                    isLagos 
                      ? 'fill-emerald-400 font-extrabold text-[10px]' 
                      : isSelected 
                      ? 'fill-cyan-300' 
                      : 'fill-slate-400 group-hover:fill-white'
                  }`}
                >
                  {node.code}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Selected Node Details Floating HUD */}
        {activeNode && (
          <div className="absolute top-2 left-2 max-w-[240px] bg-[#030919]/90 border border-[#162d55] backdrop-blur-md p-2.5 rounded-lg shadow-xl text-[11px] font-mono pointer-events-none transition-all">
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#14284b]">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${activeNode.priority ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
                {activeNode.name} ({activeNode.code})
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">{activeNode.latency}</span>
            </div>
            <div className="text-[10px] text-slate-300 leading-tight">
              {activeNode.role}
            </div>
            <div className="flex items-center justify-between mt-1 text-[9px] text-slate-400">
              <span>Region: <span className="text-blue-400 font-bold">{activeNode.region}</span></span>
              <span className="text-emerald-400 font-semibold">TLS 1.3 Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Live Telemetry Feed (Bottom Bar) */}
      <div className="bg-[#030a1c] border-t border-[#0d2247] px-3 py-1.5 flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
        <div className="flex items-center space-x-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <span className="text-slate-400 shrink-0">[{LIVE_EVENTS[eventIndex].region}]</span>
          <span className="text-slate-200 truncate font-sans sm:font-mono">
            {LIVE_EVENTS[eventIndex].msg}
          </span>
        </div>
        <span className="text-[9px] text-slate-500 font-mono shrink-0 pl-2 hidden sm:inline">
          LIVE INGRESS
        </span>
      </div>
    </div>
  )
}

