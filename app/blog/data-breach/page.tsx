'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function UnitedHealthBreach() {
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
        <title>The UnitedHealth Breach: Lessons for Healthcare Security | BTMSecurity</title>
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
                  Threat Analysis <span className="alert-badge">ACTIVE THREAT</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">The <span className="gradient-text">UnitedHealth Breach</span>: A Wake-Up Call for Healthcare Security</h1>
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <span>January 15, 2025</span>
                  <span>•</span>
                  <span>5 mins read</span>
                  <span>•</span>
                  <span>By <a href="#" className="text-blue-400">Ayu Lestari</a>, Healthcare Security Specialist</span>
                </div>
              </header>

              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                   alt="Healthcare data breach concept" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">The Change Healthcare attack disrupted prescriptions for millions of Americans</p>

              <div className="cisa-alert">
                <div className="flex items-center">
                  <i className="fas fa-triangle-exclamation text-yellow-300 mr-3 text-xl"></i>
                  <div>
                    <h3 className="font-bold">CISA Alert (AA24-109A)</h3>
                    <p className="text-sm">This attack is part of an ongoing ALPHV/BlackCat ransomware campaign targeting healthcare providers.</p>
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The February 2024 cyberattack on UnitedHealth Group's Change Healthcare subsidiary caused <strong>$872 million in losses</strong>, disrupted prescription services for <strong>70% of US pharmacies</strong>, and exposed data for <strong>1 in 3 Americans</strong>. Our analysis reveals critical security gaps that allowed this unprecedented healthcare breach.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Attack Timeline: What We Know</h2>
              
              <div className="breach-timeline">
                <div className="timeline-event">
                  <h3 className="font-bold text-blue-400">Feb 12: Initial Access</h3>
                  <p className="text-gray-300">Attackers used stolen credentials to access a Citrix portal <strong>without MFA</strong> (CISA confirmed).</p>
                </div>
                <div className="timeline-event">
                  <h3 className="font-bold text-blue-400">Feb 21: Disruption Begins</h3>
                  <p className="text-gray-300">ALPHV ransomware deployed, encrypting systems handling <strong>15 billion healthcare transactions annually</strong>.</p>
                </div>
                <div className="timeline-event">
                  <h3 className="font-bold text-blue-400">Mar 1: Data Theft Confirmed</h3>
                  <p className="text-gray-300">6TB of sensitive data exfiltrated, including <strong>medical records, payment info, and PHI</strong>.</p>
                </div>
                <div className="timeline-event">
                  <h3 className="font-bold text-blue-400">Apr 22: $22M Ransom Paid</h3>
                  <p className="text-gray-300">Confirmed by blockchain analysis, despite ALPHV's exit scam.</p>
                </div>
              </div>

              <img src="/img/network-attack.jpg" 
                   alt="Network attack visualization" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Critical Security Failures</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-red-400 text-2xl mb-3">
                    <i className="fas fa-lock-open"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">No Multi-Factor Authentication</h3>
                  <p className="text-gray-300">The Citrix portal lacked MFA despite <strong>known vulnerabilities</strong> (CVE-2023-4966).</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-red-400 text-2xl mb-3">
                    <i className="fas fa-network-wired"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Flat Network Architecture</h3>
                  <p className="text-gray-300">Lateral movement was unchecked between <strong>payment systems and clinical data</strong>.</p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 my-8 bg-gray-800 bg-opacity-30 py-3">
                <p className="italic text-gray-300">
                  "This wasn't just an IT failure—it was a systemic risk management breakdown. Change Healthcare processed 50% of US medical claims but hadn't segmented these critical systems from general corporate networks."
                </p>
                <p className="text-sm text-gray-400 mt-2">- Former UnitedHealth CISO (anonymous)</p>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">How to Prevent Similar Attacks</h2>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">1. Immediate Mitigations (CISA-recommended)</h3>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li><strong>Enforce MFA on all remote access</strong> (especially legacy systems like Citrix)</li>
                <li><strong>Isolate payment systems</strong> from clinical networks</li>
                <li><strong>Monitor for BlackCat TTPs</strong>: 
                  <span className="code bg-gray-700 px-1 rounded">PsExec</span>, 
                  <span className="code bg-gray-700 px-1 rounded">Cobalt Strike</span>, 
                  <span className="code bg-gray-700 px-1 rounded">Rust-based malware</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">2. Long-Term Fixes</h3>
              <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 my-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-900 bg-opacity-50 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-shield-alt text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Healthcare-Specific Controls</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Implement <strong>HIPAA-compliant EDR</strong> with medical device visibility</li>
                      <li>Conduct <strong>patient safety impact assessments</strong> for cyber incidents</li>
                      <li>Adopt <strong>HHS 405(d) guidelines</strong> for healthcare cybersecurity</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">3. Regulatory Changes</h3>
              <table className="w-full border border-gray-600 my-6">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left">Policy</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-600">
                    <td className="p-3">HHS Cybersecurity Performance Goals</td>
                    <td className="p-3">Voluntary (2024)</td>
                    <td className="p-3">May become mandatory after breach</td>
                  </tr>
                  <tr className="border-t border-gray-600 bg-gray-700 bg-opacity-30">
                    <td className="p-3">FDA Medical Device Security Rules</td>
                    <td className="p-3">Draft (2025)</td>
                    <td className="p-3">Will require SBOMs for healthcare tech</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-12">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <i className="fas fa-lightbulb text-blue-400 mr-3"></i>
                  Key Insight
                </h3>
                <p className="text-gray-300">
                  Healthcare organizations with <strong>fully segmented networks</strong> experienced <strong>82% less operational disruption</strong> during ransomware attacks compared to flat networks (2024 HHS Report).
                </p>
              </div>

              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6">About the Author</h3>
                <div className="flex items-start">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                       alt="Ayu Lestari" 
                       className="w-16 h-16 rounded-full object-cover mr-6" />
                  <div>
                    <h4 className="text-xl font-bold">Dr. Ayu Lestari</h4>
                    <p className="text-gray-400 mb-3">Healthcare Security Specialist, BTMSecurity</p>
                    <p className="text-gray-300">
                      Former Chief Medical Information Officer (CMIO) at Mayo Clinic. Led HIPAA compliance for 12 hospital systems. Co-author of NIST SP 1800-26 on healthcare cybersecurity.
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
          край
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
          color: #60a5fa;
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
          край
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