const countyTiles = [
  { name: 'Lake County', slug: 'lake', parks: 12, units: 28, openParks: 4, status: 'available' },
  { name: 'Orange County', slug: 'orange', parks: 8, units: 11, openParks: 3, status: 'limited' },
  { name: 'Marion County', slug: 'marion', parks: 10, units: 19, openParks: 5, status: 'available' },
  { name: 'Monroe County', slug: 'monroe', parks: 7, units: 0, openParks: 0, status: 'full' },
  { name: 'Volusia County', slug: 'volusia', parks: 9, units: 14, openParks: 2, status: 'limited' },
  { name: 'Brevard County', slug: 'brevard', parks: 6, units: 9, openParks: 2, status: 'limited' },
  { name: 'Seminole County', slug: 'seminole', parks: 4, units: 6, openParks: 1, status: 'limited' },
  { name: 'Osceola County', slug: 'osceola', parks: 5, units: 13, openParks: 3, status: 'available' },
] as const;

function getStatusClasses(status: string) {
  if (status === 'available') {
    return { border: 'border-emerald-400/40', bg: 'bg-emerald-500/10', badge: 'bg-emerald-500 text-white', text: 'text-emerald-300', label: 'Available' };
  }
  if (status === 'limited') {
    return { border: 'border-amber-400/40', bg: 'bg-amber-500/10', badge: 'bg-amber-500 text-white', text: 'text-amber-300', label: 'Limited' };
  }
  return { border: 'border-red-400/40', bg: 'bg-red-500/10', badge: 'bg-red-600 text-white', text: 'text-red-300', label: 'No Vacancy' };
}

export default function CountyGrid() {
  return (
    <section id="county-grid" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Browse by County</p>
          <h2 className="mb-4 text-3xl font-black text-white md:text-5xl">Find parks without the county-site scavenger hunt</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">Each county tile shows participating parks, total available units, and whether that county still has openings right now.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {countyTiles.map((county) => {
            const s = getStatusClasses(county.status);
            return (
              <a key={county.name} href={'/counties/' + county.slug} className={'block rounded-3xl border p-6 transition hover:-translate-y-1 ' + s.border + ' ' + s.bg}>
                <div className="mb-5 flex items-center justify-between">
                  <span className={'rounded-full px-3 py-1 text-xs font-bold ' + s.badge}>{s.label}</span>
                  <span className={'text-xs font-semibold ' + s.text}>{county.status === 'full' ? 'FULL NOW' : county.openParks + ' OPEN'}</span>
                </div>
                <h3 className="mb-2 text-2xl font-black text-white">{county.name}</h3>
                <p className="mb-5 text-sm text-gray-400">{county.parks} participating parks</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-2xl font-black text-[#c9a227]">{county.units}</p>
                    <p className="mt-1 text-xs text-gray-400">Units Left</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-2xl font-black text-[#c9a227]">{county.openParks}</p>
                    <p className="mt-1 text-xs text-gray-400">Parks Open</p>
                  </div>
                </div>
                <div className="mt-5 text-sm font-semibold text-white">{county.status === 'full' ? 'View full county' : 'See parks with availability'}</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
