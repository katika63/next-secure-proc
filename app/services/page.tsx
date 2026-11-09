import { Metadata } from 'next'
import ServicesHero from '../components/sections/ServicesHero'
import AllServicesSection from '../components/sections/AllServicesSection'
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection'
import VantaBackground from '../components/ui/VantaBackground'

export const metadata: Metadata = {
  title: 'Cybersecurity Services | BTM Security',
  description: 'Comprehensive cybersecurity services including threat detection, incident response, vulnerability management, and security training.',
  keywords: ['cybersecurity services', 'threat detection', 'incident response', 'vulnerability management', 'security training'],
}

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Vanta.js Background */}
      <VantaBackground />
      
      {/* Content WITHOUT the semi-transparent overlay */}
      <div className="relative z-10 min-h-screen">
        <ServicesHero />
        <AllServicesSection />
        
        {/* Vulnerability Management Section */}
        <section id="vulnerability" className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  <span className="gradient-text">Vulnerability Management</span><br/>
                  Proactive Risk Reduction
                </h2>
                <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                  Our comprehensive vulnerability management program provides continuous monitoring and prioritization of security weaknesses across your environment.
                </p>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 bg-opacity-50 text-blue-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Comprehensive Discovery</h4>
                      <p className="text-gray-400">
                        Automated and manual techniques to identify vulnerabilities across networks, systems, applications, and cloud environments.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 bg-opacity-50 text-blue-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Strategic Prioritization</h4>
                      <p className="text-gray-400">
                        Risk-based scoring that considers exploitability, business impact, and threat intelligence to focus remediation efforts.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 bg-opacity-50 text-blue-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Remediation Guidance</h4>
                      <p className="text-gray-400">
                        Actionable recommendations including patches, configuration changes, and compensating controls.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Vulnerability Management Dashboard</h3>
                    <span className="text-xs bg-blue-900 bg-opacity-50 text-blue-400 px-3 py-1 rounded-full">LIVE</span>
                  </div>
                  <div className="bg-black rounded-lg p-4 h-96 overflow-auto">
                    <div className="text-green-400 font-mono text-sm">
                      <p className="mb-2">Scanning network: 192.168.1.0/24</p>
                      <p className="mb-2">Identified hosts: 42</p>
                      <p className="mb-2">Critical vulnerabilities: 3</p>
                      <p className="mb-2">High vulnerabilities: 12</p>
                      <p className="mb-2">Medium vulnerabilities: 27</p>
                      <p className="mb-4">Low vulnerabilities: 8</p>
                      <p className="mb-2 text-yellow-400">Priority Alert: CVE-2025-6636 detected on 3 hosts</p>
                      <p className="mb-2">Recommended action: Apply patch KB5021234</p>
                      <p className="mb-4">Estimated remediation time: 2 hours</p>
                      <p className="mb-2">Next scheduled scan: 2 hours</p>
                      <p className="text-blue-400">Monitoring active threats...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sample Lab Pentest Report Showcase Card */}
        <section className="py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#070e20] via-[#0a1530] to-[#070e20] border border-[#1e2e50] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="max-w-2xl space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>PORTFOLIO ARTIFACT • LAB ASSESSMENT</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Sample Vulnerability &amp; Penetration Test Report
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Review an authentic documentation sample showcasing BtmSecurity&apos;s offensive methodology, vulnerability risk scoring, CVSS mapping, and remediation roadmaps.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-network-wired text-cyan-400" />
                      <span>Target Scope: 192.168.XX.XX (Lab Enclave)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-file-pdf text-red-400" />
                      <span>Format: Full Technical PDF</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end shrink-0 pt-2 lg:pt-0">
                  <a
                    href="https://btmsecurity-btmvulnlab-public-portfolio-report.tiiny.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 group"
                  >
                    <i className="fas fa-file-arrow-down text-base group-hover:scale-110 transition-transform" />
                    <span>Download Sample Lab Pentest Report (PDF)</span>
                    <svg
                      className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  <p className="text-[11px] text-slate-400 font-mono mt-2.5 max-w-sm text-left lg:text-right">
                    Demonstration artifact from an isolated lab environment. Not a real client engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Comprehensive Security</span> Solutions
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
                Beyond our core services, we offer specialized security solutions to address your unique challenges.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl p-6 transition duration-300 hover:transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-900 bg-opacity-50 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Red Team Exercises</h3>
                <p className="text-sm text-gray-400">
                  Full-scale simulated attacks to test detection and response capabilities.
                </p>
              </div>
              
              <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl p-6 transition duration-300 hover:transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-900 bg-opacity-50 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Compliance Advisory</h3>
                <p className="text-sm text-gray-400">
                  GDPR, ISO 27001, SOC 2, and other regulatory compliance support.
                </p>
              </div>
              
              <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl p-6 transition duration-300 hover:transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-900 bg-opacity-50 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Secure Development</h3>
                <p className="text-sm text-gray-400">
                  Secure coding practices and application security architecture reviews.
                </p>
              </div>
              
              <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl p-6 transition duration-300 hover:transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-900 bg-opacity-50 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Threat Intelligence</h3>
                <p className="text-sm text-gray-400">
                  Customized threat feeds and adversary profiling for your industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        <WhyChooseUsSection />
        
        {/* CTA Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Strengthen Your Security Posture?</h2>
            <p className="text-base sm:text-xl text-blue-200 mb-6 sm:mb-8">
              Contact our security experts to discuss how we can protect your organization from evolving cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105">
                Book a 15-Minute Scoping Call
              </a>
              <a href="tel:+2347045981315" className="border border-white text-white hover:bg-blue-700 px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105">
                Call Now: +234 704 598 1315
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}