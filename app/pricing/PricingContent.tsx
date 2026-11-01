'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface PricingTier {
  id: string
  tier: string
  name: string
  tagline: string
  usdPrice: string
  usdPeriod: string
  billingNote: string
  badge?: string
  isFeatured?: boolean
  description: string
  features: string[]
  deliverables: string[]
}

interface FaqItem {
  q: string
  a: string
}

// ─── PLANS DATA ────────────────────────────────────────────────────────────────

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    tier: 'Tier 1',
    name: 'Starter',
    tagline: 'Authorized scan + risk report',
    usdPrice: '$1,500',
    usdPeriod: '/ month',
    billingNote: 'Billed monthly · cancel anytime',
    badge: 'Entry Level',
    description:
      'Ideal for startups, SMEs, and MVPs that need a verified vulnerability baseline without the complexity of a full engagement.',
    features: [
      'Authorized web app & API vulnerability scan',
      'OWASP Top 10 & API Security Top 10 coverage',
      'Risk report with severity ratings',
      'Prioritized remediation list',
      'Email support within 1 business day',
    ],
    deliverables: [
      'Risk Assessment Report',
      'Prioritized Remediation Checklist',
    ],
  },
  {
    id: 'standard',
    tier: 'Tier 2',
    name: 'Standard',
    tagline: 'Full penetration test + remediation review',
    usdPrice: '$3,000',
    usdPeriod: '/ month',
    billingNote: 'Billed monthly · enterprise SLA',
    badge: 'Most Popular',
    isFeatured: true,
    description:
      'A complete, structured penetration test for growing companies in fintech, e-commerce, and digital banking that require a detailed findings report and guided remediation.',
    features: [
      'Full web application penetration test',
      'API security testing & business logic analysis',
      'Detailed technical findings report',
      'Remediation review session included',
      'Book a 15-minute scoping call',
      'Re-test within 30 days of report delivery',
    ],
    deliverables: [
      'Detailed Penetration Test Report',
      'Remediation Review Session',
      'Certificate of Penetration Testing',
    ],
  },
  {
    id: 'premium',
    tier: 'Tier 3',
    name: 'Premium / Enterprise',
    tagline: 'Continuous testing · 24/7 monitoring · IR',
    usdPrice: '$5,000',
    usdPeriod: '/ week',
    billingNote: 'Weekly cadence · priority SLA',
    badge: 'High Assurance',
    description:
      'Mission-critical, fully authorized continuous security operations for banks, payment platforms, and institutions under stringent regulatory oversight.',
    features: [
      'Continuous authorized penetration testing',
      '24/7 threat monitoring & anomaly detection',
      'Incident response with rapid containment',
      'Executive briefing & board-level reporting',
      'Priority support with dedicated analyst',
      'Regulatory compliance advisory (NDPR, CBN, POPIA)',
    ],
    deliverables: [
      'Continuous Security Posture Reports',
      'Incident Response Documentation',
      'Executive Briefing Deck',
      'Compliance Advisory Dossier',
    ],
  },
]

