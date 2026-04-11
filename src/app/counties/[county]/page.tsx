import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase/config';
import { getActiveParksByCounty } from '@/lib/parkQueries';

type CountyPageProps = {
  params: {
    county: string;
  };
};

function slugToCountyName(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatEnumLabel(value: string): string {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default async function CountyPage({ params }: CountyPageProps) {
  const countyName = slugToCountyName(params.county);
  const parks = await getActiveParksByCounty(db, countyName);

  if (!parks.length) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#08152b] text-white">
      <section className="border-b border-[#c9a227]/20 bg-gradient-to-br from-[#08152b] via-[#0d1f3c] to-[#10294d]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-[#c9a227] hover:text-[#d8b13a] transition"
            >
              Back to homepage
            </Link>
          </div>

          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            County Inventory
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            {countyName} County Parks
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            Browse active NTK park listings in {countyName} County and move directly into the next step.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {parks.map((park) => (
              <div key={park.id} className="rounded-3xl border border-white/10 bg-[#0d1f3c] p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-2xl font-black text-white">{park.name}</h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {park.address.city}, {park.address.state}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-[#c9a227] text-xs font-bold uppercase tracking-wide">
                      {formatEnumLabel(park.parkType)}
                    </p>
                    <p className="text-gray-400 text-xs uppercase tracking-wide mt-1">
                      {park.isBookableThroughNtk ? 'Bookable in NTK' : 'External booking'}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {park.shortDescription}
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-5">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Pets</p>
                    <p className="text-white text-sm font-semibold">
                      {formatEnumLabel(park.policySummary.pets)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Alcohol</p>
                    <p className="text-white text-sm font-semibold">
                      {formatEnumLabel(park.policySummary.alcohol)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Booking</p>
                    <p className="text-white text-sm font-semibold">
                      {formatEnumLabel(park.reservationSystem)}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/parks/${park.slug}`}
                  className="inline-flex items-center justify-center rounded-xl bg-[#c9a227] px-5 py-3 text-[#08152b] font-black text-sm hover:bg-[#d8b13a] transition"
                >
                  View Park Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
