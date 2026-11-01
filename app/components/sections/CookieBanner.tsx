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
      {/* ─── FLOATING COOKIE BANNER ────────────────────────────────────────── */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-xl z-50 pointer-events-auto"
            role="region"
            aria-label="Cookie consent banner"
          >
            <div className="bg-[#050c1e]/95 backdrop-blur-xl border border-[#1e2e50] rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-slate-100 relative overflow-hidden">
              {/* Subtle top cyber border line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent" />

              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400 mt-0.5">
                  <i className="fas fa-shield-alt text-base" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      This website uses cookies
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-cyan-400">
                      Security & Privacy
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    This website uses cookies to improve your experience. We use essential cookies to maintain platform security and sessions, and optional performance cookies to analyze defense portal metrics.{' '}
                    <Link
                      href="/cookie-policy"
                      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors font-medium"
                    >
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-[#142344]">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-xs text-slate-400 hover:text-cyan-300 transition-colors py-2 text-center sm:text-left font-mono underline underline-offset-4"
                >
                  Manage Preferences
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDeclineNonEssential}
                    className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-medium rounded-lg bg-[#0a1835] hover:bg-[#102450] text-slate-300 hover:text-white border border-[#1b315b] transition-colors"
                  >
                    Decline Non-Essential
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DETAILED PREFERENCES MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
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
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#142344]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <i className="fas fa-sliders-h text-sm" />
                  </div>
                  <div>
                    <h2 id="cookie-preferences-title" className="text-base font-bold text-white">
                      Cookie & Privacy Preferences
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
                  aria-label="Close modal"
                >
                  <i className="fas fa-times text-sm" />
                </button>
              </div>

              {/* Toggles Container */}
              <div className="py-4 space-y-4">
                {/* 1. Necessary (Always Active) */}
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
                    {/* Locked Switch */}
                    <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center justify-end px-1 opacity-70 cursor-not-allowed">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Essential for secure website navigation, session integrity, CSRF mitigation, and remembering your consent state. These cannot be disabled.
                  </p>
                </div>

                {/* 2. Analytics & Performance */}
                <div className="p-4 rounded-xl bg-[#030917] border border-[#142344] hover:border-[#1e3460] transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      Analytics & Telemetry
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={preferences.analytics}
                      onClick={() =>
                        setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
                      }
                      className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${
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

                {/* 3. Functional & Interactive Tools */}
                <div className="p-4 rounded-xl bg-[#030917] border border-[#142344] hover:border-[#1e3460] transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      Functional & Platform State
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={preferences.functional}
                      onClick={() =>
                        setPreferences((prev) => ({ ...prev, functional: !prev.functional }))
                      }
                      className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${
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

              {/* Policy Link Note */}
              <div className="text-[11px] text-slate-400 pb-4">
                Detailed information on each cookie category is available in our{' '}
                <Link
                  href="/cookie-policy"
                  onClick={() => setShowModal(false)}
                  className="text-cyan-400 hover:underline"
                >
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy-policy"
                  onClick={() => setShowModal(false)}
                  className="text-cyan-400 hover:underline"
                >
                  Privacy Policy
                </Link>.
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-4 border-t border-[#142344]">
                <button
                  type="button"
                  onClick={handleDeclineNonEssential}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg bg-[#0a1835] hover:bg-[#102450] text-slate-300 border border-[#1b315b] transition-colors text-center"
                >
                  Reject Non-Essential
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