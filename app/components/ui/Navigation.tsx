'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
    currentPath?: string
}

const Navigation = ({ currentPath = '/' }: NavigationProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const [trainingOpen, setTrainingOpen] = useState(false)
    const [resourcesOpen, setResourcesOpen] = useState(false)
    const [aboutOpen, setAboutOpen] = useState(false)
    const [nestedOpen, setNestedOpen] = useState(false)

    // Refs for dropdown containers
    const servicesRef = useRef<HTMLDivElement>(null)
    const resourcesRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const mobileServicesRef = useRef<HTMLDivElement>(null)
    const mobileResourcesRef = useRef<HTMLDivElement>(null)
    const mobileAboutRef = useRef<HTMLDivElement>(null)

    const closeAllDropdowns = () => {
        setServicesOpen(false)
        setTrainingOpen(false)
        setResourcesOpen(false)
        setAboutOpen(false)
        setNestedOpen(false)
    }

    const toggleDropdown = (dropdown: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        
        switch (dropdown) {
            case 'services':
                setServicesOpen(!servicesOpen)
                setResourcesOpen(false)
                setAboutOpen(false)
                setNestedOpen(false)
                break
            case 'resources':
                setResourcesOpen(!resourcesOpen)
                setServicesOpen(false)
                setAboutOpen(false)
                setNestedOpen(false)
                break
            case 'about':
                setAboutOpen(!aboutOpen)
                setServicesOpen(false)
                setResourcesOpen(false)
                setNestedOpen(false)
                break
            case 'training':
                setTrainingOpen(!trainingOpen)
                break
        }
    }

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                servicesRef.current && !servicesRef.current.contains(event.target as Node) &&
                resourcesRef.current && !resourcesRef.current.contains(event.target as Node) &&
                aboutRef.current && !aboutRef.current.contains(event.target as Node) &&
                mobileServicesRef.current && !mobileServicesRef.current.contains(event.target as Node) &&
                mobileResourcesRef.current && !mobileResourcesRef.current.contains(event.target as Node) &&
                mobileAboutRef.current && !mobileAboutRef.current.contains(event.target as Node)
            ) {
                closeAllDropdowns()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const isActivePath = (path: string) => {
        return currentPath === path
    }

    return (
        <nav className="bg-gray-900 bg-opacity-90 border-b border-gray-800 py-4 px-6 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Branding */}
                <Link href="/" className="flex items-center space-x-2">
                    <i className="fas fa-shield-alt text-blue-500 text-4xl"></i>
                    <div className="w-0.5 h-8 bg-blue-500"></div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xl font-bold text-white">
                            <span className="text-blue-500">BTM</span>Security
                        </span>
                        <span className="text-xs text-gray-300">Blue Team Module Security</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300">
                    <Link
                        href="/"
                        className={`hover:text-white transition-colors duration-200 ${isActivePath('/') ? 'text-white' : ''
                            }`}
                    >
                        Home
                    </Link>

                    {/* Services Dropdown */}
                    <div className="relative" ref={servicesRef}>
                        <button
                            onClick={(e) => toggleDropdown('services', e)}
                            className="hover:text-white transition-colors duration-200 flex items-center"
                        >
                            Services
                            <motion.svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ rotate: servicesOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </motion.svg>
                        </button>

                        <AnimatePresence>
                            {servicesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-2 w-56 bg-gray-800 text-gray-300 rounded-md shadow-lg z-50 overflow-hidden"
                                >
                                    <Link
                                        href="/services"
                                        className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        What We Do
                                    </Link>

                                    {/* Nested Training Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setNestedOpen(!nestedOpen)
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-700 flex justify-between items-center transition-colors duration-200"
                                        >
                                            Security Training
                                            <span>{nestedOpen ? '▾' : '▸'}</span>
                                        </button>

                                        <AnimatePresence>
                                            {nestedOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="ml-4 mt-1 bg-gray-800 rounded-md shadow-lg overflow-hidden"
                                                >
                                                    <Link
                                                        href="/enrollment"
                                                        className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                                                        onClick={closeAllDropdowns}
                                                    >
                                                        Our Training
                                                    </Link>
                                                    <Link
                                                        href="/licenced-trainers"
                                                        className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                                                        onClick={closeAllDropdowns}
                                                    >
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

                    {/* Pricing Link */}
                    <Link
                        href="/pricing"
                        className={`hover:text-white transition-colors duration-200 ${isActivePath('/pricing') ? 'text-white' : ''
                            }`}
                    >
                        Pricing
                    </Link>

                    {/* Resources Dropdown */}
                    <div className="relative" ref={resourcesRef}>
                        <button
                            onClick={(e) => toggleDropdown('resources', e)}
                            className="hover:text-white transition-colors duration-200 flex items-center"
                        >
                            Resources
                            <motion.svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ rotate: resourcesOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </motion.svg>
                        </button>

                        <AnimatePresence>
                            {resourcesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-2 w-48 bg-gray-800 text-gray-300 rounded-md shadow-lg z-50 overflow-hidden"
                                >
                                    <Link
                                        href="/blog"
                                        className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        Blog
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* About Us Dropdown */}
                    <div className="relative" ref={aboutRef}>
                        <button
                            onClick={(e) => toggleDropdown('about', e)}
                            className="hover:text-white transition-colors duration-200 flex items-center"
                        >
                            About Us
                            <motion.svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ rotate: aboutOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </motion.svg>
                        </button>

                        <AnimatePresence>
                            {aboutOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-2 w-48 bg-gray-800 text-gray-300 rounded-md shadow-lg z-50 overflow-hidden"
                                >
                                    <Link
                                        href="/about/our-mission"
                                        className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        Our Mission
                                    </Link>
                                    <Link
                                        href="/about/our-clients"
                                        className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        Our Clients
                                    </Link>
                                    <Link
                                        href="/testimonials"
                                        className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        Testimonials
                                    </Link>
                                    <Link
                                        href="/about/our-team"
                                        className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        Our Team
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link
                        href="/careers"
                        className={`hover:text-white transition-colors duration-200 ${isActivePath('/careers') ? 'text-white' : ''
                            }`}
                    >
                        Career
                    </Link>

                    <Link
                        href="/contact"
                        className={`hover:text-white transition-colors duration-200 ${isActivePath('/contact') ? 'text-white' : ''
                            }`}
                    >
                        Contact
                    </Link>

                    {/* CTA */}
                    <Link
                        href="/ai-chat"
                        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                        🚀 Try BTM Security AI
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-gray-300 focus:outline-none"
                >
                    <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden mt-4 space-y-2 bg-gray-800 rounded-lg p-4"
                    >
                        <Link
                            href="/"
                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>

                        {/* Mobile Services Dropdown */}
                        <div ref={mobileServicesRef}>
                            <button
                                onClick={() => setServicesOpen(!servicesOpen)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded flex justify-between items-center transition-colors duration-200"
                            >
                                Services
                                <span>{servicesOpen ? '▾' : '▸'}</span>
                            </button>

                            <AnimatePresence>
                                {servicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="ml-4 mt-1 space-y-1"
                                    >
                                        <Link
                                            href="/services"
                                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                            onClick={() => {
                                                setMobileMenuOpen(false)
                                                closeAllDropdowns()
                                            }}
                                        >
                                            What We Do
                                        </Link>

                                        {/* Nested Mobile Dropdown */}
                                        <div>
                                            <button
                                                onClick={() => setNestedOpen(!nestedOpen)}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded flex justify-between items-center transition-colors duration-200"
                                            >
                                                Security Training
                                                <span>{nestedOpen ? '▾' : '▸'}</span>
                                            </button>

                                            <AnimatePresence>
                                                {nestedOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="ml-4 mt-1 space-y-1"
                                                    >
                                                        <Link
                                                            href="/enrollment"
                                                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                                            onClick={() => {
                                                                setMobileMenuOpen(false)
                                                                closeAllDropdowns()
                                                            }}
                                                        >
                                                            Our Training
                                                        </Link>
                                                        <Link
                                                            href="/licenced-trainers"
                                                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                                            onClick={() => {
                                                                setMobileMenuOpen(false)
                                                                closeAllDropdowns()
                                                            }}
                                                        >
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

                        {/* Mobile Pricing Link */}
                        <Link
                            href="/pricing"
                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>

                        {/* Mobile Resources Dropdown */}
                        <div ref={mobileResourcesRef}>
                            <button
                                onClick={() => setResourcesOpen(!resourcesOpen)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded flex justify-between items-center transition-colors duration-200"
                            >
                                Resources
                                <span>{resourcesOpen ? '▾' : '▸'}</span>
                            </button>

                            <AnimatePresence>
                                {resourcesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="ml-4 mt-1 space-y-1"
                                    >
                                        <Link
                                            href="/blog"
                                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                            onClick={() => {
                                                setMobileMenuOpen(false)
                                                closeAllDropdowns()
                                            }}
                                        >
                                            Blog
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile About Us Dropdown */}
                        <div ref={mobileAboutRef}>
                            <button
                                onClick={() => setAboutOpen(!aboutOpen)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded flex justify-between items-center transition-colors duration-200"
                            >
                                About Us
                                <span>{aboutOpen ? '▾' : '▸'}{''} </span>
                            </button>

                            <AnimatePresence>
                                {aboutOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="ml-4 mt-1 space-y-1"
                                    >
                                        <Link
                                            href="/about/our-mission"
                                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                            onClick={() => {
                                                setMobileMenuOpen(false)
                                                closeAllDropdowns()
                                            }}
                                        >
                                            Our Mission
                                        </Link>
                                        <Link
                                            href="/about/our-clients"
                                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                            onClick={() => {
                                                setMobileMenuOpen(false)
                                                closeAllDropdowns()
                                            }}
                                        >
                                            Our Clients
                                        </Link>
                                        <Link
                                            href="/testimonials"
                                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                            onClick={() => {
                                                setMobileMenuOpen(false)
                                                closeAllDropdowns()
                                            }}
                                        >
                                            Testimonials
                                        </Link>
                                        <Link
                                            href="/about/our-team"
                                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                                            onClick={() => {
                                                setMobileMenuOpen(false)
                                                closeAllDropdowns()
                                            }}
                                        >
                                            Our Team
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href="/careers"
                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Career
                        </Link>

                        <Link
                            href="/contact"
                            className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        {/* Mobile CTA */}
                        <Link
                            href="/ai-chat"
                            className="block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            🚀 Try BTM Security AI
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navigation