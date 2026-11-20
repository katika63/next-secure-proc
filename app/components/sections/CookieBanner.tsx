'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface CookieConsentState {
  necessary: boolean
  analytics: boolean
  functional: boolean
  status: 'accepted_all' | 'rejected_non_essential' | 'custom'
  updatedAt: string
}

const STORAGE_KEY = 'btm_cookie_consent'
const LEGACY_KEY = 'btm_cookie_accepted_v1'

const DEFAULT_PREFERENCES = {
  necessary: true,
  analytics: false,
  functional: false,
}

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES)

  useEffect(() => {
    setMounted(true)

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const legacyAccepted = localStorage.getItem(LEGACY_KEY)

      if (stored) {
        const parsed: CookieConsentState = JSON.parse(stored)
        setPreferences({
          necessary: true,
          analytics: Boolean(parsed.analytics),
          functional: Boolean(parsed.functional),
        })
        setShowBanner(false)
      } else if (legacyAccepted === 'true') {
        setPreferences({
          necessary: true,
          analytics: true,
          functional: true,
        })
        setShowBanner(false)
      } else {
        // No consent recorded yet
        setShowBanner(true)
      }
    } catch {
      setShowBanner(true)
    }

    const handleOpenModal = () => {
      setShowModal(true)
    }

    window.addEventListener('openCookiePreferences', handleOpenModal)
    return () => {
      window.removeEventListener('openCookiePreferences', handleOpenModal)
    }
  }, [])

  const saveConsent = (
    nextPrefs: { necessary: boolean; analytics: boolean; functional: boolean },
    status: 'accepted_all' | 'rejected_non_essential' | 'custom'
  ) => {
    const payload: CookieConsentState = {
      ...nextPrefs,
      necessary: true,
      status,
      updatedAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      localStorage.setItem(LEGACY_KEY, status === 'rejected_non_essential' ? 'rejected' : 'true')
    } catch (e) {
      console.warn('Unable to persist cookie consent to localStorage', e)
    }

    setPreferences(nextPrefs)
    setShowBanner(false)
    setShowModal(false)

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: payload }))
    }
  }

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, functional: true }, 'accepted_all')
  }

  const handleDeclineNonEssential = () => {
    saveConsent({ necessary: true, analytics: false, functional: false }, 'rejected_non_essential')
  }

  const handleSaveCustom = () => {
    saveConsent(preferences, 'custom')
  }

  if (!mounted) return null

  return (
    <>
      {/* ─── CENTERED COOKIE CONSENT DIALOG (First visit / no consent stored) ── */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <>
            {/* Full-bleed backdrop — blocks interaction until a choice is made */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Centered consent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-banner-title"
            >
              <div className="w-full max-w-lg bg-[#060e22] border border-[#1e2e50] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.85)] text-slate-100 relative overflow-hidden">
                {/* Top accent stripe */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

                {/* Header */}
                <div className="flex items-center gap-3.5 p-6 pb-4 border-b border-[#142344]">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
                    <i className="fas fa-shield-alt text-lg" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="cookie-banner-title" className="text-sm font-bold text-white tracking-wide">
                      Your Privacy &amp; Cookie Preferences
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                      BTM Security — GDPR &amp; Privacy-First Consent
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-4 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    We use cookies to maintain platform security, remember your session, and optionally improve our service with anonymous usage analytics. You are in full control of which cookie categories we activate.
                  </p>

                  {/* Quick category overview */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#040a1a] border border-[#13223f]">
                      <i className="fas fa-lock text-emerald-400 text-xs mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[11px] font-semibold text-white font-mono">Strictly Necessary</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Session security, CSRF protection, consent memory. Always active.</div>
                      </div>
                      <span className="ml-auto text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded shrink-0">
                        REQUIRED
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#040a1a] border border-[#13223f]">
                      <i className="fas fa-chart-bar text-blue-400 text-xs mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[11px] font-semibold text-white font-mono">Analytics &amp; Performance</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Anonymous usage signals to improve portal responsiveness. No personal data collected.</div>
                      </div>
                      <span className="ml-auto text-[9px] font-mono font-bold text-slate-400 bg-slate-800/60 border border-slate-600/30 px-1.5 py-0.5 rounded shrink-0">
                        OPTIONAL
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#040a1a] border border-[#13223f]">
                      <i className="fas fa-sliders-h text-indigo-400 text-xs mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[11px] font-semibold text-white font-mono">Functional &amp; Platform State</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Terminal preferences, filters, and workspace settings. Personalises your experience.</div>
                      </div>
                      <span className="ml-auto text-[9px] font-mono font-bold text-slate-400 bg-slate-800/60 border border-slate-600/30 px-1.5 py-0.5 rounded shrink-0">
                        OPTIONAL
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Read our{' '}
                    <Link href="/cookie-policy" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">
                      Cookie Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">
                      Privacy Policy
                    </Link>{' '}
                    for full details. You can update your preferences anytime from the footer.
                  </p>
                </div>

                {/* Action Footer */}
                <div className="px-6 py-4 border-t border-[#142344] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => { setShowBanner(false); setShowModal(true) }}
                    className="text-xs text-slate-400 hover:text-cyan-300 transition-colors py-2 sm:py-0 text-center font-mono underline underline-offset-4 sm:mr-auto"
                  >
                    Manage Preferences
                  </button>

                  <button
                    type="button"
                    onClick={handleDeclineNonEssential}
                    className="px-4 py-2.5 text-xs font-medium rounded-lg bg-[#0a1835] hover:bg-[#102450] text-slate-300 hover:text-white border border-[#1b315b] transition-colors text-center"
                  >
                    Essential Only
                  </button>

                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
                  >
                    Accept All Cookies
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── DETAILED PREFERENCES MODAL (opened from "Manage Preferences") ───── */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 z-[202] flex items-center justify-center p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-[#060e22] border border-[#1e2e50] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 text-slate-100 z-10 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent stripe */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-t-2xl" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#142344]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <i className="fas fa-sliders-h text-sm" />
                  </div>
                  <div>
                    <h2 id="cookie-preferences-title" className="text-base font-bold text-white">
                      Cookie &amp; Privacy Preferences
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Configure your cookie preferences for BTM Security.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0f1d38] transition-colors"
                  aria-label="Close preferences modal"
                >
                  <i className="fas fa-times text-sm" />
                </button>
              </div>

              {/* Toggles */}
              <div className="py-4 space-y-4">
                {/* 1. Necessary */}
                <div className="p-4 rounded-xl bg-[#030917] border border-[#142344]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                        Strictly Necessary
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono font-medium">
                        Always Active
                      </span>
                    </div>
                    <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center justify-end px-1 opacity-70 cursor-not-allowed" aria-hidden="true">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Essential for secure website navigation, session integrity, CSRF mitigation, and remembering your consent state. These cannot be disabled.
                  </p>
                </div>

                {/* 2. Analytics */}
                <div className="p-4 rounded-xl bg-[#030917] border border-[#142344] hover:border-[#1e3460] transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      Analytics &amp; Telemetry
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={preferences.analytics}
                      aria-label="Toggle analytics cookies"
                      onClick={() => setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        preferences.analytics ? 'bg-blue-600 justify-end' : 'bg-slate-700 justify-start'
                      }`}
                    >
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Helps us understand platform usage patterns, request latencies, and service responsiveness so we can improve portal performance without profiling your identity.
                  </p>
                </div>

                {/* 3. Functional */}
                <div className="p-4 rounded-xl bg-[#030917] border border-[#142344] hover:border-[#1e3460] transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      Functional &amp; Platform State
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={preferences.functional}
                      aria-label="Toggle functional cookies"
                      onClick={() => setPreferences((prev) => ({ ...prev, functional: !prev.functional }))}
                      className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        preferences.functional ? 'bg-blue-600 justify-end' : 'bg-slate-700 justify-start'
                      }`}
                    >
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Preserves interactive settings such as terminal state preferences, search filters, and workspace customization.
                  </p>
                </div>
              </div>

              {/* Policy Links */}
              <div className="text-[11px] text-slate-400 pb-4">
                Full details in our{' '}
                <Link href="/cookie-policy" onClick={() => setShowModal(false)} className="text-cyan-400 hover:underline">
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" onClick={() => setShowModal(false)} className="text-cyan-400 hover:underline">
                  Privacy Policy
                </Link>.
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-4 border-t border-[#142344]">
                <button
                  type="button"
                  onClick={handleDeclineNonEssential}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg bg-[#0a1835] hover:bg-[#102450] text-slate-300 border border-[#1b315b] transition-colors text-center"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-center"
                >
                  Save My Preferences
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors text-center"
                >
                  Accept All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}