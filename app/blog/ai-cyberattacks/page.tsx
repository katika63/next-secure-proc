'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function AICyberThreats() {
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
        <title>AI Cyber Threats | BTMSecurity</title>
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6">The Rise of <span className="gradient-text">AI-Powered Cyberattacks</span></h1>
                <p className="text-xl text-blue-200 mb-4">The cybersecurity landscape is undergoing a seismic shift as artificial intelligence becomes weaponized.</p>
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <span>May 22, 2025</span>
                  <span>•</span>
                  <span>3 mins read</span>
                  <span>•</span>
                  <span>By <a href="#" className="text-blue-400"> Amir Al-Farouqi</a></span>
                </div>
              </header>

              <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden mb-12">
                <div className="h-64 bg-gradient-to-r from-blue-900 to-blue-800 flex items-center justify-center">
                  <img src="/img/ai-cyber-attacks.jpg" alt="AI Cybersecurity" className="h-full object-cover w-full opacity-90" />
                </div>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The cybersecurity landscape is undergoing a seismic shift as artificial intelligence becomes weaponized by threat actors. Our latest threat intelligence reports show a <strong>300% increase</strong> in AI-powered attacks since Q1 2024, requiring fundamentally new defense paradigms.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">The New AI Attack Toolkit</h2>
              <p className="text-gray-300 mb-6">Dark web markets now offer specialized AI tools that lower the barrier to entry for cybercriminals:</p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-blue-400 text-2xl mb-3">
                    <i className="fas fa-language"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Polyglot Phishing</h3>
                  <p className="text-gray-300">AI-generated emails that adapt linguistic patterns to match the recipient's communication style with 98% accuracy.</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-blue-400 text-2xl mb-3">
                    <i className="fas fa-code"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Polymorphic Malware</h3>
                  <p className="text-gray-300">Self-modifying code that changes its signature faster than traditional AV can update definitions.</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-blue-400 text-2xl mb-3">
                    <i className="fas fa-fingerprint"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Behavioral Spoofing</h3>
                  <p className="text-gray-300">AI that learns normal user patterns to bypass anomaly detection systems.</p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 my-8 bg-gray-800 bg-opacity-30 py-3">
                <p className="italic text-gray-300">
                  "We intercepted a campaign where AI-generated voice clones successfully bypassed voice authentication systems at three major banks. The attackers trained the models using just 30 seconds of publicly available CEO interview footage."
                </p>
                <p className="text-sm text-gray-400 mt-2">- BTM Threat Intelligence Team</p>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Defensive Countermeasures</h2>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">1. AI vs. AI Defense</h3>
              <p className="text-gray-300 mb-4">Next-generation security systems now employ defensive AI to detect adversarial patterns:</p>
              
              <div className="bg-black bg-opacity-50 p-4 rounded-lg my-4 overflow-x-auto">
                <pre><code className="text-sm text-green-300"># Sample AI defense rule (pseudo-code)
if (email.sender_verification == 'pass' 
    && email.language_model_score &gt; 0.92 
    && email.behavioral_anomaly == True):
    
    quarantine()
    alert.threat_level = 'CRITICAL'
    initiate_incident_response()</code></pre>
              </div>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">2. Enhanced Authentication</h3>
              <p className="text-gray-300 mb-4">Multi-factor authentication is evolving to counter AI threats:</p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li><strong>Biometric liveness detection</strong> - Preventing deepfake bypass attempts</li>
                <li><strong>Context-aware challenges</strong> - Location, device, and behavior factors</li>
                <li><strong>Quantum-resistant cryptography</strong> - Preparing for future AI decryption</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">3. Deception Technology</h3>
              <p className="text-gray-300 mb-4">We're deploying AI-powered honeypots that learn from attacker behavior:</p>
              <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 my-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-900 bg-opacity-50 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-ghost text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-white">Adaptive Honeynets</h4>
                    <p className="text-gray-300">Self-configuring decoy networks that evolve based on attacker TTPs (Tactics, Techniques, and Procedures).</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Implementation Roadmap</h2>
              <table className="w-full border border-gray-600 my-6">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left text-white">Timeframe</th>
                    <th className="p-3 text-left text-white">Action Items</th>
                    <th className="p-3 text-left text-white">Success Metrics</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-600">
                    <td className="p-3 text-gray-300">Month 1-2</td>
                    <td className="p-3 text-gray-300">Deploy behavioral analytics</td>
                    <td className="p-3 text-gray-300">30% reduction in phishing success</td>
                  </tr>
                  <tr className="border-t border-gray-600 bg-gray-700 bg-opacity-30">
                    <td className="p-3 text-gray-300">Month 3-4</td>
                    <td className="p-3 text-gray-300">Implement AI threat hunting</td>
                    <td className="p-3 text-gray-300">Mean detection time &lt; 15 minutes</td>
                  </tr>
                  <tr className="border-t border-gray-600">
                    <td className="p-3 text-gray-300">Ongoing</td>
                    <td className="p-3 text-gray-300">Continuous adversarial training</td>
                    <td className="p-3 text-gray-300">90%+ detection rate on red team exercises</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-12">
                <h3 className="text-xl font-bold mb-3 flex items-center text-white">
                  <i className="fas fa-lightbulb text-blue-400 mr-3"></i>
                  Key Insight
                </h3>
                <p className="text-gray-300">
                  Organizations using AI-enhanced defenses see <strong>89% faster</strong> threat detection and <strong>60% lower</strong> incident response costs compared to traditional methods, based on our 2024 client data.
                </p>
              </div>

              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6 text-white">About the Author</h3>
                <div className="flex items-start">
                  <img src="/img/amir.jpg" 
                       alt="Amir Al-Farouqi" 
                       className="w-16 h-16 rounded-full object-cover mr-6" />
                  <div>
                    <h4 className="text-xl font-bold text-white">Amir Al-Farouqi</h4>
                    <p className="text-gray-400 mb-3">Chief Threat Researcher, BTMSecurity</p>
                    <p className="text-gray-300">
                      Experienced in adversarial AI research. Contributed to MITRE ATT&CK framework. Developed patented algorithms for behavioral anomaly detection used by Fortune 500 companies.
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
          color: #60a5fa;
        }
        .blog-content h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #93c5fd;
        }
        .blog-content code {
          background: rgba(0,0,0,0.3);
          padding: 0.2rem 0.4rem;
          край
          font-family: monospace;
        }
        [x-cloak] {
          display: none !important;
        }
      `}</style>
    </>
  )
}