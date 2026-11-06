// components/sections/BecomeTrainer.tsx
import Link from 'next/link'

export default function BecomeTrainer() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#070e20]/90 border border-blue-500/40 rounded-2xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>FACULTY ACCREDITATION</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            Join the BTMSecurity Nigeria Trainer Network
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Our instructor certification program is highly selective, onboarding top Nigerian cybersecurity practitioners, researchers, and enterprise defenders through a thorough technical vetting process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact?type=trainer" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all duration-200"
            >
              <span>Apply for Accreditation</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
