'use client'

import React, { useState } from 'react'

interface FormState {
  from: string
  to: string
  cc: string
  bcc: string
  subject: string
  bodyMode: 'text' | 'html'
  bodyContent: string
}

interface SendStatus {
  type: 'idle' | 'success' | 'error'
  message: string
  messageId?: string
}

// Simple email regex for client-side pre-validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseEmailList(input: string): string[] {
  return input
    .split(',')
    .map((e) => e.trim())
    .filter((e) => e.length > 0)
}

export default function EmailSenderPage() {
  const [formData, setFormData] = useState<FormState>({
    from: 'security@research.btmsec.com',
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    bodyMode: 'text',
    bodyContent: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<SendStatus>({ type: 'idle', message: '' })

  const derivedReplyTo = formData.from.replace('@research.btmsec.com', '@btmsec.com')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 1. Client-side parse & validation
    const toRecipients = parseEmailList(formData.to)
    const ccRecipients = parseEmailList(formData.cc)
    const bccRecipients = parseEmailList(formData.bcc)

    if (toRecipients.length === 0) {
      setStatus({
        type: 'error',
        message: 'Please provide at least one valid recipient in the "To" field.'
      })
      return
    }

    const invalidTo = toRecipients.find((email) => !EMAIL_REGEX.test(email))
    if (invalidTo) {
      setStatus({
        type: 'error',
        message: `Invalid email address in "To" field: ${invalidTo}`
      })
      return
    }

    const invalidCc = ccRecipients.find((email) => !EMAIL_REGEX.test(email))
    if (invalidCc) {
      setStatus({
        type: 'error',
        message: `Invalid email address in "CC" field: ${invalidCc}`
      })
      return
    }

    const invalidBcc = bccRecipients.find((email) => !EMAIL_REGEX.test(email))
    if (invalidBcc) {
      setStatus({
        type: 'error',
        message: `Invalid email address in "BCC" field: ${invalidBcc}`
      })
      return
    }

    if (!formData.subject.trim()) {
      setStatus({
        type: 'error',
        message: 'Email subject cannot be empty.'
      })
      return
    }

    if (!formData.bodyContent.trim()) {
      setStatus({
        type: 'error',
        message: 'Email body content cannot be empty.'
      })
      return
    }

    // 2. Prepare payload (from is included; replyTo is derived server-side)
    const payload: {
      from: string
      to: string[]
      cc?: string[]
      bcc?: string[]
      subject: string
      text?: string
      html?: string
    } = {
      from: formData.from,
      to: toRecipients,
      cc: ccRecipients.length > 0 ? ccRecipients : undefined,
      bcc: bccRecipients.length > 0 ? bccRecipients : undefined,
      subject: formData.subject.trim()
    }

    if (formData.bodyMode === 'html') {
      payload.html = formData.bodyContent
    } else {
      payload.text = formData.bodyContent
    }

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP error ${response.status}`)
      }

      setStatus({
        type: 'success',
        message: 'Email successfully dispatched through Resend.',
        messageId: data.id
      })
      // Values are intentionally kept so the user can tweak or resend
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error ? err.message : 'Network failure while attempting to send email'
      setStatus({
        type: 'error',
        message: errMessage
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 flex items-center justify-center font-sans bg-transparent relative z-10">
      {/* Background radial glow accents matching project pages */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-[720px] rounded-2xl border border-[#1e2942] bg-[#0a1124]/65 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative">
        {/* Header */}
        <header className="mb-8 border-b border-[#1e2942]/70 pb-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-mono mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>BTM SECURITY OPERATIONS</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Internal Email Dispatcher
              </h1>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-sm">
              Provider: Resend API
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Direct authenticated dispatch for research advisories, security notifications, and operational bulletins.
          </p>
        </header>

        {/* Live Status Result Banner */}
        <div aria-live="polite" className="mb-6">
          {status.type === 'success' && (
            <div
              role="status"
              className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </span>
                <span className="text-sm font-medium">{status.message}</span>
              </div>
              {status.messageId && (
                <div className="text-xs font-mono bg-emerald-900/50 px-2.5 py-1 rounded text-emerald-300 border border-emerald-500/30 shrink-0">
                  ID: <span className="font-semibold">{status.messageId}</span>
                </div>
              )}
            </div>
          )}

          {status.type === 'error' && (
            <div
              role="alert"
              className="p-4 rounded-xl border border-red-500/40 bg-red-950/40 text-red-200 flex items-start space-x-2.5 backdrop-blur-sm"
            >
              <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </span>
              <div className="text-sm">
                <span className="font-semibold block sm:inline">Dispatch failed: </span>
                <span>{status.message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Dispatch Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* FROM (Sender) Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-from" className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
                From (Sender) <span className="text-blue-400">*</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">Verified Subdomain</span>
            </div>
            <select
              id="field-from"
              name="from"
              disabled={isSubmitting}
              value={formData.from}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712]/60 backdrop-blur-sm border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed [&>option]:bg-[#0a1124] [&>option]:text-white"
            >
              <option value="security@research.btmsec.com">
                Security — security@research.btmsec.com
              </option>
              <option value="disclosure@research.btmsec.com">
                Disclosure — disclosure@research.btmsec.com
              </option>
              <option value="advisory@research.btmsec.com">
                Advisory — advisory@research.btmsec.com
              </option>
            </select>
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Sends from research.btmsec.com. Replies go to the matching @btmsec.com Zoho inbox.
            </p>
          </div>

          {/* TO Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-to" className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
                To <span className="text-blue-400">*</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">Comma-separated</span>
            </div>
            <input
              id="field-to"
              name="to"
              type="text"
              required
              disabled={isSubmitting}
              value={formData.to}
              onChange={handleInputChange}
              placeholder="client@example.com, audit@partner.com"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712]/60 backdrop-blur-sm border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* CC & BCC Fields (Responsive 2-column) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="field-cc" className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
                  CC <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">Comma-separated</span>
              </div>
              <input
                id="field-cc"
                name="cc"
                type="text"
                disabled={isSubmitting}
                value={formData.cc}
                onChange={handleInputChange}
                placeholder="lead@btmsec.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712]/60 backdrop-blur-sm border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="field-bcc" className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
                  BCC <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">Comma-separated</span>
              </div>
              <input
                id="field-bcc"
                name="bcc"
                type="text"
                disabled={isSubmitting}
                value={formData.bcc}
                onChange={handleInputChange}
                placeholder="archive@btmsec.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712]/60 backdrop-blur-sm border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="field-subject" className="block text-xs font-mono font-medium uppercase tracking-wider text-slate-300 mb-1.5">
              Subject <span className="text-blue-400">*</span>
            </label>
            <input
              id="field-subject"
              name="subject"
              type="text"
              required
              disabled={isSubmitting}
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="[SEC-ADVISORY] Security Assessment Summary & Findings"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712]/60 backdrop-blur-sm border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Body Mode Switcher + Content Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="field-body" className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
                Message Body <span className="text-blue-400">*</span>
              </label>

              {/* Mode Toggle */}
              <div className="flex rounded-md p-0.5 bg-slate-900/80 border border-slate-800 backdrop-blur-sm" role="group" aria-label="Body format selection">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setFormData((prev) => ({ ...prev, bodyMode: 'text' }))}
                  className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                    formData.bodyMode === 'text'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Plain Text
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setFormData((prev) => ({ ...prev, bodyMode: 'html' }))}
                  className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                    formData.bodyMode === 'html'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  HTML
                </button>
              </div>
            </div>

            <textarea
              id="field-body"
              name="bodyContent"
              required
              rows={8}
              disabled={isSubmitting}
              value={formData.bodyContent}
              onChange={handleInputChange}
              placeholder={
                formData.bodyMode === 'html'
                  ? '<h2>Security Assessment Update</h2>\n<p>Your scheduled verification completed with 0 critical findings.</p>'
                  : 'Hello Team,\n\nPlease find attached the vulnerability mitigation overview for your staging review.\n\nRegards,\nBTM Security Research'
              }
              className={`w-full px-3.5 py-2.5 rounded-lg bg-[#030712]/60 backdrop-blur-sm border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                formData.bodyMode === 'html' ? 'font-mono text-xs' : 'font-sans'
              }`}
            />
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              {formData.bodyMode === 'html'
                ? 'A plain-text fallback will automatically be generated and sent along with this HTML.'
                : 'A clean HTML version (<pre>) will automatically be bundled for universal client compatibility.'}
            </p>
          </div>

          {/* Reply-To Field (Auto-derived, Read-Only) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-replyto" className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
                Reply-To (auto)
              </label>
              <span className="text-[11px] text-slate-500 font-mono">Auto-Derived</span>
            </div>
            <input
              id="field-replyto"
              name="replyTo"
              type="email"
              readOnly
              value={derivedReplyTo}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#030712]/40 backdrop-blur-sm border border-slate-800 text-slate-400 text-sm cursor-not-allowed opacity-80 focus:outline-none select-none transition-all"
            />
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Replies route to Zoho. Not editable.
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#030712] shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Dispatching Email via Resend...</span>
                </>
              ) : (
                <>
                  <span>Send Security Email</span>
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
