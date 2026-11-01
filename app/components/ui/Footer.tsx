'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#030712] border-t border-[#12203a] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group">
              <i className="fas fa-shield-alt text-blue-500 text-2xl group-hover:scale-105 transition-transform" />
              <div className="w-0.5 h-6 bg-blue-500" />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-white tracking-tight">
                  <span className="text-blue-500">BTM</span>Security
                </span>
                <span className="text-[9px] text-slate-400 font-sans tracking-tight">Blue Team Module Security</span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed">
              Nigeria-based cybersecurity company serving African enterprises and remote clients worldwide — penetration testing, vulnerability management, and continuous threat monitoring.
            </p>

            {/* Social & Contact Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#0a1124] border border-[#1e2942] hover:border-blue-500 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors text-xs"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-8 h-8 rounded-lg bg-[#0a1124] border border-[#1e2942] hover:border-blue-500 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors text-xs"
              >
                <i className="fab fa-x-twitter" />
              </a>
              <a
                href="tel:+2347045981315"
                aria-label="Phone: +234 704 598 1315"
                className="w-8 h-8 rounded-lg bg-[#0a1124] border border-[#1e2942] hover:border-blue-500 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors text-xs"
              >
                <i className="fas fa-phone-alt" />
              </a>
              <a
                href="mailto:support@btmsec.com"
                aria-label="Email BTM Security"
                className="w-8 h-8 rounded-lg bg-[#0a1124] border border-[#1e2942] hover:border-blue-500 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors text-xs"
              >
                <i className="fas fa-envelope" />
              </a>
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">QUICK LINKS</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about/our-mission" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/about/our-clients" className="hover:text-blue-400 transition-colors">Our Clients</Link></li>
              <li>
                <Link href="/operations" className="hover:text-blue-400 transition-colors text-blue-400/90 font-medium flex items-center justify-between">
                  <span>Areas of Operation</span>
                  <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1 py-0.2 rounded font-mono border border-blue-500/30">AFRICA+</span>
                </Link>
              </li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing & Plans</Link></li>
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
              <li><a href="/security.txt" className="hover:text-blue-400 transition-colors font-mono">security.txt (RFC 9116)</a></li>
              <li><Link href="/vulnerability-disclosure" className="hover:text-blue-400 transition-colors">Vulnerability Disclosure</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('openCookiePreferences'))
                    }
                  }}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: NEWSLETTER */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">NEWSLETTER</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Stay updated with the latest cybersecurity advisories and security intelligence.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                className="w-full bg-[#040914] border border-[#1e2942] text-xs text-white placeholder-slate-500 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors font-mono"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
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
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/operations" className="hover:text-slate-300 transition-colors">Areas of Operation</Link>
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('openCookiePreferences'))
                }
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>
            <Link href="/vulnerability-disclosure" className="hover:text-slate-300 transition-colors">Vulnerability Disclosure</Link>
            <a href="/security.txt" className="hover:text-slate-300 transition-colors font-mono">security.txt</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer