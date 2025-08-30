// app/cookie-policy/page.js
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | BTMSecurity',
  description: 'Learn how we use cookies and similar technologies to provide, protect, and improve our services.',
}

export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-white">Cookie Policy</h1>

      <p className="mb-4">This Cookie Policy explains how we use cookies and similar technologies to provide, protect, and improve our services. By using our website, you agree to the use of cookies as described in this policy.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. What are cookies?</h2>
      <p className="mb-4">Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences, understand how you use our site, and improve your overall experience.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Types of cookies we use</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., login sessions, security settings).</li>
        <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site so we can improve performance.</li>
        <li><strong>Functionality Cookies:</strong> Remember your preferences and settings to enhance your experience.</li>
        <li><strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant ads and measure their effectiveness.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Third-party cookies</h2>
      <p className="mb-4">Some cookies are placed by third parties that provide services on our behalf (e.g., analytics providers, advertising networks). We do not control these cookies directly.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. How to control cookies</h2>
      <p className="mb-4">You can manage cookies through your browser settings. Most browsers allow you to block or delete cookies, but please note that disabling certain cookies may affect the functionality of our site.</p>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <Link 
            href="https://support.google.com/chrome/answer/95647" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Manage cookies in Google Chrome
          </Link>
        </li>
        <li>
          <Link 
            href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Manage cookies in Mozilla Firefox
          </Link>
        </li>
        <li>
          <Link 
            href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Manage cookies in Safari
          </Link>
        </li>
        <li>
          <Link 
            href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Manage cookies in Microsoft Edge
          </Link>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Changes to this policy</h2>
      <p className="mb-4">We may update this Cookie Policy from time to time to reflect changes in technology, law, or our business practices. Updates will be posted on this page with a revised &ldquo;Last Updated&rdquo; date.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Contact us</h2>
      <p>If you have any questions about our Cookie Policy, please contact us at <a href="mailto:admin@btmsec.com" className="text-blue-400 hover:underline">admin@btmsec.com</a>.</p>

      <p className="mt-12 text-sm text-gray-500">Last Updated: August 11, 2025</p>
    </div>
  )
}