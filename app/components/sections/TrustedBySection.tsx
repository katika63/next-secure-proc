'use client'

import { motion } from 'framer-motion'

const TrustedBySection = () => {
  const brands = [
    { name: 'Microsoft', icon: 'fab fa-microsoft' },
    { name: 'AWS', icon: 'fab fa-aws' },
    { name: 'Google Cloud', icon: 'fab fa-google' },
    { name: 'Interswitch', icon: 'fas fa-exchange-alt' },
    { name: 'Paystack', icon: 'fas fa-layer-group' },
    { name: 'Flutterwave', icon: 'fas fa-wave-square' },
    { name: 'Cisco', icon: 'fas fa-network-wired' },
    { name: 'IBM Security', icon: 'fas fa-server' },
    { name: 'Standard Bank', icon: 'fas fa-shield-alt' },
    { name: 'Palo Alto', icon: 'fas fa-lock' },
  ]

  return (
    <section aria-label="Trusted Enterprise Clients and Partners" className="py-10 bg-transparent border-y border-[#1e2942]/60 px-6">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
        
        {/* Label */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-slate-400 font-mono uppercase">
            TRUSTED BY AFRICAN ENTERPRISES & GLOBAL LEADERS
          </span>
        </div>

        {/* Brand Logos Row (10 logos) */}
        <div className="flex flex-wrap items-center justify-center xl:justify-end gap-6 lg:gap-8 opacity-80 hover:opacity-100 transition-opacity">
          {brands.map((brand, idx) => (
            <motion.div 
              key={idx}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200 cursor-default font-semibold tracking-wide"
              whileHover={{ scale: 1.05 }}
            >
              <i className={`${brand.icon} text-lg md:text-xl text-blue-400/80`} aria-hidden="true" />
              <span className="text-xs md:text-sm font-semibold font-sans">{brand.name}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TrustedBySection