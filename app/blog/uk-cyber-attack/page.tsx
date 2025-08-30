'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function UKLegalAidCyberAttack() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [trainingOpen, setTrainingOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [nestedOpen, setNestedOpen] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useEffect(() => {
    // Check if scripts are already loaded
    if (scriptsLoaded) return

    // Load external scripts
    const loadScripts = async () => {
      // Load Three.js
      if (typeof window !== 'undefined' && !window.THREE) {
        const threeScript = document.createElement('script')
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
        threeScript.async = true
        threeScript.onload = () => {
          // Load Vanta.js after Three.js is loaded
          if (typeof window !== 'undefined' && !window.VANTA) {
            const vantaScript = document.createElement('script')
            vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js'
            vantaScript.async = true
            vantaScript.onload = () => {
              if (window.VANTA) {
                window.VANTA.NET({
                  el: "#vanta-bg",
                  mouseControls: true,
                  touchControls: true,
                  gyroControls: false,
                  minHeight: 200.00,
                  minWidth: 200.00,
                  scale: 1.00,
                  scaleMobile: 1.00,
                  color: 0x3b82f6,
                  backgroundColor: 0x111827,
                  points: 12.00,
                  maxDistance: 22.00,
                  spacing: 18.00
                })
              }
              setScriptsLoaded(true)
            }
            document.head.appendChild(vantaScript)
          }
        }
        document.head.appendChild(threeScript)
      }

      // Load Alpine.js if not already loaded
      if (typeof window !== 'undefined' && !(window as any).Alpine) {
        const alpineScript = document.createElement('script')
        alpineScript.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js'
        alpineScript.defer = true
        document.head.appendChild(alpineScript)
      }
    }

    loadScripts()

    // Smooth scrolling for navigation links
    const smoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault()
          const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
          const target = href ? document.querySelector(href) : null
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            })
          }
        })
      })
    }

    smoothScroll()

    return () => {
      // Clean up Vanta effect if needed
      if (window.VANTA && typeof window.VANTA?.NET?.destroy === 'function') {
        window.VANTA.NET.destroy()
      }
    }
  }, [scriptsLoaded])

  return (
    <>
      <Head>
        <title>UK's Legal Aid Cyber Attack: Everything We Know | BTMSecurity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <div id="vanta-bg" className="fixed top-0 left-0 w-full h-full z-0"></div>
      <div className="content-wrapper min-h-screen">
        {/* REMOVED NAVIGATION SECTION */}

        {/* Blog Article */}
        <section className="py-20 px-6">
          <div className="blog-content">
            <article className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <header className="mb-16 text-center">
                <div className="inline-block bg-blue-900 bg-opacity-50 text-blue-300 px-4 py-2 rounded-full text-sm mb-4">
                  Threat Analysis <span className="alert-badge">ACTIVE INCIDENT</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">UK's <span className="gradient-text">Legal Aid Cyber Attack</span>: Everything We Know So Far</h1>
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <span>May 20, 2025</span>
                  <span>•</span>
                  <span>12 min read</span>
                  <span>•</span>
                  <span>By <a href="#" className="text-blue-400">James Wilson</a>, UK Cybersecurity Analyst</span>
                </div>
              </header>

              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                   alt="UK Legal System" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">The UK's Legal Aid Agency breach exposes vulnerabilities in government systems </p>

              <div className="cisa-alert">
                <div className="flex items-center">
                  <i className="fas fa-triangle-exclamation text-yellow-300 mr-3 text-xl"></i>
                  <div>
                    <h3 className="font-bold">NCSC Alert (AA25-142B)</h3>
                    <p className="text-sm">This attack is part of an increasing trend targeting government services infrastructure.</p>
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The UK's Legal Aid Agency (LAA), overseen by the Ministry of Justice, has fallen victim to a major cyber attack. Many are estimating that this is one of the most significant breaches of sensitive data in the UK's legal sector to date. The attack has exposed deeply confidential information and disrupted critical services, triggering national concern.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">What is the Legal Aid Agency?</h2>
              <p className="text-gray-300 mb-6">
                The Legal Aid Agency UK is an executive agency of the Ministry of Justice. It provides criminal and civil legal aid and advice in England and Wales. The agency helps the public deal with legal problems through solicitors, barristers and the not-for-profit sector.
              </p>
              <p className="text-gray-300 mb-6">
                Eligibility for legal aid depends on an applicant's financial situation and the merits of their case. This means the agency handles extremely sensitive personal and financial information for some of society's most vulnerable individuals.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">The Breach Timeline</h2>
              
              <div className="breach-timeline">
                <div className="timeline-event">
                  <h3 className="font-bold text-blue-400">April 23: Initial Discovery</h3>
                  <p className="text-gray-300">Ministry of Justice detects unauthorized access to LAA systems during routine monitoring.</p>
                </div>
                <div className="timeline-event">
                  <h3 className="font-bold text-blue-400">April 25: Services Disrupted</h3>
                  <p className="text-gray-300">Critical systems taken offline as investigation begins, affecting legal aid applications nationwide.</p>
                </div>
                <div className="timeline-event">
                  <h3 className="font-bold text-blue-400">May 16: Full Scale Revealed</h3>
                  <p className="text-gray-300">Investigation confirms breach of over <strong>2 million records</strong> dating back to 2010.</p>
                </div>
              </div>

              <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                   alt="Cyber attack visualization" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">What Data Was Compromised?</h2>
              <p className="text-gray-300 mb-6">
                The breach affects both legal professionals and individuals who have applied for legal aid. The exposed data includes:
              </p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li>Full names and contact details</li>
                <li>Dates of birth and National Insurance numbers</li>
                <li>Financial records and debt information</li>
                <li>Criminal history and sensitive legal data</li>
                <li>Employment and housing status</li>
              </ul>

              <div className="border-l-4 border-red-500 pl-4 my-8 bg-gray-800 bg-opacity-30 py-3">
                <p className="italic text-gray-300">
                  "Given the nature of legal aid cases, many affected individuals are already vulnerable. This includes victims of domestic violence, individuals undergoing family disputes, and those facing criminal prosecution. The exposure raises significant concerns about fraud, identity theft, and personal safety."
                </p>
                <p className="text-sm text-gray-400 mt-2">- Ministry of Justice spokesperson</p>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">What Went Wrong?</h2>
              <p className="text-gray-300 mb-6">
                While the full attack vector hasn't been disclosed, cybersecurity experts point to several likely factors:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-red-400 text-2xl mb-3">
                    <i className="fas fa-server"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Outdated Infrastructure</h3>
                  <p className="text-gray-300">Heavy reliance on legacy systems with known vulnerabilities that weren't patched.</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-red-400 text-2xl mb-3">
                    <i className="fas fa-shield-virus"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Inadequate Segmentation</h3>
                  <p className="text-gray-300">Failure to properly isolate sensitive data from general network access.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Response and Recommendations</h2>
              <p className="text-gray-300 mb-6">
                The LAA has taken several actions since discovering the breach:
              </p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li>Collaborated with National Crime Agency and NCSC</li>
                <li>Notified the Information Commissioner's Office</li>
                <li>Issued guidance to affected individuals</li>
                <li>Begun system-wide security overhaul</li>
              </ul>

              <div className="key-lesson">
                <h3 className="text-lg font-bold mb-2">Affected individuals should:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Remain vigilant against suspicious communications</li>
                  <li>Update potentially exposed passwords</li>
                  <li>Verify identities before sharing information</li>
                  <li>Monitor financial accounts for unusual activity</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Key Lessons for Organizations</h2>
              <p className="text-gray-300 mb-6">
                This attack follows other high-profile UK breaches (Harrods, Marks & Spencer, Co-op) and offers critical lessons:
              </p>

              <div className="key-lesson">
                <h3 className="text-lg font-bold mb-2">1. Outdated systems are a liability</h3>
                <p className="text-gray-300">Legacy technology often contains known vulnerabilities that criminals exploit. The continued use of unsupported systems significantly increases cyber risk.</p>
              </div>

              <div className="key-lesson">
                <h3 className="text-lg font-bold mb-2">2. Regular security audits are essential</h3>
                <p className="text-gray-300">Identifying and addressing weaknesses before they're exploited is crucial. This requires regular penetration testing and staying informed about emerging threats.</p>
              </div>

              <div className="key-lesson">
                <h3 className="text-lg font-bold mb-2">3. Incident Response Plans must be ready</h3>
                <p className="text-gray-300">Every organization needs well-defined response plans and trained personnel ready to act decisively when breaches occur.</p>
              </div>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-12">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <i className="fas fa-lightbulb text-blue-400 mr-3"></i>
                  Critical Insight
                </h3>
                <p className="text-gray-300">
                  Government agencies handling sensitive data experienced <strong>73% more cyber attacks</strong> in 2024 than the previous year (NCSC Annual Report). The public sector must prioritize cybersecurity funding and modernization.
                </p>
              </div>

              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6">About the Author</h3>
                <div className="flex items-start">
                  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                       alt="Priya Sharma" 
                       className="w-16 h-16 rounded-full object-cover mr-6" />
                  <div>
                    <h4 className="text-xl font-bold"> Priya Sharma</h4>
                    <p className="text-gray-400 mb-3">Head of Cybersecurity Research, BTMSecurity</p>
                    <p className="text-gray-300">
                      Former Director of Cyber Defense at NCSC with 12 years experience in critical infrastructure protection.
                      Holds a PhD in Computer Science from Oxford and multiple SANS certifications.
                    </p>
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </section>

        {/* REMOVED FOOTER SECTION */}
      </div>

      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .nav-link {
          position: relative;
        }
        .nav-link:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #3b82f6;
          transition: width 0.3s ease;
        }
        .nav-link:hover:after {
          width: 100%;
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .testimonial-card {
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          transform: scale(1.05);
        }
        #vanta-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .content-wrapper {
          position: relative;
          z-index: 1;
          background-color: rgba(15, 23, 42, 0.7);
        }
        .blog-content {
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }
        .blog-content h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #93c5fd;
        }
        .blog-image {
          border-radius: 0.5rem;
          margin: 2rem auto;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .breach-timeline {
          border-left: 3px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 2rem 0;
        }
        .timeline-event {
          position: relative;
          padding-bottom: 2rem;
        }
        .timeline-event:before {
          content: '';
          position: absolute;
          left: -1.7rem;
          top: 0.3rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #3b82f6;
        }
        .alert-badge {
          background-color: #ef4444;
          color: white;
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-block;
          margin-left: 0.5rem;
        }
        .cisa-alert {
          background-color: #1e40af;
          color: white;
          border-radius: 6px;
          padding: 1rem;
          margin: 2rem 0;
        }
        .key-lesson {
          background-color: rgba(30, 64, 175, 0.2);
          border-left: 4px solid #3b82f6;
          padding: 1rem;
          margin: 1.5rem 0;
        }
        .blog-content code {
          background: rgba(0,0,0,0.3);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }
        [x-cloak] {
          display: none !important;
        }
      `}</style>
    </>
  )
}