// components/sections/TrainersHero.tsx
export default function TrainersHero() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>NIGERIA CHAPTER • ACCREDITED FACULTY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight text-white">
          <span className="gradient-text">BTMSecurity Certified Trainers</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Our accredited network of licensed cybersecurity trainers across Nigeria are authorized to deliver BTMSecurity enterprise curriculum, hands-on labs, and professional certifications.
        </p>
      </div>
    </section>
  )
}
