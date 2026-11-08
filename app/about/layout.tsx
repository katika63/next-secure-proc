'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const tabs = [
    { name: 'Our Mission', href: '/about/our-mission', icon: 'fas fa-bullseye' },
    { name: 'Our Clients & Case Studies', href: '/about/our-clients', icon: 'fas fa-handshake' },
    { name: 'Areas of Operation', href: '/operations', icon: 'fas fa-globe' },
    { name: 'Testimonials', href: '/testimonials', icon: 'fas fa-quote-left' },
  ]

  return (
    <div className="w-full">
      {/* Sub-navigation bar connecting About section routes */}
      <nav 
        aria-label="About section navigation"
        className="border-b border-[#16274a] bg-[#050b1a]/80 backdrop-blur-md sticky top-16 sm:top-20 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-2.5">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href || (tab.href === '/about/our-mission' && pathname === '/about')
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-mono whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/25 border border-blue-500/50 text-cyan-300 font-semibold shadow-sm shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <i className={`${tab.icon} text-xs text-blue-400`} />
                  <span>{tab.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {children}
    </div>
  )
}

