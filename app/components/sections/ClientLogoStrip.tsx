'use client'

import { motion } from 'framer-motion'

interface ClientLogoStripProps {
  title?: string
  subtitle?: string
  compact?: boolean
}

export default function ClientLogoStrip({
  title = 'TRUSTED BY LEADING ENTERPRISES & TECHNOLOGY PARTNERS',
  subtitle = 'Defending mission-critical infrastructure across Africa and worldwide',
  compact = false,
}: ClientLogoStripProps) {
  const clients = [
    { name: 'Microsoft', icon: 'fab fa-microsoft', category: 'Cloud Partner' },
    { name: 'AWS', icon: 'fab fa-aws', category: 'Infrastructure' },
    { name: 'Google Cloud', icon: 'fab fa-google', category: 'Cloud Partner' },
    { name: 'Interswitch', icon: 'fas fa-exchange-alt', category: 'Fintech / Payments' },
    { name: 'Paystack', icon: 'fas fa-layer-group', category: 'Fintech / Commerce' },
    { name: 'Flutterwave', icon: 'fas fa-wave-square', category: 'Global Payments' },
    { name: 'Cisco', icon: 'fas fa-network-wired', category: 'Network Defense' },
    { name: 'IBM Security', icon: 'fas fa-server', category: 'Enterprise' },
    { name: 'Standard Bank', icon: 'fas fa-shield-alt', category: 'Financial Services' },
    { name: 'Palo Alto', icon: 'fas fa-lock', category: 'Cybersecurity' },
  ]

  return (
    <section 
      aria-label="Client and Partner Logos" 
      className={`relative ${compact ? 'py-8' : 'py-12'} px-6 border-y border-[#1e2942]/60 bg-[#030816]/60 backdrop-blur-sm overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-blue-400 uppercase">
              {title}
            </span>
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 max-w-xl mx-auto font-sans">
              {subtitle}
            </p>
          )}
        </div>

        {/* 10 Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6 items-center">
          {clients.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#070e1e]/60 border border-[#1e2942]/70 hover:border-blue-500/50 hover:bg-[#0c1a38]/80 transition-all duration-300 cursor-default shadow-sm hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-center space-x-2.5">
                <i 
                  className={`${client.icon} text-lg md:text-xl text-slate-400 group-hover:text-blue-400 transition-colors duration-200`}
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-200 tracking-wide font-sans">
                  {client.name}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-mono mt-1 transition-colors">
                {client.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
