'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
  currentPath?: string
}

const Navigation = ({ currentPath = '/' }: NavigationProps) => {
  const pathname = usePathname()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [trainingOpen, setTrainingOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const servicesRef = useRef<HTMLDivElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  const closeAllDropdowns = () => {
    setServicesOpen(false)
    setTrainingOpen(false)
    setResourcesOpen(false)
    setAboutOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current && !servicesRef.current.contains(event.target as Node) &&
        resourcesRef.current && !resourcesRef.current.contains(event.target as Node) &&
        aboutRef.current && !aboutRef.current.contains(event.target as Node)
      ) {
        closeAllDropdowns()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Hide global main navigation on AI Security page to use dedicated Sentinel AI header
  if (pathname === '/ai-security' || pathname?.startsWith('/ai-security')) {
    return null
  }

  return (
    <header className="bg-[#030712]/90 backdrop-blur-xl border-b border-[#12203a] sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Previous BTM Security Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <i className="fas fa-shield-alt text-blue-500 text-3xl group-hover:scale-105 transition-transform"></i>
          <div className="w-0.5 h-8 bg-blue-500"></div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-white">
              <span className="text-blue-500">BTM</span>Security
            </span>
            <span className="text-[10px] text-slate-400 font-sans tracking-tight">Blue Team Module Security</span>
          </div>
        </Link>

        {/* Complete Center Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-300">
          
          {/* 1. Home */}
          <Link 
            href="/" 
            className={`hover:text-white transition-colors py-2 border-b-2 ${currentPath === '/' ? 'text-white border-blue-500 font-semibold' : 'border-transparent'}`}
          >
            Home
          </Link>

          {/* 2. Services Dropdown (with nested Security Training menu) */}
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => {
                setServicesOpen(!servicesOpen)
                setResourcesOpen(false)
                setAboutOpen(false)
              }}
              className="hover:text-white transition-colors flex items-center gap-1 py-2"
            >
              Services
              <svg className={`w-4 h-4 text-slate-400 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-60 bg-[#0a1124] border border-[#1e2942] rounded-xl shadow-2xl p-2 z-50"
                >
                  <Link href="/services" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    What We Do
                  </Link>

                  {/* Security Training Submenu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setTrainingOpen(!trainingOpen)
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg flex justify-between items-center transition-colors"
                    >
                      Security Training
                      <span className="text-xs text-slate-400">{trainingOpen ? '▾' : '▸'}</span>
                    </button>

                    <AnimatePresence>
                      {trainingOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-3 my-1 bg-[#050b18] border-l-2 border-blue-500 rounded-r-lg overflow-hidden space-y-0.5"
                        >
                          <Link href="/enrollment" onClick={closeAllDropdowns} className="block px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 transition-colors">
                            Our Training
                          </Link>
                          <Link href="/licenced-trainers" onClick={closeAllDropdowns} className="block px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 transition-colors">
                            Trainers
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Pricing */}
          <Link 
            href="/pricing" 
            className={`hover:text-white transition-colors py-2 border-b-2 ${currentPath === '/pricing' ? 'text-white border-blue-500 font-semibold' : 'border-transparent'}`}
          >
            Pricing
          </Link>

          {/* 4. Resources Dropdown */}
          <div className="relative" ref={resourcesRef}>
            <button
              onClick={() => {
                setResourcesOpen(!resourcesOpen)
                setServicesOpen(false)
                setAboutOpen(false)
              }}
              className="hover:text-white transition-colors flex items-center gap-1 py-2"
            >
              Resources
              <svg className={`w-4 h-4 text-slate-400 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-52 bg-[#0a1124] border border-[#1e2942] rounded-xl shadow-2xl p-2 z-50"
                >
                  <Link href="/blog" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    Blog
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. About Us Dropdown */}
          <div className="relative" ref={aboutRef}>
            <button
              onClick={() => {
                setAboutOpen(!aboutOpen)
                setServicesOpen(false)
                setResourcesOpen(false)
              }}
              className="hover:text-white transition-colors flex items-center gap-1 py-2"
            >
              About Us
              <svg className={`w-4 h-4 text-slate-400 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-52 bg-[#0a1124] border border-[#1e2942] rounded-xl shadow-2xl p-2 z-50"
                >
                  <Link href="/about/our-mission" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    Our Mission
                  </Link>
                  <Link href="/about/our-clients" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    Our Clients
                  </Link>
                  <Link href="/testimonials" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    Testimonials
                  </Link>
                  <Link href="/about/our-team" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    Our Team
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 6. Career */}
          <Link 
            href="/careers" 
            className={`hover:text-white transition-colors py-2 border-b-2 ${currentPath === '/careers' ? 'text-white border-blue-500 font-semibold' : 'border-transparent'}`}
          >
            Career
          </Link>

          {/* 7. Contact */}
          <Link 
            href="/contact" 
            className={`hover:text-white transition-colors py-2 border-b-2 ${currentPath === '/contact' ? 'text-white border-blue-500 font-semibold' : 'border-transparent'}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/ai-security"
            className="flex items-center gap-2 border border-[#1e2942] hover:border-blue-500/60 bg-[#0a1124]/80 text-slate-200 hover:text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Client Portal
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-200"
          >
            Contact Us
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-slate-300 hover:text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a1124] border-b border-[#1e2942] px-6 py-4 space-y-3"
          >
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Home</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Services</Link>
            <Link href="/enrollment" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Security Training</Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Pricing</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Resources</Link>
            <Link href="/about/our-mission" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">About Us</Link>
            <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Career</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Contact</Link>
            
            <div className="pt-4 border-t border-[#1e2942] flex flex-col gap-3">
              <Link href="/ai-security" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 border border-[#1e2942] rounded-lg text-slate-200 font-medium">Client Portal</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 bg-blue-600 rounded-lg text-white font-semibold">Contact Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navigation