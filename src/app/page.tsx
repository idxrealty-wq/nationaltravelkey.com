'use client';

import { useAuth } from "../components/auth/AuthProvider";
import { signOut } from "../lib/firebase/auth";
import FeaturedParksGrid from "../components/home/FeaturedParksGrid";
const countyTiles = [
  { name: 'Lake County', slug: 'lake', parks: 12, units: 28, openParks: 4, status: 'available' },
  { name: 'Orange County', slug: 'orange', parks: 8, units: 11, openParks: 3, status: 'limited' },
  { name: 'Marion County', slug: 'marion', parks: 10, units: 19, openParks: 5, status: 'available' },
  { name: 'Monroe County', slug: 'monroe', parks: 7, units: 0, openParks: 0, status: 'full' },
  { name: 'Volusia County', slug: 'volusia', parks: 9, units: 14, openParks: 2, status: 'limited' },
  { name: 'Brevard County', slug: 'brevard', parks: 6, units: 9, openParks: 2, status: 'limited' },
  { name: 'Seminole County', slug: 'seminole', parks: 4, units: 6, openParks: 1, status: 'limited' },
  { name: 'Osceola County', slug: 'osceola', parks: 5, units: 13, openParks: 3, status: 'available' },
];

const steps = [
  {
    number: '01',
    title: 'Create your Travel Key profile',
    description:
      'Enter your information once â€” name, vehicle details, emergency contacts, and preferences. Your profile is stored securely and ready to share instantly.',
  },
  {
    number: '02',
    title: 'Search by county',
    description:
      'Browse the county grid to see which areas have availability. Each tile shows participating parks, units remaining, and current status in real time.',
  },
  {
    number: '03',
    title: 'Find a park with openings',
    description:
      'Drill into any county to see individual parks. Filter by site type â€” cabin, RV hookup, tent, or primitive. See pricing and units left before you drive.',
  },
  {
    number: '04',
    title: 'Share your profile at check-in',
    description:
      'When you arrive, share your Travel Key profile link with the park host. No paperwork. No repeating your information. Faster entry every time.',
  },
];

function getStatusClasses(status: string) {
  if (status === 'available') {
    return {
      border: 'border-emerald-400/40',
      bg: 'bg-emerald-500/10',
      badge: 'bg-emerald-500 text-white',
      text: 'text-emerald-300',
      label: 'Available',
    };
  }
  if (status === 'limited') {
    return {
      border: 'border-amber-400/40',
      bg: 'bg-amber-500/10',
      badge: 'bg-amber-500 text-white',
      text: 'text-amber-300',
      label: 'Limited',
    };
  }
  return {
    border: 'border-red-400/40',
    bg: 'bg-red-500/10',
    badge: 'bg-red-600 text-white',
    text: 'text-red-300',
    label: 'No Vacancy',
  };
}

