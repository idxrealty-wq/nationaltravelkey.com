const heroStats = [
  { value: '67', label: 'Parks Reporting' },
  { value: '412', label: 'Units Available' },
  { value: '21', label: 'Counties Open' },
  { value: '9', label: 'Fully Booked' },
] as const;

const liveInventoryCards = [
  { name: 'Trimble Park', county: 'Orange County', detail: 'Lakefront campground', status: 'Featured' },
  { name: 'Kelly Park', county: 'Orange County', detail: 'Spring and day-use destination', status: 'Featured' },
  { name: 'Live inventory expanding', county: 'NTK Database', detail: 'More parks can be added next', status: 'Connected' },
  { name: 'Traveler profile flow', county: 'NTK Platform', detail: 'Reusable identity for faster check-in', status: 'Ready' },
] as const;

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#c9a227]/20 bg-gradient-to-br from-[#08152b] via-[#0d1f3c] to-[#10294d]">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #c9a227 0%, transparent 35%), radial-gradient(circle at 80% 10%, #c9a227 0%, transparent 25%)' }} />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#c9a227]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Florida Prototype</span>
            </div>
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Find. Register. Go.<br />
              <span className="text-[#c9a227]">One mobile-first path to Florida park stays.</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
              National Travel Key is a completion engine, not an information dump. Search participating parks, compare live openings, move toward registration faster, and arrive ready with one reusable traveler profile.
            </p>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <a href="#county-grid" className="inline-flex items-center justify-center rounded-xl bg-[#c9a227] px-8 py-4 text-base font-black text-[#08152b] transition hover:bg-[#d8b13a]">Find Florida Parks</a>
              <a href="#how-it-works" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-8 py-4 text-white transition hover:border-white/40">See How NTK Works</a>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-[#c9a227]">{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="rounded-[28px] border border-[#c9a227]/25 bg-[#0d1f3c]/80 p-6 shadow-2xl">
              <div className="rounded-[24px] border border-white/10 bg-[#08152b] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Live Inventory Pulse</p>
                    <h2 className="text-xl font-black text-white">Florida availability snapshot</h2>
                  </div>
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">9 NO VACANCY</span>
                </div>
                <div className="space-y-3">
                  {liveInventoryCards.map((park) => (
                    <div key={park.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-white">{park.name}</p>
                          <p className="mt-1 text-xs text-gray-400">{park.county}</p>
                          <p className="mt-1 text-xs text-[#c9a227]">{park.detail}</p>
                        </div>
                        <p className="shrink-0 text-sm font-black text-white">{park.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-[#c9a227]/20 bg-[#c9a227]/10 p-4">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#c9a227]">Completion Engine</p>
                  <p className="text-sm leading-relaxed text-gray-200">NTK is built to help people find a place, move into registration, and get on with the trip from a mobile-first experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
