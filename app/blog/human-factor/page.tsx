'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function HumanFactorCybersecurity() {
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
        <title>The Human Factor in Cybersecurity | BTMSecurity</title>
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
                  Security Awareness
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">The <span className="gradient-text">Human Factor</span> in Cybersecurity</h1>
                <p className="text-xl text-blue-200 mb-4">Why employee training remains the most cost-effective security investment you can make</p>
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <span>May 22, 2025</span>
                  <span>•</span>
                  <span>8 min read</span>
                  <span>•</span>
                  <span>By <a href="#" className="text-blue-400"> Emily Park</a>, Behavioral Security Specialist</span>
                </div>
              </header>

              <img src="/img/human.jpg" 
                   alt="Team cybersecurity training session" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">Interactive security training sessions significantly improve threat recognition</p>

              <div className="stat-highlight my-8">
                <p className="text-lg font-bold">94% of successful breaches involve human error or manipulation (Verizon DBIR 2025)</p>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                While organizations spend millions on firewalls and endpoint protection, the weakest link remains unchanged - human behavior. Our 2025 analysis reveals that companies with comprehensive security training programs experience <strong>72% fewer</strong> successful phishing attacks and reduce incident response costs by an average of <strong>$1.3 million</strong> annually.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Why Training Delivers ROI</h2>
              <p className="text-gray-300 mb-6">Security awareness training outperforms technical controls in three key areas:</p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-2xl mb-3 human-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Cost Efficiency</h3>
                  <p className="text-gray-300">$1 spent on training prevents $37 in potential breach costs (Ponemon Institute 2025)</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-2xl mb-3 human-icon">
                    <i className="fas fa-shield-virus"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Threat Coverage</h3>
                  <p className="text-gray-300">Employees become sensors for novel attacks that bypass technical controls</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-2xl mb-3 human-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Response Time</h3>
                  <p className="text-gray-300">Trained staff report incidents 83% faster than untrained peers</p>
                </div>
              </div>

              <img src="/img/human-factor.jpg" 
                   alt="Employees learning cybersecurity" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">Engaged employees become an organization's first line of defense</p>

              <div className="border-l-4 border-blue-500 pl-4 my-8 bg-gray-800 bg-opacity-30 py-3">
                <p className="italic text-gray-300">
                  "After implementing our 'Phish-First' training program, we reduced click-through rates on simulated attacks from 34% to just 3% in six months. The real payoff came when employees started spotting and reporting actual attacks we hadn't trained them on."
                </p>
                <p className="text-sm text-gray-400 mt-2">- CISO, Fortune 500 Healthcare Provider</p>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Essential Training Components</h2>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">1. Behavioral Conditioning</h3>
              <p className="text-gray-300 mb-4">Effective programs use spaced repetition and real-world simulations:</p>
              
              <div className="bg-black bg-opacity-50 p-4 rounded-lg my-4 overflow-x-auto">
                <pre><code className="text-sm text-green-300"># Sample training schedule (quarterly)
Q1: Phishing simulations + reporting protocol
Q2: Physical security & tailgating awareness  
Q3: Cloud security & data handling
Q4: Incident response walkthroughs</code></pre>
              </div>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">2. Contextual Learning</h3>
              <p className="text-gray-300 mb-4">Role-specific training yields better results:</p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li><strong>Executives:</strong> Deepfake audio/video detection</li>
                <li><strong>Finance:</strong> Invoice fraud patterns</li>
                <li><strong>Developers:</strong> Secure coding practices</li>
                <li><strong>Remote Workers:</strong> Home network security</li>
              </ul>

              <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 my-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-900 bg-opacity-50 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-chart-pie text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Training Impact Metrics</h4>
                    <p className="text-gray-300">Measure effectiveness through:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 mt-2">
                      <li>Phishing test success rates</li>
                      <li>Incident reporting frequency</li>
                      <li>Password hygiene improvements</li>
                      <li>Simulation response times</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">3. Positive Reinforcement</h3>
              <p className="text-gray-300 mb-4">Celebrate security wins to build culture:</p>
              <table className="w-full border border-gray-600 my-6">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left">Technique</th>
                    <th className="p-3 text-left">Implementation</th>
                    <th className="p-3 text-left">Effectiveness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-600">
                    <td className="p-3">Security Champion Programs</td>
                    <td className="p-3">Departmental ambassadors</td>
                    <td className="p-3">47% increase in engagement</td>
                  </tr>
                  <tr className="border-t border-gray-600 bg-gray-700 bg-opacity-30">
                    <td className="p-3">Gamification</td>
                    <td className="p-3">Leaderboards & badges</td>
                    <td className="p-3">2.3x more training completion</td>
                  </tr>
                  <tr className="border-t border-gray-600">
                    <td className="p-3">Spot Rewards</td>
                    <td className="p-3">Gift cards for reporting threats</td>
                    <td className="p-3">89% faster incident reporting</td>
                  </tr>
                </tbody>
              </table>

              <img src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
                   alt="Security awareness gamification" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">Gamified learning increases engagement and retention</p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Getting Started</h2>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <i className="fas fa-rocket text-blue-400 mr-3"></i>
                    Quick Wins
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Monthly 10-minute micro-trainings</li>
                    <li>Simulated phishing tests</li>
                    <li>"Report suspicious" email button</li>
                  </ul>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <i className="fas fa-chess-queen text-blue-400 mr-3"></i>
                    Long-Term Strategy
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Annual skills assessments</li>
                    <li>Role-based learning paths</li>
                    <li>Behavioral analytics integration</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-12">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <i className="fas fa-lightbulb text-blue-400 mr-3"></i>
                  The Training Multiplier Effect
                </h3>
                <p className="text-gray-300">
                  Organizations that combine security training with <strong>psychological safety</strong> (no punishment for reporting mistakes) see <strong>4x greater</strong> security behavior adoption than those with training alone (BTMSecurity 2025 Culture Study).
                </p>
                </div>

              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6">About the Author</h3>
                <div className="flex items-start">
                  <img src="/img/emily-park.jpg" 
                       alt="Emily Park" 
                       className="w-16 h-16 rounded-full object-cover mr-6" />
                  <div>
                    <h4 className="text-xl font-bold">Emily Park</h4>
                    <p className="text-gray-400 mb-3">Behavioral Security Specialist, BTMSecurity</p>
                    <p className="text-gray-300">
                      PhD in Organizational Psychology. Developed the Security Behavior Framework adopted by NIST. Creator of the "Human Firewall" training methodology used by over 300 enterprises worldwide.
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
          край
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
        .human-icon {
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .stat-highlight {
          background: linear-gradient(90deg, #3b82f660, #3b82f620);
          border-left: 4px solid #3b82f6;
          padding: 1rem;
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