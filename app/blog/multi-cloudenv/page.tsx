'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function MultiCloudSecurity() {
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

  // Escape the Terraform code to prevent JSX parsing issues
  const terraformCode = `# Example Terraform for multi-cloud identity sync
module "azure_ad_connector" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role"
  providers = {
    aws = aws.primary
    azuread = azuread.prod
  }
  
  trusted_role_arns = [
    "arn:aws:iam::ACCOUNT_ID:role/AzureAD-SSO",
    "roles/cloudidentity.googleapis.com/gcp-sync"
  ]
}`

  return (
    <>
      <Head>
        <title>Securing Multi-Cloud Environments | BTMSecurity</title>
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
                  Cloud Security
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Securing <span className="gradient-text">Multi-Cloud Environments</span></h1>
                <p className="text-xl text-blue-200 mb-4">Best practices for maintaining security consistency across AWS, Azure, and GCP deployments.</p>

                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <span>March 8, 2025</span>
                  <span>•</span>
                  <span>6 mins read</span>
                  <span>•</span>
                  <span>By <a href="#" className="text-blue-400">Claire Bennett</a>, Cloud Security Architect</span>
                </div>
              </header>

              <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" 
                   alt="Cloud computing infrastructure" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">Modern multi-cloud architectures combine services from AWS, Azure, and Google Cloud </p>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                As organizations increasingly adopt multi-cloud strategies (87% according to Flexera's 2025 report), security teams face unprecedented challenges managing disparate environments. Our research shows that <strong>68% of breaches</strong> in multi-cloud setups stem from configuration errors and identity management gaps rather than sophisticated attacks.
              </p>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">The Multi-Cloud Security Challenge</h2>
              <p className="text-gray-300 mb-6">Managing security across AWS, Azure, and Google Cloud requires addressing three core complexities:</p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-2xl mb-3 cloud-icon">
                    <i className="fas fa-random"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Inconsistent Policies</h3>
                  <p className="text-gray-300">Each cloud provider implements security controls differently - AWS IAM vs Azure RBAC vs Google Cloud IAM.</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-2xl mb-3 cloud-icon">
                    <i className="fas fa-user-secret"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Identity Sprawl</h3>
                  <p className="text-gray-300">The average enterprise has 17,000+ cloud identities with 34% being overprivileged (2025 CrowdStrike data).</p>
                </div>
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                  <div className="text-2xl mb-3 cloud-icon">
                    <i className="fas fa-chart-network"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Visibility Gaps</h3>
                  <p className="text-gray-300">47% of organizations cannot track data flows between cloud platforms in real-time.</p>
                </div>
              </div>

              <img src="/img/cloud-monitor.jpg" 
                   alt="Network security visualization" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">Complex data flows in multi-cloud environments require specialized monitoring </p>

              <div className="border-l-4 border-blue-500 pl-4 my-8 bg-gray-800 bg-opacity-30 py-3">
                <p className="italic text-gray-300">
                  "During a recent assessment, we discovered a Fortune 500 company had 1,200 dormant storage buckets across three clouds containing sensitive data, all accessible via legacy service accounts. This blind spot existed because their tools only monitored their primary cloud."
                </p>
                <p className="text-sm text-gray-400 mt-2">- BTM Cloud Security Team</p>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Proven Security Framework</h2>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">1. Unified Identity Fabric</h3>
              <p className="text-gray-300 mb-4">Implement cloud-agnostic identity management:</p>
              
              <div className="bg-black bg-opacity-50 p-4 rounded-lg my-4 overflow-x-auto">
                <pre className="text-sm text-green-300 whitespace-pre-wrap">
                  {terraformCode}
                </pre>
              </div>
              <p className="text-gray-400 text-sm mt-2">This infrastructure-as-code approach ensures consistent identity policies across clouds</p>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">2. Policy-as-Code Enforcement</h3>
              <p className="text-gray-300 mb-4">Tools like Open Policy Agent (OPA) can standardize rules:</p>
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                <li><strong>Prevent public storage buckets</strong> across AWS S3, Azure Blob, and Google Cloud Storage</li>
                <li><strong>Enforce encryption-in-transit</strong> regardless of cloud provider</li>
                <li><strong>Auto-remediate violations</strong> within 15 minutes of detection</li>
              </ul>

              <img src="/img/cloud-security.jpg" 
                   alt="Policy as code concept" 
                   className="blog-image w-full h-auto max-h-96 object-cover" />
              <p className="text-center text-sm text-gray-400 mb-8">Automated policy enforcement reduces configuration drift </p>

              <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">3. Cross-Cloud Monitoring</h3>
              <p className="text-gray-300 mb-4">Essential capabilities for visibility:</p>
              <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 my-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-900 bg-opacity-50 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-search-plus text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Key Monitoring Requirements</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Unified log collection from all cloud providers</li>
                      <li>Normalized alert taxonomy (e.g., "DataExfiltration" vs "SuspiciousBlobAccess")</li>
                      <li>Cross-cloud correlation of user activities</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">Implementation Roadmap</h2>
              <table className="w-full border border-gray-600 my-6">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left">Phase</th>
                    <th className="p-3 text-left">Activities</th>
                    <th className="p-3 text-left">Success Metrics</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-600">
                    <td className="p-3">1. Assessment</td>
                    <td className="p-3">
                      <ul className="list-disc pl-5">
                        <li>Cloud asset inventory</li>
                        <li>Identity mapping</li>
                      </ul>
                    </td>
                    <td className="p-3">100% assets cataloged</td>
                  </tr>
                  <tr className="border-t border-gray-600 bg-gray-700 bg-opacity-30">
                    <td className="p-3">2. Hardening</td>
                    <td className="p-3">
                      <ul className="list-disc pl-5">
                        <li>Policy-as-code implementation</li>
                        <li>Secrets management</li>
                      </ul>
                    </td>
                    <td className="p-3">90%+ policy compliance</td>
                  </tr>
                  <tr className="border-t border-gray-600">
                    <td className="p-3">3. Monitoring</td>
                    <td className="p-3">
                      <ul className="list-disc pl-5">
                        <li>SIEM integration</li>
                        <li>Threat detection rules</li>
                      </ul>
                    </td>
                    <td className="p-3">&lt;30m mean detection time</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-12">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <i className="fas fa-lightbulb text-blue-400 mr-3"></i>
                  Pro Tip: The 3-2-1 Backup Rule for Multi-Cloud
                </h3>
                <p className="text-gray-300">
                  Maintain <strong>3 copies</strong> of critical data on <strong>2 different cloud platforms</strong> with <strong>1 offline backup</strong>. This protects against both cloud provider outages and ransomware attacks targeting cloud storage.
                </p>
              </div>

              <footer className="mt-16 border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-bold mb-6">About the Author</h3>
                <div className="flex items-start">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" 
                       alt="Claire Bennett" 
                       className="w-16 h-16 rounded-full object-cover mr-6" />
                  <div>
                    <h4 className="text-xl font-bold">Claire Bennett</h4>
                    <p className="text-gray-400 mb-3">Principal Cloud Security Architect, BTMSecurity</p>
                    <p className="text-gray-300">
                      Former lead security engineer at Google Cloud. Contributor to CIS Multi-Cloud Benchmarks. Developed the "Zero Trust Cloud Mesh" framework adopted by financial institutions worldwide.
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
        .cloud-icon {
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
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