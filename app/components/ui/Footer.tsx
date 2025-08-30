'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="col-span-1 md:col-span-0">
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-shield-alt text-blue-500 text-3xl"></i>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-white">
                  <span className="text-blue-500">BTM</span>Security
                </span>
                <span className="text-xs text-gray-300">Blue Team Module Security</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm max-w-md mb-4">
              BTM Security delivers enterprise-grade cyber intelligence, combining real-time behavioral 
              analytics and zero-day threat prevention to keep your infrastructure secure.
            </p>

          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/threat-detection" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Threat Detection
                </Link>
              </li>
              <li>
                <Link href="/services/vulnerability-management" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Vulnerability Management
                </Link>
              </li>
              <li>
                <Link href="/services/incident-response" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Incident Response
                </Link>
              </li>
              <li>
                <Link href="/services/security-training" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Security Training
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/blog/human-factor" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Human Factor
                </Link>
              </li>
              <li>
                <Link href="/blog/sap-security" className="text-gray-400 hover:text-blue-400 transition-colors">
                  SAP Security
                </Link>
              </li>
              <li>
                <Link href="/blog/data-breach" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Data Breach
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about/our-mission" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about/our-clients" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Our Clients
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/about/our-team" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} BTM Security. All rights reserved.
          </p>
          
          {/* Legal Links */}
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer