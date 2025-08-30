// app/privacy-policy/page.js
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | BTMSecurity',
  description: 'Learn how BTMSecurity collects, uses, and protects your personal information in accordance with our privacy policy.',
}

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Last updated: June 15, 2025
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">1. Introduction</h2>
            <p className="text-gray-300 mb-4">
              BTMSecurity (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p className="text-gray-300">
              By accessing or using our service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>

          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">2. Information We Collect</h2>
            <p className="text-gray-300 mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Personal Data:</strong> Name, email address, phone number, company name when you contact us or register for services</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages</li>
              <li><strong>Cookies:</strong> We use cookies to track activity on our website</li>
              <li><strong>Security Data:</strong> Information related to security incidents when you use our services</li>
            </ul>
          </div>

          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">3. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent, and address technical and security issues</li>
            </ul>
          </div>

          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">4. Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Encryption of data in transit (TLS 1.2+)</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure deletion procedures</li>
            </ul>
            <p className="text-gray-300 mt-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-300 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Service Providers:</strong> To monitor and analyze use of our service</li>
              <li><strong>Business Transfers:</strong> In connection with any merger or acquisition</li>
              <li><strong>Legal Requirements:</strong> If required to do so by law or in response to valid requests by public authorities</li>
            </ul>
            <p className="text-gray-300 mt-4">
              We do not sell your personal information to third parties.
            </p>
          </div>

          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">6. Your Data Protection Rights</h2>
            <p className="text-gray-300 mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>The right to access, update, or delete your information</li>
              <li>The right of rectification if your data is inaccurate</li>
              <li>The right to object to our processing of your data</li>
              <li>The right to request restriction of processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="text-gray-300 mt-4">
              To exercise these rights, please contact us at privacy@btmsec.com.
            </p>
          </div>

          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">7. International Data Transfers</h2>
            <p className="text-gray-300 mb-4">
              Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ.
            </p>
            <p className="text-gray-300">
              We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.
            </p>
          </div>

          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">8. Children&apos;s Privacy</h2>
            <p className="text-gray-300 mb-4">
              Our service does not address anyone under the age of 18 (&quot;Children&quot;).
            </p>
            <p className="text-gray-300">
              We do not knowingly collect personally identifiable information from anyone under 18. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
            </p>
          </div>

          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="text-gray-300">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </div>

          <div className="policy-section p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">10. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 mt-4">
              <li>By email: privacy@btmsec.com</li>
              <li>
                <Link href="/contact" className="text-blue-400 hover:underline">
                  By visiting this page on our website
                </Link>
              </li>
              <li>By mail: BTMSecurity, 123 Cyber Lane, Security District, NY 10001, United States</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}