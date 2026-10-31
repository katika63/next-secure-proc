'use client';

import { motion } from 'framer-motion'
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '15-Minute Scoping Call',
    message: ''
  });

  const [hasAgreedPrivacy, setHasAgreedPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAgreedPrivacy) {
      setSubmitMessage('❌ Please agree to the privacy terms before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    formPayload.append('privacy_consent', 'agreed');
    formPayload.append('access_key', '65b6b603-d909-4d0d-abc4-fb0e9034214e');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('✅ Message received! We respond within 1 business day.');
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '15-Minute Scoping Call',
          message: ''
        });
        setHasAgreedPrivacy(false);
      } else {
        setSubmitMessage('❌ Error: ' + result.message);
      }
    } catch (error) {
      setSubmitMessage('❌ Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen text-gray-100 relative z-10">
      {/* Hero Header */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>We respond within 1 business day</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="gradient-text">Secure Your Future</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Our cybersecurity experts are ready to evaluate your threat landscape, scope security testing, and build a custom defense strategy.
            </p>

            {/* Quick CTA: Book a 15-minute scoping call */}
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, service: '15-Minute Scoping Call' }));
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-lg shadow-blue-600/30 flex items-center gap-2 text-sm"
              >
                <i className="fas fa-calendar-check"></i>
                <span>Book a 15-Minute Scoping Call</span>
              </button>
              <a
                href="tel:+2347045981315"
                className="bg-gray-800/80 hover:bg-gray-700 border border-gray-700 text-slate-200 px-6 py-3 rounded-xl transition duration-300 flex items-center gap-2 text-sm font-semibold"
              >
                <i className="fas fa-phone-alt text-emerald-400"></i>
                <span>Call +234 704 598 1315</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-12 px-6" id="contact-form">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div 
              className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold gradient-text">Send a Message</h2>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  Response SLA: 1 Business Day
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-300 mb-2 text-sm font-medium">Full Name</label>
                  <input 
                    name="name" 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex Johnson"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 mb-2 text-sm font-medium">Work Email</label>
                  <input 
                    name="email" 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="alex@company.com"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              
                <div className="mb-4">
                  <label htmlFor="company" className="block text-gray-300 mb-2 text-sm font-medium">Company / Organization</label>
                  <input 
                    name="company" 
                    type="text" 
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              
                <div className="mb-4">
                  <label htmlFor="service" className="block text-gray-300 mb-2 text-sm font-medium">Service Needed</label>
                  <select 
                    name="service" 
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-sm"
                  >
                    <option value="15-Minute Scoping Call">Book a 15-Minute Scoping Call</option>
                    <option value="Penetration Testing">Web & API Penetration Testing</option>
                    <option value="Vulnerability Management">Continuous Vulnerability Management</option>
                    <option value="Incident Response">Incident Response Support</option>
                    <option value="Security Audit">Security Compliance Advisory</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>
              
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-300 mb-2 text-sm font-medium">Project Scope / Details</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your systems, goals, or scheduling preferences..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none resize-none text-sm"
                  ></textarea>
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="mb-6 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    name="privacyConsent"
                    checked={hasAgreedPrivacy}
                    onChange={(e) => setHasAgreedPrivacy(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="privacyConsent" className="text-xs text-gray-300 leading-normal cursor-pointer select-none">
                    I consent to BTM Security processing my contact information to respond to this inquiry in accordance with the{' '}
                    <Link href="/privacy-policy" className="text-blue-400 hover:underline">
                      Privacy Policy
                    </Link>.
                  </label>
                </div>
              
                <button 
                  type="submit"
                  disabled={isSubmitting || !hasAgreedPrivacy}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <i className="fas fa-lock"></i>
                      <span>Send TLS-Secured Message</span>
                    </>
                  )}
                </button>
              </form>
              
              {submitMessage && (
                <div className={`mt-4 text-center text-sm font-medium ${submitMessage.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                  {submitMessage}
                </div>
              )}
            </motion.div>

            {/* Contact Info & Response SLA */}
            <div className="space-y-8">
              
              {/* Direct Communications */}
              <motion.div 
                className="contact-card bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 transition duration-300 hover:border-blue-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <i className="fas fa-phone-alt text-blue-400 mt-1 mr-4"></i>
                    <div>
                      <p className="font-medium text-white">Direct & Emergency Line</p>
                      <a href="tel:+2347045981315" className="text-emerald-400 hover:underline font-mono text-sm">
                        +234 704 598 1315
                      </a>
                      <p className="text-xs text-gray-400 mt-0.5">Available for urgent incident calls</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fas fa-envelope text-blue-400 mt-1 mr-4"></i>
                    <div>
                      <p className="font-medium text-white">General Inquiries</p>
                      <a href="mailto:support@btmsec.com" className="text-blue-400 hover:underline text-sm font-mono">
                        support@btmsec.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fas fa-shield-virus text-blue-400 mt-1 mr-4"></i>
                    <div>
                      <p className="font-medium text-white">Vulnerability Reporting</p>
                      <a href="mailto:security@btmsec.com" className="text-blue-400 hover:underline text-sm font-mono">
                        security@btmsec.com
                      </a>
                      <p className="text-xs text-gray-400 mt-0.5">
                        See our{' '}
                        <Link href="/vulnerability-disclosure" className="text-cyan-400 hover:underline">
                          Vulnerability Disclosure Policy
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fas fa-clock text-blue-400 mt-1 mr-4"></i>
                    <div>
                      <p className="font-medium text-white">Guaranteed Response Time</p>
                      <p className="text-gray-300 text-sm">We respond within 1 business day.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Scoping & Advisory Card */}
              <motion.div 
                className="contact-card bg-gradient-to-br from-[#0a1535] to-[#070e24] border border-blue-500/40 rounded-xl p-8 transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-3 text-cyan-400 text-xs font-mono uppercase tracking-wider font-semibold">
                  <i className="fas fa-calendar-alt"></i>
                  <span>Free Initial Scoping</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Book a 15-Minute Scoping Call</h2>
                <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                  Need a quick evaluation of your application security, cloud posture, or compliance needs? Select &ldquo;15-Minute Scoping Call&rdquo; in the form or call us directly.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <i className="fas fa-check-circle"></i>
                  <span>We respond within 1 business day to confirm your slot</span>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Security Assurance */}
      <motion.section 
        className="py-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 text-center space-y-4">
          <i className="fas fa-shield-alt text-blue-500 text-4xl mb-2"></i>
          <h2 className="text-2xl font-bold gradient-text">Enterprise-Grade Security</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            All communications are TLS-encrypted in transit. For security reports, responsible disclosure guidelines, and safe harbor terms, please review our{' '}
            <Link href="/vulnerability-disclosure" className="text-blue-400 hover:underline font-medium">
              Vulnerability Disclosure Policy
            </Link>{' '}
            or our{' '}
            <a href="/security.txt" className="text-cyan-400 hover:underline font-mono text-xs">
              security.txt
            </a>.
          </p>
        </div>
      </motion.section>
    </div>
  );
}