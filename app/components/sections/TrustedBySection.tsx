'use client'

import { motion } from 'framer-motion'

const TrustedBySection = () => {
  const brands = [
    { name: 'Microsoft', icon: 'fab fa-microsoft' },
    { name: 'AWS', icon: 'fab fa-aws' },
    { name: 'IBM', text: 'IBM' },
    { name: 'Cisco', text: 'CISCO' },
    { name: 'HSBC', text: 'HSBC' },
    { name: 'Palo Alto', text: 'paloalto' },
    { name: 'Google Cloud', icon: 'fab fa-google' }
  ]

  return (
    <section className="py-10 bg-transparent border-y border-[#1e2942]/60 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Label matching PNG screenshot */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs font-bold tracking-widest text-slate-400 font-mono uppercase">
            TRUSTED BY GLOBAL ENTERPRISES
          </span>
        </div>

        {/* Brand Logos Row */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 lg:gap-12 opacity-75 hover:opacity-100 transition-opacity">
          {brands.map((brand, idx) => (
            <motion.div 
              key={idx}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer font-bold tracking-wide"
              whileHover={{ scale: 1.05 }}
            >
              {brand.icon ? (
                <i className={`${brand.icon} text-xl md:text-2xl`} />
              ) : null}
              <span className="text-sm md:text-base font-semibold font-sans">{brand.name}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TrustedBySection