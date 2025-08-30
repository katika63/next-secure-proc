'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function QRCodesCybersecurity() {
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
        <title>QR Codes in Cybersecurity: Convenience Meets Caution | BTMSecurity</title>
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
              {/* Article Header */}
              <header className="mb-16 text-center">
                <div className="inline-block bg-blue-900 bg-opacity-50 text-blue-300 px-4 py-2 rounded-full text-sm mb-4">
                  Threat Analysis <span className="bg-yellow-500 text-gray-900 rounded-full px-2 py-1 ml-2">EMERGING RISK</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Codes in Cybersecurity: <span className="gradient-text">Convenience Meets Caution</span></h1>
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <span>February 9, 2025</span>
                  <span>•</span>
                  <span>12 min read</span>
                  <span>•</span>
                  <span>By <a href="#" className="text-blue-400">Mei Zhang</a>, Mobile Security Specialist</span>
                </div>
              </header>

              {/* Featured Image */}
              <img src="/img/qr-code.jpg" 
                   alt="QR code security concept" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">QR codes bridge physical and digital worlds - but create new security risks </p>

              {/* Introduction */}
              <div className="intro-section mb-12">
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  In our increasingly contactless world, QR codes have become the invisible bridges between physical objects and digital experiences. From restaurant menus to payment terminals, these pixelated squares promise instant access with a simple scan. But this convenience comes with hidden dangers that cybersecurity professionals can no longer ignore.
                </p>
                <div className="warning-box">
                  <div className="flex items-start">
                    <i className="fas fa-exclamation-triangle text-red-400 text-xl mr-3 mt-1"></i>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-red-400">The Scanning Paradox</h3>
                      <p className="text-gray-300">
                        Unlike traditional web links where users can inspect URLs before clicking, QR codes completely obscure their destination. This creates perfect conditions for social engineering, as users develop automatic "scanning reflexes" without security awareness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 1: Understanding QR Code Risks */}
              <section className="risk-section mb-16">
                <h2 className="text-3xl font-bold mb-6 gradient-text">The Hidden Dangers in Those Black and White Squares</h2>
                
                <div className="qr-comparison">
                  <div className="qr-example">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.btmsec.com/verify" 
                         alt="Legitimate QR code"
                         className="mx-auto mb-2 w-40 h-40" />
                    <p className="text-sm text-gray-400">Legitimate branded QR code</p>
                  </div>
                  <div className="qr-example">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://btm-secur1ty.com/login" 
                         alt="Malicious QR code"
                         className="mx-auto mb-2 w-40 h-40" />
                    <p className="text-sm text-gray-400">Malicious lookalike QR code</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-blue-400">Four Emerging QR Code Threat Vectors</h3>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                    <div className="text-red-400 text-2xl mb-3">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Quishing (QR Phishing)</h4>
                    <p className="text-gray-300">The new frontier of phishing embeds malicious QR codes in emails, bypassing traditional link scanners. A 2025 Proofpoint study found quishing attacks increased 412% year-over-year.</p>
                  </div>
                  <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                    <div className="text-red-400 text-2xl mb-3">
                      <i className="fas fa-sticky-note"></i>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Physical Code Swapping</h4>
                    <p className="text-gray-300">Attackers place fraudulent stickers over legitimate QR codes in public spaces. The FBI's 2024 Internet Crime Report documented cases in 32 states.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                    <div className="text-red-400 text-2xl mb-3">
                      <i className="fas fa-wifi"></i>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Rogue Network Joins</h4>
                    <p className="text-gray-300">Many QR scanners automatically connect to WiFi networks, enabling "Evil Twin" attacks that intercept all device traffic through fake access points.</p>
                  </div>
                  <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                    <div className="text-red-400 text-2xl mb-3">
                      <i className="fas fa-download"></i>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Drive-By Downloads</h4>
                    <p className="text-gray-300">QR codes can trigger automatic downloads of malicious payloads, exploiting unpatched mobile OS vulnerabilities identified in CVE-2025-21479.</p>
                  </div>
                </div>
              </section>

              <div className="section-divider"></div>

              {/* Section 2: Enterprise Protection Strategies */}
              <section className="protection-section mb-16">
                <h2 className="text-3xl font-bold mb-6 gradient-text">Building Organizational Defenses</h2>
                
                <div className="best-practice">
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                      <span>1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-green-400">Policy Framework Development</h3>
                      <p className="text-gray-300 mb-4">
                        Establish clear governance around QR code usage in corporate environments:
                      </p>
                      <ul className="checklist">
                        <li>Create an approved QR code generator list with security requirements (HTTPS, no editing post-creation)</li>
                        <li>Mandate visual verification of all physical QR codes before scanning</li>
                        <li>Require multi-factor authentication for any QR-initiated logins</li>
                        <li>Implement scanning logs for incident response tracing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="best-practice">
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                      <span>2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-green-400">Technical Safeguards</h3>
                      <p className="text-gray-300">
                        Deploy mobile security solutions that provide:
                      </p>
                      <ul className="checklist">
                        <li>Real-time URL analysis before QR code destinations load</li>
                        <li>Automated blocking of known malicious QR domains</li>
                        <li>Disabling of automatic WiFi joins and file downloads</li>
                        <li>Integration with existing SIEM systems for threat correlation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="case-study bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 mt-8">
                  <div className="flex items-start">
                    <i className="fas fa-building text-blue-400 text-xl mr-4 mt-1"></i>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Financial Institution Case Study</h3>
                      <div className="text-gray-300">
                        A regional bank reduced QR-based incidents by 78% after implementing:
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
                          <li>Branded QR codes with digital signatures for customer communications</li>
                          <li>Mandatory URL previews on all corporate devices</li>
                          <li>Quarterly employee "quishing" simulation tests</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="section-divider"></div>

              {/* Section 3: Future of QR Security */}
              <section className="future-section mb-16">
                <h2 className="text-3xl font-bold mb-6 gradient-text">The Next Generation of Secure QR Codes</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                    <div className="text-blue-400 text-2xl mb-3">
                      <i className="fas fa-lock"></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Cryptographic Signatures</h3>
                    <p className="text-gray-300">Emerging standards like SQRC (Secure QR Code) embed digital signatures that devices can verify before processing.</p>
                  </div>
                  <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                    <div className="text-blue-400 text-2xl mb-3">
                      <i className="fas fa-eye"></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Visual Authentication</h3>
                    <p className="text-gray-300">Dynamic color patterns and holographic elements make tampering immediately visible to users.</p>
                  </div>
                  <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                    <div className="text-blue-400 text-2xl mb-3">
                      <i className="fas fa-link"></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Blockchain Verification</h3>
                    <p className="text-gray-300">Decentralized registries allow real-time validation of QR code authenticity against issuer records.</p>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 my-8 bg-gray-800 bg-opacity-30 py-3">
                  <p className="italic text-gray-300">
                    "By 2026, we expect 40% of enterprise QR implementations will incorporate cryptographic validation, fundamentally changing how organizations trust these everyday digital gateways."
                  </p>
                  <p className="text-sm text-gray-400 mt-2">- Gartner Emerging Tech Report, Q1 2025</p>
                </div>
              </section>

              {/* Conclusion */}
              <section className="conclusion-section mb-16">
                <h2 className="text-3xl font-bold mb-6 gradient-text">Striking the Right Balance</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">For Security Teams</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Treat QR codes as unverified network endpoints in zero-trust architectures</li>
                      <li>Conduct regular audits of all organizational QR code deployments</li>
                      <li>Implement MDM policies that restrict risky QR code behaviors</li>
                      <li>Develop incident response playbooks specifically for QR-based breaches</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">For End Users</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Install QR scanners with URL preview functionality</li>
                      <li>Verify physical QR codes aren't sticker overlays</li>
                      <li>Never scan codes from unsolicited communications</li>
                      <li>Disable automatic actions in device settings</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <i className="fas fa-lightbulb text-blue-400 mr-3"></i>
                    Key Takeaway
                  </h3>
                  <p className="text-gray-300">
                    QR codes aren't inherently dangerous - it's our reflexive, unverified scanning behaviors that create risk. By combining technical controls with user education and emerging verification technologies, organizations can safely harness QR convenience without compromising security.
                  </p>
                </div>
              </section>

              {/* Author Bio */}
              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6">About the Author</h3>
                <div className="flex items-start">
                  <img src="/img/Mei-Zhang.jpg" 
                       alt="Mei Zhang" 
                       className="w-16 h-16 rounded-full object-cover mr-6" />
                  <div>
                    <h4 className="text-xl font-bold">Mei Zhang</h4>
                    <p className="text-gray-400 mb-3">Mobile Security Specialist, BTMSecurity</p>
                    <p className="text-gray-300">
                      Former lead security researcher at MobileIron with 12 years experience in mobile threat defense. 
                      Author of "The Invisible Threat: Mobile Attack Vectors" and regular speaker at Black Hat.
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
        .warning-box {
          background-color: rgba(239, 68, 68, 0.1);
          border-left: 4px solid #ef4444;
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0 8px 8px 0;
        }
        .best-practice {
          background-color: rgba(16, 185, 129, 0.1);
          border-left: 4px solid #10b981;
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0 8px 8px 0;
        }
        .checklist {
          list-style-type: none;
          padding-left: 0;
        }
        .checklist li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 0.75rem;
        }
        .checklist li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: bold;
        }
        .qr-comparison {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          margin: 2rem 0;
          justify-content: center;
        }
        .qr-example {
          text-align: center;
          flex: 1;
          min-width: 200px;
        }
        .section-divider {
          border-top: 1px dashed #3b82f6;
          margin: 3rem auto;
          width: 50%;
          opacity: 0.5;
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