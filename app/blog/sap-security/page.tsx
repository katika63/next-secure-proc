'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function SAPSecurityIssues() {
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
        <title>SAP Security Issues: Reinventing Cyber Defence | BTMSecurity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.00-beta3/css/all.min.css" />
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
                  Enterprise Security <span className="bg-green-500 text-white rounded-full px-2 py-1 ml-2">NEW RESEARCH</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">SAP Security Issues: <span className="gradient-text">Reinventing Cyber Defence</span> with Proper Licensing</h1>
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <span>July 1, 2025</span>
                  <span>•</span>
                  <span>10 min read</span>
                  <span>•</span>
                  <span>By <a href="#" className="text-blue-400"> Elena Rodriguez</a>, SAP Security Specialist</span>
                </div>
              </header>

              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                   alt="SAP security concept" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">SAP systems require specialized security considerations </p>

              <div className="feature-box">
                <p className="text-gray-300 italic">
                  "In today's computerized environment, safeguarding a dynamic SAP environment is no longer about blocking external threats but also guaranteeing internal controls, especially regarding licensing models."
                </p>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                SAP software, as a comprehensive business management system, requires a thorough approach to combat cyber threats. SAP licensing represents a critical security layer within software asset management, with its complex authorization structure of multiple modules, user roles, and consumption models.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Understanding SAP License Security Issues</h2>
              <p className="text-gray-300 mb-6">
                With approximately 3,000 products, 24 user license types, and 100 engine metrics, SAP software licensing presents unique security challenges. Several factors affect the security of your SAP licensing implementation:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-blue-400 text-2xl mb-3">
                    <i className="fas fa-id-card"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">License Type</h3>
                  <p className="text-gray-300">Permanent licenses provide full control over data but require rigorous internal security measures to prevent misuse.</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-blue-400 text-2xl mb-3">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">User Management</h3>
                  <p className="text-gray-300">Effective credential management ensures only authorized users access sensitive systems and data.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-blue-400 text-2xl mb-3">
                    <i className="fas fa-cubes"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Module Security</h3>
                  <p className="text-gray-300">Financial, HR, and logistics modules require different security levels and access controls.</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-blue-400 text-2xl mb-3">
                    <i className="fas fa-server"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Implementation Type</h3>
                  <p className="text-gray-300">On-premise vs. cloud deployments present different security considerations and attack surfaces.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Preventing Licensing Security Missteps</h2>
              <p className="text-gray-300 mb-6">
                The best defense against SAP security issues is a proactive licensing strategy rooted in compliance and usage monitoring:
              </p>

              <ul className="checklist my-6">
                <li className="text-gray-300">Assign correct license types tailored to specific business needs</li>
                <li className="text-gray-300">Regularly audit and remove inactive users and duplicate accounts</li>
                <li className="text-gray-300">Conduct periodic data protection assessments</li>
                <li className="text-gray-300">Monitor third-party system integrations for license compliance</li>
                <li className="text-gray-300">Implement least-privilege access controls</li>
              </ul>

              <img src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                   alt="Security monitoring dashboard" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Modern Licensing Models for Enhanced Security</h2>
              <p className="text-gray-300 mb-6">
                Emerging SAP licensing models offer improved security features and flexibility:
              </p>

              <div className="feature-box">
                <h3 className="text-lg font-bold mb-3 text-blue-400">Consumption-Based Model</h3>
                <p className="text-gray-300">Pay-as-you-go approach that automatically scales security with usage, providing visibility into access patterns.</p>
                
                <h3 className="text-lg font-bold mt-4 mb-3 text-blue-400">Subscription Model</h3>
                <p className="text-gray-300">Includes regular security updates and patches as part of the service agreement.</p>
                
                <h3 className="text-lg font-bold mt-4 mb-3 text-blue-400">Hybrid Approach</h3>
                <p className="text-gray-300">Combines traditional licensing with cloud benefits for balanced security controls.</p>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Key Recommendations</h2>
              <p className="text-gray-300 mb-6">
                To maximize SAP security through proper licensing:
              </p>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-6">
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Implement regular license audits as part of security reviews</li>
                  <li>Align license types with actual business needs and security requirements</li>
                  <li>Consider cloud-based options for built-in security features</li>
                  <li>Train staff on the security implications of license management</li>
                  <li>Integrate license monitoring with SIEM solutions</li>
                </ul>
              </div>

              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6">About the Author</h3>
                <div className="flex items-start">
                  <img src="/img/elena.jpg" 
                       alt="Dr. Elena Rodriguez" 
                       className="w-16 h-16 rounded-full object-cover mr-6" />
                  <div>
                    <h4 className="text-xl font-bold"> Elena Rodriguez</h4>
                    <p className="text-gray-400 mb-3">SAP Security Specialist, BTMSecurity</p>
                    <p className="text-gray-300">
                      Former SAP security architect with 14 years experience in enterprise system protection. 
                      Holds CISSP-ISSAP and SAP Certified Technology Associate credentials.
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
        .feature-box {
          background-color: rgba(30, 64, 175, 0.2);
          border-left: 4px solid #3b82f6;
          padding: 1.5rem;
          margin: 2rem 0;
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