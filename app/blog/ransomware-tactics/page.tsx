'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function EmergingRansomwareTactics() {
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

  // Escape the AWS CLI code to prevent JSX parsing issues
  const awsCode = `# Example of malicious cloud API call (simplified)
aws ec2 create-snapshot --volume-id vol-123456 \\
    --description "Backup before encryption" \\
    --tag-specifications 'ResourceType=snapshot,Tags=[{Key=ransom,Value=pay}]'`

  return (
    <>
      <Head>
        <title>Emerging Ransomware Tactics | BTMSecurity</title>
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
                  Threat Intelligence
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Emerging <span className="gradient-text">Ransomware Tactics</span> in 2025</h1>
                <p className="text-xl text-blue-200 mb-4">Analysis of the latest ransomware techniques and how organizations can strengthen their defenses.</p>
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <span>January 27, 2025</span>
                  <span>•</span>
                  <span>10 min read</span>
                  <span>•</span>
                  <span>By <a href="#" className="text-blue-400">Mark Richardson</a>, Threat Research Team</span>
                </div>
              </header>

              <img src="/img/ransomware.jpg" 
                   alt="Hacker with ransomware code" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The ransomware landscape has evolved dramatically in 2025, with attackers leveraging AI, quantum computing, and novel extortion methods. Our latest research reveals a <strong>400% increase</strong> in sophisticated ransomware campaigns compared to 2023, with average ransom demands now exceeding $5.3 million for enterprise targets.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">The New Ransomware Playbook</h2>
              <p className="text-gray-300 mb-6">Modern ransomware groups have moved beyond simple file encryption to multi-stage extortion ecosystems:</p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-blue-400 text-2xl mb-3">
                    <i className="fas fa-brain"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI-Powered Targeting</h3>
                  <p className="text-gray-300">Machine learning models analyze victim financials to optimize ransom demands and predict payment likelihood with 92% accuracy.</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-blue-400 text-2xl mb-3">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Lightning Encryption</h3>
                  <p className="text-gray-300">New algorithms encrypt 1TB in under 3 minutes using GPU-accelerated quantum-resistant cryptography.</p>
                </div>
              </div>

              <img src="/img/incident.jpg" 
                   alt="Ransomware attack visualization" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />

              <div className="border-l-4 border-blue-500 pl-4 my-8 bg-gray-800 bg-opacity-30 py-3">
                <p className="italic text-gray-300">
                  "We observed a ransomware group that used AI-generated voice clones to call executives' families, demanding personal payments to prevent data leaks. This psychological warfare tactic increased payment rates by 65%."
                </p>
                <p className="text-sm text-gray-400 mt-2">- BTM Incident Response Team</p>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Four Critical Attack Vectors</h2>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">1. Cloud-Native Ransomware</h3>
              <p className="text-gray-300 mb-4">Attackers now target cloud infrastructure APIs directly:</p>
              
              <div className="bg-black bg-opacity-50 p-4 rounded-lg my-4 overflow-x-auto">
                <pre className="text-sm text-green-300 whitespace-pre-wrap">
                  {awsCode}
                </pre>
              </div>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">2. Data Poisoning Attacks</h3>
              <p className="text-gray-300 mb-4">Ransomware now corrupts backups and archives with subtle data alterations:</p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li>Modifies database indexes to appear intact but return corrupted data</li>
                <li>Alters 0.1% of pixels in image backups to fail AI validation checks</li>
                <li>Inject bit errors in compressed archives that trigger CRC failures</li>
              </ul>

              <img src="/img/cloud-sec.jpg" 
                   alt="Cloud security concept" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">3. Supply Chain Sleepers</h3>
              <p className="text-gray-300 mb-4">Malware lies dormant in vendor software updates for months:</p>
              <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 my-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-900 bg-opacity-50 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-clock text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Case Study: 2025 Tax Software Attack</h4>
                    <p className="text-gray-300">Ransomware delivered through accounting software updates activated during tax season, affecting 12,000 businesses simultaneously.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">4. Quantum Extortion</h3>
              <p className="text-gray-300 mb-4">Threats to publish data encrypted with quantum-vulnerable algorithms:</p>
              <table className="w-full border border-gray-600 my-6">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left">Algorithm</th>
                    <th className="p-3 text-left">Quantum Break Risk</th>
                    <th className="p-3 text-left">Common Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-600">
                    <td className="p-3">RSA-2048</td>
                    <td className="p-3">High (2027 estimate)</td>
                    <td className="p-3">TLS, SSH, PGP</td>
                  </tr>
                  <tr className="border-t border-gray-600 bg-gray-700 bg-opacity-30">
                    <td className="p-3">ECC-256</td>
                    <td className="p-3">Medium (2030 estimate)</td>
                    <td className="p-3">Blockchain, Mobile</td>
                  </tr>
                  <tr className="border-t border-gray-600">
                    <td className="p-3">AES-256</td>
                    <td className="p-3">Low (2040+ estimate)</td>
                    <td className="p-3">Disk encryption</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Defensive Strategies</h2>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <i className="fas fa-shield-alt text-blue-400 mr-3"></i>
                    Immediate Actions
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Implement AI-assisted anomaly detection</li>
                    <li>Enforce quantum-resistant encryption for backups</li>
                    <li>Conduct supply chain audits for dormant payloads</li>
                  </ul>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <i className="fas fa-chess-knight text-blue-400 mr-3"></i>
                    Long-Term Prep
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Develop crypto-agile infrastructure</li>
                    <li>Train staff on deepfake social engineering</li>
                    <li>Build isolated recovery environments</li>
                  </ul>
                </div>
              </div>

              <img src="/img/ai-cyber.jpg" 
                   alt="Cyber defense concept" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-12">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <i className="fas fa-chart-line text-blue-400 mr-3"></i>
                  Effectiveness of New Defenses
                </h3>
                <p className="text-gray-300">
                  Organizations implementing AI-assisted detection saw <strong>78% faster</strong> ransomware identification and <strong>93% reduction</strong> in encryption success rates compared to traditional signature-based methods (BTMSecurity 2025 Data).
                </p>
              </div>

              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6">About the Author</h3>
                <div className="flex items-start">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                       alt="Mark Richardson" 
                       className="w-16 h-16 rounded-full object-cover mr-6" />
                  <div>
                    <h4 className="text-xl font-bold">Mark Richardson</h4>
                    <p className="text-gray-400 mb-3">Lead Threat Researcher, BTMSecurity</p>
                    <p className="text-gray-300">
                      Former NSA cryptanalyst specializing in ransomware countermeasures. Developed the "Triple-Lock" recovery protocol used by critical infrastructure providers worldwide.
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