'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function TermsOfService() {
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
        <title>Terms of Service | BTMSecurity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <div id="vanta-bg" className="fixed top-0 left-0 w-full h-full z-0"></div>
      <div className="content-wrapper min-h-screen">
        {/* REMOVED NAVIGATION SECTION */}

        {/* Terms Content */}
        <section className="py-20 px-6">
          <div className="blog-content">
            <article className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <header className="mb-16 text-center">
                <div className="inline-block bg-blue-900 bg-opacity-50 text-blue-300 px-4 py-2 rounded-full text-sm mb-4">
                  Legal Documentation
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">BTMSecurity <span className="gradient-text">Terms of Service</span></h1>
                <p className="text-xl text-blue-200 mb-4">Last Updated: January 15, 2025</p>
              </header>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <i className="fas fa-exclamation-circle text-blue-400 mr-3"></i>
                  Important Notice
                </h3>
                <p className="text-gray-300">
                  Please read these Terms of Service carefully before using our services. By accessing or using BTMSecurity's services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">1. Services Overview</h2>
              <p className="text-gray-300 mb-6">
                BTMSecurity provides industry-standard cybersecurity services including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li>Penetration Testing and Vulnerability Assessments</li>
                <li>Security Consulting and Architecture Review</li>
                <li>Incident Response and Digital Forensics</li>
                <li>Security Awareness Training</li>
                <li>Managed Security Services</li>
                <li>Compliance and Governance Consulting</li>
              </ul>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">2. Professional Services Agreement</h2>
              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">2.1 Engagement Terms</h3>
              <p className="text-gray-300 mb-4">
                All professional services are performed by certified cybersecurity experts with appropriate qualifications including:
              </p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li>Offensive Security Certified Professional (OSCP)</li>
                <li>Certified Information Systems Security Professional (CISSP)</li>
                <li>Certified Ethical Hacker (CEH)</li>
                <li>GIAC Penetration Tester (GPEN)</li>
                <li>Other industry-recognized certifications</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">2.2 Scope of Work</h3>
              <p className="text-gray-300 mb-4">
                Each engagement is defined by a Statement of Work (SOW) that outlines:
              </p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li>Specific testing methodologies to be employed</li>
                <li>Systems and applications in scope</li>
                <li>Testing windows and communication protocols</li>
                <li>Deliverables and reporting requirements</li>
                <li>Rules of engagement and limitations</li>
              </ul>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">3. Client Responsibilities</h2>
              <p className="text-gray-300 mb-6">
                Clients agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li>Provide necessary access to systems and personnel</li>
                <li>Obtain proper authorization for testing activities</li>
                <li>Maintain appropriate backups of critical systems</li>
                <li>Designate a point of contact for coordination</li>
                <li>Provide accurate information about systems and networks</li>
              </ul>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">4. Confidentiality</h2>
              <p className="text-gray-300 mb-6">
                BTMSecurity maintains strict confidentiality regarding:
              </p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li>Client information and data accessed during engagements</li>
                <li>Vulnerability findings and assessment results</li>
                <li>Client infrastructure details and network architecture</li>
                <li>Any proprietary information shared during the engagement</li>
              </ul>
              <p className="text-gray-300 mb-6">
                All team members sign comprehensive non-disclosure agreements prior to engagement.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">5. Limitations of Liability</h2>
              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">5.1 Service Limitations</h3>
              <p className="text-gray-300 mb-4">
                While BTMSecurity employs industry-standard methodologies, we cannot guarantee:
              </p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li>Identification of all vulnerabilities or security issues</li>
                <li>Prevention of all security breaches or incidents</li>
                <li>Compatibility with all systems or environments</li>
                <li>Continuous protection against emerging threats</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">5.2 Financial Limitations</h3>
              <p className="text-gray-300 mb-4">
                BTMSecurity's total liability for any claim related to services provided shall not exceed the total fees paid by the client for the specific engagement giving rise to the claim.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">6. Intellectual Property</h2>
              <p className="text-gray-300 mb-6">
                All pre-existing intellectual property of each party remains the property of that party. BTMSecurity grants clients a perpetual, royalty-free license to use deliverables created specifically for the client during the engagement.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">7. Payment Terms</h2>
              <p className="text-gray-300 mb-6">
                Standard payment terms are net 30 days from invoice date. For ongoing services, billing occurs monthly in advance. Late payments may result in service suspension.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">8. Termination</h2>
              <p className="text-gray-300 mb-6">
                Either party may terminate engagements with 30 days written notice. Upon termination, clients remain responsible for payment for all services rendered up to the termination date.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">9. Governing Law</h2>
              <p className="text-gray-300 mb-6">
                These Terms shall be governed by and construed in accordance with the laws of the United Kingdom. Any disputes shall be resolved in the courts of London, United Kingdom.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">10. Changes to Terms</h2>
              <p className="text-gray-300 mb-6">
                BTMSecurity reserves the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the modified Terms.
              </p>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-12">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <i className="fas fa-info-circle text-blue-400 mr-3"></i>
                  Contact Information
                </h3>
                <p className="text-gray-300">
                  For questions about these Terms of Service, please contact our legal team at:
                </p>
                <p className="text-gray-300 mt-2">
                  Email: legal@btmsecurity.com<br />
                  Phone: +44 (0)20 7946 0958<br />
                  Address: 123 Cyber Security Lane, London, EC2A 4LT, United Kingdom
                </p>
              </div>

              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6">Document Information</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-blue-400">Version History</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>v1.0 - Initial Publication: January 15, 2023</li>
                      <li>v1.1 - Updated Liability Section: June 10, 2023</li>
                      <li>v2.0 - Comprehensive Revision: January 15, 2025</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-blue-400">Approval</h4>
                    <p className="text-gray-300">
                      This document has been reviewed and approved by BTMSecurity's legal team and executive leadership.
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