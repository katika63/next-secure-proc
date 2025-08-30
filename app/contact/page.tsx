'use client';

import { motion } from 'framer-motion'
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Incident Response',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    formPayload.append('access_key', '65b6b603-d909-4d0d-abc4-fb0e9034214e');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('✅ Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          company: '',
          service: 'Incident Response',
          message: ''
        });
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Secure Your Future</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Our cybersecurity experts are ready to assess your threats and build a custom defense strategy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 px-6">
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
              <h2 className="text-2xl font-bold mb-6 gradient-text">Send a Secure Message</h2>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value="65b6b603-d909-4d0d-abc4-fb0e9034214e" />
              
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                  <input 
                    name="name" 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 mb-2">Work Email</label>
                  <input 
                    name="email" 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              
                <div className="mb-4">
                  <label htmlFor="company" className="block text-gray-300 mb-2">Company</label>
                  <input 
                    name="company" 
                    type="text" 
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              
                <div className="mb-4">
                  <label htmlFor="service" className="block text-gray-300 mb-2">Service Needed</label>
                  <select 
                    name="service" 
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Incident Response">Incident Response</option>
                    <option value="Penetration Testing">Penetration Testing</option>
                    <option value="Security Audit">Security Audit</option>
                    <option value="Managed Detection">Managed Detection</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none resize-none"
                  ></textarea>
                </div>
              
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <i className="fas fa-lock mr-2"></i> Send Encrypted Message
                    </>
                  )}
                </button>
              </form>
              
              {submitMessage && (
                <div className={`mt-4 text-center ${submitMessage.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                  {submitMessage}
                </div>
              )}
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div 
                className="contact-card bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 transition duration-300 hover:border-blue-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6 gradient-text">Global Headquarters</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-blue-400 mt-1 mr-4"></i>
                    <div>
                      <p className="font-medium">BTMSecurity Ltd.</p>
                      <p className="text-gray-300">20-22 Wenlock Road</p>
                      <p className="text-gray-300">London N1 7GU, UK</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-phone-alt text-blue-400 mt-1 mr-4"></i>
                    <div>
                      <p className="font-medium">24/7 Emergency Response</p>
                      <p className="text-gray-300">+44 7901959945</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-envelope text-blue-400 mt-1 mr-4"></i>
                    <div>
                      <p className="font-medium">General Inquiries</p>
                      <p className="text-gray-300">support@btmsec.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="contact-card bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 transition duration-300 hover:border-blue-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6 gradient-text">SOC Locations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-blue-400 mb-2">London</h3>
                    <p className="text-gray-300">+44 (0)20 9876 5432</p>
                    <p className="text-gray-300">soc-eu@btmsec.com</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-400 mb-2">Europe</h3>
                    <p className="text-gray-300">+44 7901959945</p>
                    <p className="text-gray-300">soc-eu@btmsec.com</p>
                  </div>
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
        <div className="max-w-7xl mx-auto bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-8 text-center">
          <i className="fas fa-shield-alt text-blue-500 text-5xl mb-6"></i>
          <h2 className="text-2xl font-bold mb-4 gradient-text">Enterprise-Grade Security</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            All communications are encrypted end-to-end using AES-256. For critical vulnerabilities, use our 
            <a href="#" className="text-blue-400 hover:underline mx-1">PGP key</a> or 
            <a href="#" className="text-blue-400 hover:underline mx-1">Signal secure messenger</a>.
          </p>
        </div>
      </motion.section>
    </div>
  );
}