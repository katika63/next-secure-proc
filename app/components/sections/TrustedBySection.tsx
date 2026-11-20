'use client'

const brands = [
  { name: 'Microsoft',      icon: 'fab fa-microsoft' },
  { name: 'AWS',            icon: 'fab fa-aws' },
  { name: 'Google Cloud',   icon: 'fab fa-google' },
  { name: 'Interswitch',    icon: 'fas fa-exchange-alt' },
  { name: 'Paystack',       icon: 'fas fa-layer-group' },
  { name: 'Flutterwave',    icon: 'fas fa-wave-square' },
  { name: 'Cisco',          icon: 'fas fa-network-wired' },
  { name: 'IBM Security',   icon: 'fas fa-server' },
  { name: 'Standard Bank',  icon: 'fas fa-shield-alt' },
  { name: 'Palo Alto',      icon: 'fas fa-lock' },
  { name: 'CrowdStrike',    icon: 'fas fa-crow' },
  { name: 'MTN Group',      icon: 'fas fa-signal' },
  { name: 'Stanbic IBTC',   icon: 'fas fa-university' },
  { name: 'Zenith Bank',    icon: 'fas fa-landmark' },
  { name: 'Azure',          icon: 'fab fa-microsoft' },
]

// Duplicate for seamless infinite loop
const track = [...brands, ...brands]

const TrustedBySection = () => (
  <section
    aria-label="Trusted Enterprise Clients and Partners"
    className="py-8 sm:py-10 bg-transparent border-y border-[#1e2942]/60 overflow-hidden"
  >
    {/* ── Header label ─────────────────────────────────────────── */}
    <div className="flex items-center justify-center gap-2.5 mb-6 px-6">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
      <span className="text-[11px] sm:text-xs font-bold tracking-widest text-slate-400 font-mono uppercase text-center">
        TRUSTED BY AFRICAN ENTERPRISES &amp; GLOBAL LEADERS
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
    </div>

    {/* ── Marquee track ────────────────────────────────────────── */}
    {/* Left + right fade masks */}
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{
          background:
            'linear-gradient(to right, #030712 0%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{
          background:
            'linear-gradient(to left, #030712 0%, transparent 100%)',
        }}
      />

      {/* Scrolling strip — CSS animation only, no JS */}
      <div className="flex animate-marquee will-change-transform">
        {track.map((brand, idx) => (
          <div
            key={idx}
            className="
              flex items-center gap-2.5 shrink-0
              px-8 sm:px-10
              text-slate-400 hover:text-white
              transition-colors duration-200
              cursor-default select-none
            "
          >
            <i
              className={`${brand.icon} text-lg sm:text-xl text-blue-400/70`}
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm font-semibold font-sans whitespace-nowrap">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default TrustedBySection
