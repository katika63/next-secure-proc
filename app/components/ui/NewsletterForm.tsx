'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    const subject = 'Newsletter Subscription Request'
    const body = `Please subscribe the following email address to the BTM Security newsletter:\n\nEmail: ${email}`
    window.location.href = `mailto:admin@btmsec.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
    setEmail('')
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 px-4 py-3 bg-[#040914] border border-[#1e2942] rounded-xl text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500 font-mono transition-colors"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 shrink-0"
        >
          Subscribe
        </button>
      </form>
      {submitted && (
        <p className="text-xs text-emerald-400 font-mono mt-3">
          ✅ Thank you for subscribing! Check your mail app to complete request.
        </p>
      )}
    </div>
  )
}
