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

  // Mobile submenu toggles
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)

  const servicesRef = useRef<HTMLDivElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  const closeAllDropdowns = () => {
    setServicesOpen(false)
    setTrainingOpen(false)
    setResourcesOpen(false)
    setAboutOpen(false)
  }

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileServicesOpen(false)
    setMobileAboutOpen(false)
  }, [pathname])

  // Handle click outside desktop dropdowns
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
    <header className="sticky top-0 z-[100] w-full">
      <div className="w-full bg-[#030712]/95 backdrop-blur-xl border-b border-[#12203a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* BTM Security Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
          <i className="fas fa-shield-alt text-blue-500 text-2xl sm:text-3xl group-hover:scale-105 transition-transform" />
          <div className="w-0.5 h-6 sm:h-8 bg-blue-500" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              <span className="text-blue-500">BTM</span>Security
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-sans tracking-tight">
              Blue Team Module Security
            </span>
          </div>
        </Link>

        {/* Complete Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-300">
          
          {/* 1. Home */}
          <Link 
            href="/" 
            className={`hover:text-white transition-colors py-2 ${pathname === '/' ? 'text-white font-semibold' : ''}`}
          >
            Home
          </Link>

          {/* 2. Services Dropdown */}
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
            className={`hover:text-white transition-colors py-2 ${pathname === '/pricing' ? 'text-white font-semibold' : ''}`}
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
                    Blog & Articles
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
                  className="absolute left-0 mt-2 w-56 bg-[#0a1124] border border-[#1e2942] rounded-xl shadow-2xl p-2 z-50"
                >
                  <Link href="/about/our-mission" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    Our Mission
                  </Link>
                  <Link href="/about/our-clients" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    Our Clients
                  </Link>
                  <Link href="/operations" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors flex items-center justify-between">
                    <span>Areas of Operation</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30 font-mono">GLOBAL</span>
                  </Link>
                  <Link href="/testimonials" onClick={closeAllDropdowns} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    Testimonials
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 6. Career */}
          <Link 
            href="/careers" 
            className={`hover:text-white transition-colors py-2 ${pathname === '/careers' ? 'text-white font-semibold' : ''}`}
          >
            Career
          </Link>

          {/* 7. Contact */}
          <Link 
            href="/contact" 
            className={`hover:text-white transition-colors py-2 ${pathname === '/contact' ? 'text-white font-semibold' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Buttons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            href="/ai-security"
            className="flex items-center gap-2 border border-[#1e2942] hover:border-blue-500/60 bg-[#0a1124]/80 text-slate-200 hover:text-white px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm"
          >
            <i className="fas fa-brain text-blue-400 text-xs" />
            <span>AI Security</span>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-200"
          >
            <span>Contact Us</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/ai-security"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-blue-500/40 bg-blue-950/40 text-blue-300 text-xs font-semibold font-mono hover:bg-blue-900/50 transition-colors"
          >
            <i className="fas fa-brain text-[11px] text-cyan-400" />
            <span>AI Chat</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 -mr-1 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 active:scale-95 transition-all focus:outline-none"
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

      </div>
    </div>

      {/* ─── FULL MOBILE NAVIGATION DRAWER ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-16 sm:top-20 inset-x-0 bottom-0 z-[100] w-full bg-[#030816]/98 backdrop-blur-2xl border-b border-[#1e2942] overflow-y-auto overscroll-contain flex flex-col justify-between p-5 space-y-6 shadow-2xl"
            style={{ height: 'calc(100dvh - 4rem)' }}
          >
            {/* Primary Navigation Links with Accordions */}
            <div className="space-y-1">
              
              {/* Home */}
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === '/' ? 'bg-blue-600/20 text-white font-semibold border border-blue-500/30' : 'text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <i className="fas fa-home text-blue-400 text-sm w-5 text-center" />
                <span>Home</span>
              </Link>

              {/* Services (Accordion) */}
              <div className="rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800/50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-shield-alt text-blue-400 text-sm w-5 text-center" />
                    <span>Services &amp; Training</span>
                  </div>
                  <i className={`fas fa-chevron-down text-xs text-slate-400 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-9 pr-2 py-1 space-y-1 bg-[#030816]/70 rounded-lg my-1 border-l-2 border-blue-500/60"
                    >
                      <Link
                        href="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 px-2 text-xs rounded-lg transition-colors ${pathname === '/services' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                      >
                        What We Do (Cyber Defense)
                      </Link>
                      <Link
                        href="/enrollment"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 px-2 text-xs rounded-lg transition-colors ${pathname === '/enrollment' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                      >
                        Security Training Programs
                      </Link>
                      <Link
                        href="/licenced-trainers"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 px-2 text-xs rounded-lg transition-colors ${pathname === '/licenced-trainers' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                      >
                        Licensed Global Trainers
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing */}
              <Link 
                href="/pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === '/pricing' ? 'bg-blue-600/20 text-white font-semibold border border-blue-500/30' : 'text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <i className="fas fa-tags text-cyan-400 text-sm w-5 text-center" />
                <span>Pricing &amp; Plans</span>
              </Link>

              {/* Resources / Blog */}
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === '/blog' ? 'bg-blue-600/20 text-white font-semibold border border-blue-500/30' : 'text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <i className="fas fa-newspaper text-blue-400 text-sm w-5 text-center" />
                <span>Blog &amp; Resources</span>
              </Link>

              {/* About Us (Accordion) */}
              <div className="rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800/50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-info-circle text-blue-400 text-sm w-5 text-center" />
                    <span>About Us</span>
                  </div>
                  <i className={`fas fa-chevron-down text-xs text-slate-400 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-9 pr-2 py-1 space-y-1 bg-[#030816]/70 rounded-lg my-1 border-l-2 border-cyan-500/60"
                    >
                      <Link
                        href="/about/our-mission"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 px-2 text-xs rounded-lg transition-colors ${pathname === '/about/our-mission' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                      >
                        Our Mission
                      </Link>
                      <Link
                        href="/about/our-clients"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 px-2 text-xs rounded-lg transition-colors ${pathname === '/about/our-clients' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                      >
                        Our Clients &amp; Case Studies
                      </Link>
                      <Link
                        href="/operations"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`py-2 px-2 text-xs rounded-lg transition-colors flex items-center justify-between ${pathname === '/operations' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                      >
                        <span>Areas of Operation</span>
                        <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono border border-blue-500/30">GLOBAL</span>
                      </Link>
                      <Link
                        href="/testimonials"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 px-2 text-xs rounded-lg transition-colors ${pathname === '/testimonials' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                      >
                        Client Testimonials
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Career */}
              <Link 
                href="/careers" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === '/careers' ? 'bg-blue-600/20 text-white font-semibold border border-blue-500/30' : 'text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <i className="fas fa-briefcase text-blue-400 text-sm w-5 text-center" />
                <span>Careers</span>
              </Link>

              {/* Contact */}
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === '/contact' ? 'bg-blue-600/20 text-white font-semibold border border-blue-500/30' : 'text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <i className="fas fa-envelope text-blue-400 text-sm w-5 text-center" />
                <span>Contact Us</span>
              </Link>

            </div>

            {/* Bottom Actions & Support Contact */}
            <div className="pt-4 border-t border-[#1e2942] space-y-3 shrink-0 safe-bottom">
              <Link
                href="/ai-security"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-blue-500/40 bg-[#09152b] text-cyan-300 text-sm font-semibold font-mono shadow-md"
              >
                <i className="fas fa-shield-virus" />
                <span>Launch BTM Sentinel AI</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30"
              >
                <span>Book Free Risk Consultation</span>
                <i className="fas fa-arrow-right text-xs" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2 font-mono">
                <a href="tel:+2347045981315" className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                  <i className="fas fa-phone-alt text-emerald-400" />
                  <span>+234 704 598 1315</span>
                </a>
                <span>•</span>
                <a href="mailto:support@btmsec.com" className="hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                  <i className="fas fa-envelope text-blue-400" />
                  <span>support@btmsec.com</span>
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navigation