const FAQS: FaqItem[] = [
  {
    q: 'Why different tiers?',
    a: 'The tiers reflect scope, frequency, monitoring depth, and response time. Tier 1 covers a snapshot scan with a risk report. Tier 2 adds a full penetration test and remediation review. Tier 3 is a continuous, always-on program with monitoring, incident response, and executive reporting.',
  },
  {
    q: 'Why $5,000 per week for Premium?',
    a: 'The Premium fee reflects continuous, fully authorized penetration testing running every week, with 24/7 monitoring, dedicated incident response capability, and executive briefings. This is not a one-time test — it is an ongoing security program staffed by specialists.',
  },
  {
    q: 'Are these prices fixed or scope-dependent?',
    a: 'The prices above are standard entry rates. Final pricing may be adjusted based on asset count, API complexity, compliance requirements, urgency, and environment size. Book a 15-minute scoping call to get a firm quote for your organization.',
  },
  {
    q: 'Can Nigerian and African organizations pay in Naira?',
    a: 'Yes. We are Nigeria-based and can invoice in Nigerian Naira (NGN) at the prevailing interbank exchange rate at the time of contract execution. Contact us to confirm the current NGN equivalent.',
  },
  {
    q: 'Can I combine tiers or upgrade later?',
    a: 'Absolutely. Many clients start at Tier 1 to establish a baseline, then move to Tier 2 or 3 as their product and compliance needs grow. Contact us to discuss a progression plan.',
  },
]

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function FaqRow({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#1e2942] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-[#0a1124]/70 hover:bg-[#0d1735] transition-colors"
      >
        <span className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-blue-400 font-mono text-xs shrink-0">Q{index + 1}.</span>
          {faq.q}
        </span>
        <i className={`fas fa-chevron-down text-slate-400 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-6 py-4 text-sm text-slate-300 leading-relaxed border-t border-[#1e2942]/60 bg-[#070d1e]/60">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function PricingContent() {
  return (
    <div className="relative py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="text-center relative pt-2 sm:pt-4 pb-2">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#0a1124] border border-blue-500/40 text-blue-400 text-[10px] sm:text-xs font-mono tracking-wider uppercase mb-5 sm:mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>NIGERIA-BASED · TRANSPARENT CYBERSECURITY PRICING</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6"
        >
          Standard &amp; <span className="gradient-text-blue">Enterprise Plans</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          Three tiers built for African organizations — from startups needing a baseline scan to
          enterprises requiring continuous, always-on security operations.
        </motion.p>

        {/* Quick Scoping CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 sm:mt-8 flex justify-center"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all text-center"
          >
            <i className="fas fa-calendar-check" />
            <span>Book a 15-Minute Scoping Call</span>
          </Link>
        </motion.div>
      </section>

      {/* ── African-Focused Packages Subsection ───────────────────────────── */}
      <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0a1329] via-[#0d1b3a] to-[#0a1329] border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shrink-0">
            <i className="fas fa-flag" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white">African-Focused Packages</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Built for Nigeria and African organizations, with pricing starting at{' '}
              <span className="text-white font-semibold">$1,500 / month</span>. Paid add-ons are
              available for additional assets, compliance frameworks (NDPR, CBN, BoG, POPIA), or
              expanded API scope. <a href="/contact" className="text-blue-400 hover:underline">Contact us</a> to discuss NGN invoicing.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3-Tier Pricing Cards ───────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`relative flex flex-col justify-between rounded-2xl p-6 glass-card glass-card-hover transition-all duration-300 border ${
                plan.isFeatured
                  ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/40'
                  : 'border-[#1e2942]'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      plan.isFeatured
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 border border-blue-400/50'
                        : 'bg-[#0f1b36] text-blue-300 border border-[#1e2942]'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Tier label + plan name */}
                <div className="pt-2 mb-5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {plan.tier}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-0.5 mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{plan.tagline}</p>
                </div>

                {/* Price block */}
                <div className="p-4 rounded-xl bg-[#040914] border border-[#1e2942] mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                      {plan.usdPrice}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{plan.usdPeriod}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1.5">{plan.billingNote}</div>
                </div>

                <p className="text-xs text-slate-300 mb-6 leading-relaxed">{plan.description}</p>

                {/* Features */}
                <div className="space-y-4 mb-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Includes:
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-300 gap-2.5">
                        <i className="fas fa-check-circle text-blue-400 text-xs shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="pt-4 border-t border-[#1e2942]/70 mb-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {plan.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-center text-xs text-slate-400 gap-2">
                        <i className="fas fa-shield text-[10px] text-cyan-400 shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link href="/contact" className="block w-full">
                  <button
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      plan.isFeatured
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-[#0a1124] border border-[#1e2942] hover:border-blue-500 text-slate-200 hover:text-white'
                    }`}
                  >
                    <i className="fas fa-calendar-check text-xs" />
                    <span>Book a 15-Minute Scoping Call</span>
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Scope Determinants ─────────────────────────────────────────────── */}
      <section className="p-8 rounded-2xl bg-[#0a1124]/80 border border-[#1e2942] backdrop-blur-md">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">CALIBRATING YOUR ENGAGEMENT</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Factors That Determine Final Scope</h2>
          <p className="text-slate-300 text-sm mt-2">
            Every technical architecture has a unique exposure profile. Here is how our engineers scope engagements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'fa-server', color: 'text-blue-400 bg-blue-600/20', title: 'Asset & Endpoint Count', desc: 'Total web servers, cloud VPCs, databases, and network interfaces in scope.' },
            { icon: 'fa-code', color: 'text-cyan-400 bg-cyan-600/20', title: 'API & Logic Complexity', desc: 'Volume of microservices, payment gateways, and backend logic endpoints.' },
            { icon: 'fa-certificate', color: 'text-emerald-400 bg-emerald-600/20', title: 'Compliance Requirements', desc: 'Frameworks required: CBN, NDPR, BoG, POPIA, PCI-DSS, or ISO 27001.' },
            { icon: 'fa-bolt', color: 'text-sky-400 bg-sky-600/20', title: 'Urgency & SLA Depth', desc: 'Turnaround time, emergency mobilization, and remediation reporting depth.' },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-[#040914] border border-[#1e2942]">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${item.color}`}>
                <i className={`fas ${item.icon}`} />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">QUESTIONS &amp; ANSWERS</span>
            <h2 className="text-3xl font-bold text-white mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <FaqRow key={idx} faq={faq} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <section className="rounded-2xl sm:rounded-3xl p-6 sm:p-12 bg-gradient-to-br from-[#0a1535] via-[#091129] to-[#040915] border border-blue-500/40 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <span>CUSTOM SCOPE &amp; ENTERPRISE CONTRACTS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Need a Custom Cyber Defense Package?
          </h2>

          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
            Speak with a BTM Security engineer to evaluate your asset perimeter, compliance obligations,
            and receive a tailored proposal within 1 business day.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              id="cta-pricing-scoping"
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 text-center"
            >
              <i className="fas fa-calendar-check text-xs" />
              <span>Book Scoping Call</span>
            </Link>
            <Link
              id="cta-pricing-contact"
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-[#0a1124] border border-[#1e2942] hover:border-blue-500/60 text-slate-200 hover:text-white font-semibold text-sm transition-all text-center"
            >
              Request Custom Proposal
            </Link>
            <Link
              id="cta-pricing-operations"
              href="/operations"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-[#0a1124] border border-[#1e2942] hover:border-blue-500/60 text-slate-200 hover:text-white font-semibold text-sm transition-all text-center"
            >
              View Areas of Operation
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
