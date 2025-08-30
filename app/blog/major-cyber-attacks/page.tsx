'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function MajorCyberAttacksJune2025() {
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
        <title>Major Cyber Attacks of June 2025 | BTMSecurity</title>
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
                  Threat Intelligence <span className="alert-badge">ACTIVE THREATS</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Major <span className="gradient-text">Cyber Attacks</span>, Ransomware Incidents and Data Breaches of June 2025</h1>
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <span>April 5, 2025</span>
                  <span>•</span>
                  <span>9 min read</span>
                  <span>•</span>
                  <span>By <a href="#" className="text-blue-400">Naomi Rivera</a>, Threat Intelligence Analyst</span>
                </div>
              </header>

              <img src="/img/cyber-threats.jpg" 
                   alt="Cyber attack concept" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">Cyber threats continue to evolve with increasing sophistication</p>

              <div className="warning-box">
                <p className="text-xl text-gray-300">
                  United Natural Foods, North Face, Cartier, Zoom Car, Episource, WestJet, The Washington Post. What do they have in common? All fell victim to cyber crime in June 2025, exposing sensitive data and disrupting operations.
                </p>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                From unauthorized access to internal systems to major disruptions in operations, the impact of June's cyber incidents has been as damaging as ever. Millions of customer and employee accounts were breached, exposing sensitive personal information across multiple industries.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Ransomware Attacks in June 2025</h2>
              <p className="text-gray-300 mb-6">
                Ransomware continues to be one of the most disruptive cyber threats, with several high-profile attacks last month:
              </p>

              <div className="overflow-x-auto">
                <table className="attack-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Victim</th>
                      <th>Summary</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>June 01, 2025</td>
                      <td>Durant (OK), Lorain County (OH), and Puerto Rico's Justice Department</td>
                      <td>Ransomware attacks disrupted critical services for thousands across multiple government entities</td>
                      <td><a href="https://therecord.media/" className="text-blue-400 hover:underline" target="_blank">The Record</a></td>
                    </tr>
                    <tr>
                      <td>June 04, 2025</td>
                      <td>Lee Enterprises</td>
                      <td>Newspaper giant says nearly 40,000 Social Security numbers leaked in Qilin ransomware attack</td>
                      <td><a href="https://therecord.media/" className="text-blue-400 hover:underline" target="_blank">The Record</a></td>
                    </tr>
                    <tr>
                      <td>June 05, 2025</td>
                      <td>Kettering Health</td>
                      <td>Interlock ransomware attack disrupted 14 hospitals, forcing procedure cancellations</td>
                      <td><a href="https://therecord.media/" className="text-blue-400 hover:underline" target="_blank">The Record</a></td>
                    </tr>
                    <tr>
                      <td>June 22, 2025</td>
                      <td>McLaren Health Care</td>
                      <td>Data of 743,000 stolen in ransomware attack linked to INC group</td>
                      <td><a href="https://www.bleepingcomputer.com/" className="text-blue-400 hover:underline" target="_blank">Bleeping Computer</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Data Breaches in June 2025</h2>
              <p className="text-gray-300 mb-6">
                Significant data breaches exposed millions of records across various sectors:
              </p>

              <div className="overflow-x-auto">
                <table className="attack-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Victim</th>
                      <th>Summary</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>June 02, 2025</td>
                      <td>North Face</td>
                      <td>Nearly 3,000 customer accounts breached via credential stuffing attack</td>
                      <td><a href="https://therecord.media/" className="text-blue-400 hover:underline" target="_blank">The Record</a></td>
                    </tr>
                    <tr>
                      <td>June 16, 2025</td>
                      <td>Zoom Car</td>
                      <td>8.4 million affected by data breach at Indian car share company</td>
                      <td><a href="https://therecord.media/" className="text-blue-400 hover:underline" target="_blank">The Record</a></td>
                    </tr>
                    <tr>
                      <td>June 17, 2025</td>
                      <td>Episource</td>
                      <td>Healthcare tech firm breach exposed data of 5.4 million individuals</td>
                      <td><a href="https://www.bleepingcomputer.com/" className="text-blue-400 hover:underline" target="_blank">Bleeping Computer</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Notable Cyber Attacks</h2>
              <p className="text-gray-300 mb-6">
                Other significant cyber incidents from June 2025:
              </p>

              <div className="overflow-x-auto">
                <table className="attack-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Victim</th>
                      <th>Summary</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>June 05, 2025</td>
                      <td>United Natural Foods</td>
                      <td>Cyber attack forced systems offline, disrupting distribution</td>
                      <td><a href="https://therecord.media/" className="text-blue-400 hover:underline" target="_blank">The Record</a></td>
                    </tr>
                    <tr>
                      <td>June 15, 2025</td>
                      <td>The Washington Post</td>
                      <td>Journalists' email accounts compromised in targeted attack</td>
                      <td><a href="https://www.bleepingcomputer.com/" className="text-blue-400 hover:underline" target="_blank">Bleeping Computer</a></td>
                    </tr>
                    <tr>
                      <td>June 17, 2025</td>
                      <td>Iran's Bank Sepah</td>
                      <td>Pro-Israel hackers claimed breach amid military escalation</td>
                      <td><a href="https://therecord.media/" className="text-blue-400 hover:underline" target="_blank">The Record</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Critical Vulnerabilities Patched</h2>
              <p className="text-gray-300 mb-6">
                Major vulnerabilities discovered and patched in June 2025:
              </p>

              <div className="overflow-x-auto">
                <table className="attack-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>CVE</th>
                      <th>Summary</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>June 02, 2025</td>
                      <td>CVE-2025-21479</td>
                      <td>Qualcomm patches zero-day in Adreno GPU driver</td>
                      <td><a href="https://www.bleepingcomputer.com/" className="text-blue-400 hover:underline" target="_blank">Bleeping Computer</a></td>
                    </tr>
                    <tr>
                      <td>June 10, 2025</td>
                      <td>CVE-2025-33053</td>
                      <td>Microsoft patches WebDAV zero-day exploited by APT groups</td>
                      <td><a href="https://www.bleepingcomputer.com/" className="text-blue-400 hover:underline" target="_blank">Bleeping Computer</a></td>
                    </tr>
                    <tr>
                      <td>June 25, 2025</td>
                      <td>CVE-2025-6543</td>
                      <td>Citrix warns of active exploitation causing DoS condition</td>
                      <td><a href="https://www.bleepingcomputer.com/" className="text-blue-400 hover:underline" target="_blank">Bleeping Computer</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Key Threat Intelligence Reports</h2>
              <p className="text-gray-300 mb-6">
                Important advisories and analysis from June:
              </p>

              <ul className="list-disc pl-5 space-y-3 text-gray-300">
                <li>Play ransomware gang has targeted over 900 organizations since 2022 (FBI)</li>
                <li>AI called a "data-breach time-bomb" with 99% of organizations exposing sensitive data (Varonis)</li>
                <li>Scattered Spider expands targeting to aviation after insurance and retail sectors</li>
                <li>North Korea's BlueNoroff APT using deepfake videos in macOS malware attacks</li>
              </ul>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-12">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <i className="fas fa-lightbulb text-blue-400 mr-3"></i>
                  Critical Insight
                </h3>
                <p className="text-gray-300">
                  The writing on the wall is clear. Preparedness against cyber crime and building cyber resilience is an urgent priority for every business. Organizations must combine the right tools with comprehensive incident response planning and regular cyber tabletop exercises to protect their brand and customer trust.
                </p>
              </div>

              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6">About the Author</h3>
                <div className="flex items-start">
                  <img src="/img/naomi.jpg" 
                       alt="Naomi Rivera" 
                       className="w-16 h-16 rounded-full object-cover mr-6" />
                  <div>
                    <h4 className="text-xl font-bold">Naomi Rivera</h4>
                    <p className="text-gray-400 mb-3">Threat Intelligence Analyst, BTMSecurity</p>
                    <p className="text-gray-300">
                      Cybercrime investigator with 10 years experience tracking ransomware groups. 
                      Certified in CISSP and GIAC Cyber Threat Intelligence (GCTI).
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
        .attack-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
        }
        .attack-table th {
          background-color: #1e40af;
          color: white;
          padding: 0.75rem;
          text-align: left;
        }
        .attack-table td {
          padding: 0.75rem;
          border-bottom: 1px solid #334155;
        }
        .attack-table tr:nth-child(even) {
          background-color: rgba(30, 64, 175, 0.1);
        }
        .attack-table tr:hover {
          background-color: rgba(30, 64, 175, 0.2);
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
        .warning-box {
          background-color: rgba(239, 68, 68, 0.1);
          border-left: 4px solid #ef4444;
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0 8px 8px 0;
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