export default function NationalTravelKeyHomePage() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <main className="min-h-screen bg-[#08152b] text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-[#c9a227]/20 bg-[#08152b]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#c9a227] flex items-center justify-center">
              <span className="text-[#08152b] font-black text-sm">NTK</span>
            </div>
            <span className="text-white font-black text-lg tracking-tight">National Travel Key</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#county-grid" className="text-gray-400 hover:text-white text-sm font-medium transition">Search Parks</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white text-sm font-medium transition">How It Works</a>
            <a href="#available-now" className="text-gray-400 hover:text-white text-sm font-medium transition">Available Now</a>
            {!loading && user && (
              <a href="/profile" className="text-[#c9a227] hover:text-[#d8b13a] text-sm font-bold transition">My Profile</a>
            )}
          </div>
          {!loading && (
            user ? (
              <div className="flex items-center gap-4">
                <a
                  href="/profile"
                  className="hidden sm:inline-flex rounded-xl bg-[#c9a227] px-5 py-2.5 text-[#08152b] font-black text-sm hover:bg-[#d8b13a] transition"
                >
                  My Profile
                </a>
                <button
                  onClick={handleSignOut}
                  className="rounded-xl border border-white/20 px-4 py-2.5 text-white text-sm font-bold hover:border-white/40 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <a
                href="/signin"
                className="rounded-xl bg-[#c9a227] px-5 py-2.5 text-[#08152b] font-black text-sm hover:bg-[#d8b13a] transition"
              >
                Sign In
              </a>
            )
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#c9a227]/20 bg-gradient-to-br from-[#08152b] via-[#0d1f3c] to-[#10294d]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #c9a227 0%, transparent 35%), radial-gradient(circle at 80% 10%, #c9a227 0%, transparent 25%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/10 px-4 py-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#c9a227] animate-pulse" />
                <span className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em]">Florida Prototype</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                One Travel Profile.<br />
                Faster Check-In.<br />
                <span className="text-[#c9a227]">Smarter Florida Park Search.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8">
                National Travel Key lets travelers store their information once, search participating parks by county,
                see live availability, and share their profile instantly at check-in.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#county-grid"
                  className="inline-flex items-center justify-center rounded-xl bg-[#c9a227] px-8 py-4 text-[#08152b] font-black text-base hover:bg-[#d8b13a] transition"
                >
                  Search Florida Parks
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-8 py-4 text-white font-semibold hover:border-white/40 transition"
                >
                  See How It Works
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: '67', label: 'Parks Reporting' },
                  { value: '412', label: 'Units Available' },
                  { value: '21', label: 'Counties Open' },
                  { value: '9', label: 'Fully Booked' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[#c9a227] text-2xl font-black">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO CARD */}
            <div>
              <div className="rounded-[28px] border border-[#c9a227]/25 bg-[#0d1f3c]/80 p-6 shadow-2xl">
                <div className="rounded-[24px] border border-white/10 bg-[#08152b] p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-2">Live Inventory Pulse</p>
                      <h2 className="text-xl font-black text-white">Florida availability snapshot</h2>
                    </div>
                    <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">9 NO VACANCY</span>
                  </div>
                  <div className="space-y-3">
  {[
    { name: 'Trimble Park', county: 'Orange County', detail: 'Lakefront campground', status: 'Featured' },
    { name: 'Kelly Park', county: 'Orange County', detail: 'Spring and day-use destination', status: 'Featured' },
    { name: 'Live inventory expanding', county: 'NTK Database', detail: 'More parks can be seeded next', status: 'Connected' },
    { name: 'Firestore is active', county: 'NTK Platform', detail: 'Homepage cards now support live data', status: 'Ready' },
  ].map((park) => (
    <div key={park.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-white font-bold text-sm">{park.name}</p>
          <p className="text-gray-400 text-xs mt-1">{park.county}</p>
          <p className="text-[#c9a227] text-xs mt-1">{park.detail}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-white font-black text-sm">{park.status}</p>
        </div>
      </div>
    </div>
  ))}
</div>
                  <div className="mt-5 rounded-2xl border border-[#c9a227]/20 bg-[#c9a227]/10 p-4">
                    <p className="text-[#c9a227] text-xs font-bold uppercase tracking-wide mb-1">National Travel Key</p>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Search by county. See what is left. Know immediately when a park is full.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* STATS BAR */}
      <section className="border-b border-[#c9a227]/15 bg-[#0d1f3c]">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: '67', label: 'Participating Parks' },
            { value: '412', label: 'Available Units Right Now' },
            { value: '21', label: 'Counties With Openings' },
            { value: '9', label: 'Parks Showing No Vacancy' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[#c9a227] text-3xl font-black">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COUNTY GRID */}
      <section id="county-grid" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-3">Browse by County</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Florida county inventory tiles</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Each tile shows participating parks, total available units, and whether the county still has openings or is fully booked.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {countyTiles.map((county) => {
              const status = getStatusClasses(county.status);
              return (
                <a
                  key={county.name}
                  href={`/counties/${county.slug}`}
                  className={`rounded-3xl border \${status.border} \${status.bg} p-6 hover:-translate-y-1 transition block`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold \${status.badge}`}>{status.label}</span>
                    <span className={`text-xs font-semibold \${status.text}`}>
                      {county.status === 'full' ? 'FULL NOW' : `\${county.openParks} OPEN`}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{county.name}</h3>
                  <p className="text-gray-400 text-sm mb-5">{county.parks} participating parks</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[#c9a227] text-2xl font-black">{county.units}</p>
                      <p className="text-xs text-gray-400 mt-1">Units Left</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[#c9a227] text-2xl font-black">{county.openParks}</p>
                      <p className="text-xs text-gray-400 mt-1">Parks Open</p>
                    </div>
                  </div>
                  <div className="mt-5 text-sm font-semibold text-white">
                    {county.status === 'full' ? 'View full county â†’' : 'See parks with availability â†’'}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* AVAILABLE NOW */}
      <section id="available-now" className="py-20 px-6 bg-[#0d1f3c]/60">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-3">Available Now</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Parks with something left</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Only parks with remaining inventory appear here. Once a park is fully booked it drops off this list immediately.
            </p>
          </div>
          <FeaturedParksGrid />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-3">How It Works</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">One profile. Every park.</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Set up your Travel Key once. Use it at every participating park in the network â€” no paperwork, no repeated forms.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="rounded-3xl border border-white/10 bg-[#0d1f3c] p-6">
                <p className="text-[#c9a227] text-4xl font-black mb-4">{step.number}</p>
                <h3 className="text-white font-black text-lg mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0d1f3c] to-[#08152b] border-t border-[#c9a227]/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-4">Florida Prototype</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Ready to search Florida parks?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Browse by county, find available units, and share your Travel Key profile at check-in. No paperwork. No repeated forms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#county-grid"
              className="inline-flex items-center justify-center rounded-xl bg-[#c9a227] px-10 py-4 text-[#08152b] font-black text-base hover:bg-[#d8b13a] transition"
            >
              Search Florida Parks
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-10 py-4 text-white font-semibold hover:border-white/40 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#08152b] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-[#c9a227] flex items-center justify-center">
              <span className="text-[#08152b] font-black text-xs">NTK</span>
            </div>
            <span className="text-white font-black tracking-tight">National Travel Key</span>
          </div>
          <p className="text-gray-500 text-sm">&copy; 2026 National Travel Key. Florida Prototype.</p>
          <div className="flex items-center gap-6">
            <a href="#county-grid" className="text-gray-500 hover:text-white text-sm transition">Search Parks</a>
            <a href="#how-it-works" className="text-gray-500 hover:text-white text-sm transition">How It Works</a>
            {!loading && user && (
              <a href="/profile" className="text-gray-500 hover:text-white text-sm transition">My Profile</a>
            )}
          </div>
        </div>
      </footer>

    </main>
  );
}
