'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Footer = () => {
  return (
    <footer className="bg-[#02050e] border-t border-[#1e2942]/80 py-16 px-6 relative text-slate-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Grid layout matching PNG (5 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Social Links */}
          <div className="space-y-4 lg:col-span-1">
            {/* Previous BTM Security Brand Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <i className="fas fa-shield-alt text-blue-500 text-3xl group-hover:scale-105 transition-transform"></i>
              <div className="w-0.5 h-8 bg-blue-500"></div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-white">
                  <span className="text-blue-500">BTM</span>Security
                </span>
                <span className="text-[10px] text-slate-400 font-sans tracking-tight">Blue Team Module Security</span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed">
              BTM Security provides AI-powered cybersecurity solutions that help organizations prevent, detect and respond to threats in real-time.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-[#0a1124] border border-[#1e2942] hover:border-blue-500 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors text-xs">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#0a1124] border border-[#1e2942] hover:border-blue-500 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors text-xs">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#0a1124] border border-[#1e2942] hover:border-blue-500 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors text-xs">
                <i className="fab fa-youtube" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#0a1124] border border-[#1e2942] hover:border-blue-500 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors text-xs">
                <i className="fab fa-facebook-f" />
              </a>
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">QUICK LINKS</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about/our-mission" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/about/our-clients" className="hover:text-blue-400 transition-colors">Our Clients</Link></li>
              <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: SERVICES */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">SERVICES</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Threat Detection</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Vulnerability Management</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Incident Response</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Network Security</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Cloud Security</Link></li>
              <li><Link href="/enrollment" className="hover:text-blue-400 transition-colors">Security Training</Link></li>
            </ul>
          </div>

          {/* Column 4: SECURITY CENTER */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">SECURITY CENTER</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Security.txt</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Vulnerability Disclosure</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Compliance</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Trust Center</Link></li>
            </ul>
          </div>

          {/* Column 5: NEWSLETTER */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">NEWSLETTER</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Stay updated with the latest threats and security insights.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-[#040914] border border-[#1e2942] text-xs text-white placeholder-slate-500 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors font-mono"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1e2942]/60 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} BTM Security. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer