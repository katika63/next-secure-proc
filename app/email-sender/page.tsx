'use client'

import React, { useState } from 'react'

interface FormState {
  from: string
  to: string
  cc: string
  bcc: string
  subject: string
  fullName: string
  jobTitle: string
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
  const SENDER_DEFAULTS: Record<string, { fullName: string; jobTitle: string }> = {
    'security@research.btmsec.com': {
      fullName: 'BTM Security Operations',
      jobTitle: 'AI-Powered Cyber Defense & SecOps',
    },
    'disclosure@research.btmsec.com': {
      fullName: 'BTM Vulnerability Disclosure',
      jobTitle: 'Coordinated Vulnerability Research',
    },
    'advisory@research.btmsec.com': {
      fullName: 'BTM Threat Advisory',
      jobTitle: 'Threat Intelligence & Security Research',
    },
  }

  const [formData, setFormData] = useState<FormState>({
    from: 'security@research.btmsec.com',
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    fullName: 'BTM Security Operations',
    jobTitle: 'AI-Powered Cyber Defense & SecOps',
    bodyMode: 'text',
    bodyContent: ''
  })

  const [showSigPreview, setShowSigPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<SendStatus>({ type: 'idle', message: '' })

  const REPLY_TO_MAP: Record<string, string> = {
    'security@research.btmsec.com':   'security.research@btmsec.com',
    'disclosure@research.btmsec.com': 'disclosure.research@btmsec.com',
    'advisory@research.btmsec.com':   'advisory@btmsec.com',
  }
  const derivedReplyTo = REPLY_TO_MAP[formData.from] ?? ''

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'from' && SENDER_DEFAULTS[value]) {
      setFormData((prev) => ({
        ...prev,
        from: value,
        fullName: prev.fullName === SENDER_DEFAULTS[prev.from]?.fullName ? SENDER_DEFAULTS[value].fullName : prev.fullName,
        jobTitle: prev.jobTitle === SENDER_DEFAULTS[prev.from]?.jobTitle ? SENDER_DEFAULTS[value].jobTitle : prev.jobTitle,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
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
      fullName?: string
      jobTitle?: string
    } = {
      from: formData.from,
      to: toRecipients,
      cc: ccRecipients.length > 0 ? ccRecipients : undefined,
      bcc: bccRecipients.length > 0 ? bccRecipients : undefined,
      subject: formData.subject.trim(),
      fullName: formData.fullName.trim() || undefined,
      jobTitle: formData.jobTitle.trim() || undefined,
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
              Sends from research.btmsec.com. Replies route to security.research@ or disclosure.research@btmsec.com.
            </p>
          </div>

          {/* Signature Identity (Sender Profile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-[#030712]/40 border border-[#1e2942]/60">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="field-fullname" className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
                  Signature Name
                </label>
                <span className="text-[10px] text-slate-500 font-mono">Sign-off Identity</span>
              </div>
              <input
                id="field-fullname"
                name="fullName"
                type="text"
                disabled={isSubmitting}
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="BTM Security Operations"
                className="w-full px-3 py-2 rounded-lg bg-[#030712]/70 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="field-jobtitle" className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
                  Signature Title
                </label>
                <span className="text-[10px] text-slate-500 font-mono">Designation</span>
              </div>
              <input
                id="field-jobtitle"
                name="jobTitle"
                type="text"
                disabled={isSubmitting}
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="AI-Powered Cyber Defense & SecOps"
                className="w-full px-3 py-2 rounded-lg bg-[#030712]/70 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
              />
            </div>
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

          {/* Signature Live Preview Accordion */}
          <div className="rounded-xl border border-[#1e2942]/70 bg-[#030712]/40 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSigPreview(!showSigPreview)}
              className="w-full px-4 py-2.5 text-xs font-mono font-medium text-slate-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Branded Email Signature (Appended Automatically)</span>
              </span>
              <span className="text-[11px] text-blue-400">
                {showSigPreview ? 'Hide Preview ▲' : 'Show Preview ▼'}
              </span>
            </button>

            {showSigPreview && (
              <div className="p-4 border-t border-[#1e2942]/70 bg-[#ffffff] rounded-b-xl overflow-x-auto text-[#0b1428]">
                <table
                  cellPadding="0"
                  cellSpacing="0"
                  border={0}
                  width="620"
                  style={{
                    width: '100%',
                    maxWidth: '620px',
                    background: '#ffffff',
                    fontFamily: 'Arial,Helvetica,sans-serif',
                    color: '#0b1428',
                    borderCollapse: 'collapse',
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: '20px', background: '#ffffff' }}>
                        <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                          <tbody>
                            <tr>
                              {/* LOGO */}
                              <td
                                width="175"
                                valign="middle"
                                style={{
                                  width: '175px',
                                  paddingRight: '18px',
                                  borderRight: '3px solid #1677ed',
                                }}
                              >
                                <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                                  <tbody>
                                    <tr>
                                      <td
                                        align="center"
                                        style={{
                                          background: '#0b1428',
                                          padding: '13px 5px 10px',
                                          borderBottom: '4px solid #12b8ed',
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontSize: '34px',
                                            fontWeight: 900,
                                            letterSpacing: '-2px',
                                            lineHeight: 1.1,
                                            color: '#ffffff',
                                          }}
                                        >
                                          BTM<span style={{ color: '#12b8ed' }}>.</span>
                                        </div>
                                        <div
                                          style={{
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            letterSpacing: '4px',
                                            color: '#ffffff',
                                            marginTop: '5px',
                                          }}
                                        >
                                          SECURITY
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style={{
                                          paddingTop: '10px',
                                          fontSize: '9px',
                                          fontWeight: 'bold',
                                          letterSpacing: '1.5px',
                                          color: '#1677ed',
                                        }}
                                      >
                                        DETECT · DEFEND · THRIVE
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>

                              {/* CONTACT DETAILS */}
                              <td valign="middle" style={{ paddingLeft: '20px' }}>
                                <div
                                  style={{
                                    fontSize: '23px',
                                    fontWeight: 'bold',
                                    lineHeight: 1.3,
                                    color: '#0b1428',
                                  }}
                                >
                                  {formData.fullName || 'BTM Security Operations'}
                                </div>
                                <div
                                  style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#1677ed',
                                    paddingTop: '3px',
                                  }}
                                >
                                  {formData.jobTitle || 'AI-Powered Cyber Defense & SecOps'}
                                </div>
                                <div
                                  style={{
                                    fontSize: '12px',
                                    color: '#64748b',
                                    paddingTop: '4px',
                                  }}
                                >
                                  Blue Team Module Security
                                </div>
                                <div
                                  style={{
                                    height: '1px',
                                    background: '#dce6f2',
                                    margin: '12px 0',
                                  }}
                                />
                                <table
                                  cellPadding="0"
                                  cellSpacing="0"
                                  border={0}
                                  style={{
                                    fontSize: '12px',
                                    lineHeight: 2,
                                    color: '#0b1428',
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', paddingRight: '9px' }}>
                                        WEB
                                      </td>
                                      <td>
                                        <a
                                          href="https://www.btmsec.com"
                                          target="_blank"
                                          rel="noreferrer"
                                          style={{ color: '#1677ed', textDecoration: 'none' }}
                                        >
                                          www.btmsec.com
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', paddingRight: '9px' }}>
                                        EMAIL
                                      </td>
                                      <td>
                                        <a
                                          href={`mailto:${derivedReplyTo}`}
                                          style={{ color: '#1677ed', textDecoration: 'none' }}
                                        >
                                          {derivedReplyTo}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', paddingRight: '9px' }}>
                                        LOCATION
                                      </td>
                                      <td style={{ color: '#0b1428' }}>
                                        Global Operation
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px 20px 17px', background: '#ffffff' }}>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            letterSpacing: '0.4px',
                            color: '#1677ed',
                          }}
                        >
                          CYBERSECURITY. INTELLIGENCE. RESILIENCE.
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            lineHeight: 1.7,
                            color: '#475569',
                            paddingTop: '5px',
                          }}
                        >
                          AI-Powered Security Operations · Threat Intelligence · Vulnerability Assessment · Security Research
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          background: '#0b1428',
                          borderTop: '3px solid #12b8ed',
                          padding: '14px 20px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '13px',
                            fontWeight: 'bold',
                            letterSpacing: '0.7px',
                            color: '#ffffff',
                          }}
                        >
                          GLOBAL REACH
                          <span style={{ color: '#12b8ed' }}> · AFRICAN PRIORITY</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#cbd5e1', paddingTop: '6px' }}>
                          Building a safer and more resilient digital world.
                        </div>
                        <div style={{ fontSize: '9px', color: '#64748b', paddingTop: '9px' }}>
                          © BTMSecurity | Blue Team Module Security
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
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
