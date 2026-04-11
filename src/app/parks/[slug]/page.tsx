import Link from 'next/link';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase/config';
import type { NtkPark } from '@/types/park';

type ParkPageProps = {
  params: {
    slug: string;
  };
};

async function getParkBySlug(slug: string): Promise<NtkPark | null> {
  const parksRef = collection(db, 'ntk_parks');
  const parksQuery = query(parksRef, where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(parksQuery);

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data() as NtkPark;
}

function formatEnumLabel(value: string): string {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getAmenityList(park: NtkPark): string[] {
  const amenities: string[] = [];

  if (park.amenityFlags.rvSites) amenities.push('RV Sites');
  if (park.amenityFlags.tentSites) amenities.push('Tent Sites');
  if (park.amenityFlags.cabins) amenities.push('Cabins');
  if (park.amenityFlags.boatRamp) amenities.push('Boat Ramp');
  if (park.amenityFlags.marina) amenities.push('Marina');
  if (park.amenityFlags.swimming) amenities.push('Swimming');
  if (park.amenityFlags.fishing) amenities.push('Fishing');
  if (park.amenityFlags.playground) amenities.push('Playground');
  if (park.amenityFlags.restrooms) amenities.push('Restrooms');
  if (park.amenityFlags.showers) amenities.push('Showers');
  if (park.amenityFlags.laundry) amenities.push('Laundry');
  if (park.amenityFlags.fullHookups) amenities.push('Full Hookups');
  if (park.amenityFlags.electricHookups) amenities.push('Electric Hookups');
  if (park.amenityFlags.waterHookups) amenities.push('Water Hookups');
  if (park.amenityFlags.sewerHookups) amenities.push('Sewer Hookups');
  if (park.amenityFlags.wifi) amenities.push('Wi-Fi');
  if (park.amenityFlags.dumpStation) amenities.push('Dump Station');
  if (park.amenityFlags.petArea) amenities.push('Pet Area');

  return amenities;
}

export default async function ParkDetailPage({ params }: ParkPageProps) {
  const park = await getParkBySlug(params.slug);

  if (!park) {
    notFound();
  }

  const amenities = getAmenityList(park);

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

          <div className="grid lg:grid-cols-[1.5fr_0.9fr] gap-8 items-start">
            <div>
              <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                {park.address.county} County
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                {park.name}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-6">
                {park.fullDescription || park.shortDescription}
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-[#c9a227] px-4 py-2 text-sm font-black text-[#08152b]">
                  {formatEnumLabel(park.parkType)}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                  {park.isBookableThroughNtk ? 'Bookable in NTK' : 'External Booking'}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                  {formatEnumLabel(park.reservationSystem)}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#08152b] p-6">
              <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Find, Register, Go
              </p>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Location</p>
                  <p className="text-white text-sm font-semibold">
                    {park.address.street1}, {park.address.city}, {park.address.state} {park.address.postalCode}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Managed By</p>
                  <p className="text-white text-sm font-semibold">
                    {formatEnumLabel(park.managedBy)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Booking Flow</p>
                  <p className="text-white text-sm font-semibold">
                    {formatEnumLabel(park.ntkRegistrationType)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Current Status</p>
                  <p className="text-emerald-300 text-sm font-semibold">
                    {park.isActive ? 'Active Listing' : 'Inactive Listing'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-[#0d1f3c] p-6">
              <h2 className="text-2xl font-black mb-4">Overview</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {park.shortDescription}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0d1f3c] p-6">
              <h2 className="text-2xl font-black mb-4">Amenities</h2>
              {amenities.length ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  Amenities will appear here as this park listing is expanded.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0d1f3c] p-6">
              <h2 className="text-2xl font-black mb-4">Policies</h2>
              <div className="grid sm:grid-cols-2 gap-4">
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
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Check-In</p>
                  <p className="text-white text-sm font-semibold">
                    {park.policySummary.checkInTime || 'To be added'}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Check-Out</p>
                  <p className="text-white text-sm font-semibold">
                    {park.policySummary.checkOutTime || 'To be added'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-[#c9a227]/20 bg-[#c9a227]/10 p-6">
              <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Registration Path
              </p>
              <h2 className="text-2xl font-black text-white mb-3">
                Complete the next step fast
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed mb-5">
                NTK is built to help travelers find the right place, move into the registration step, and get to arrival with less friction.
              </p>

              {park.contactInfo.bookingUrl ? (
                <a
                  href={park.contactInfo.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#c9a227] px-5 py-3 text-[#08152b] font-black text-sm hover:bg-[#d8b13a] transition"
                >
                  Continue to Booking
                </a>
              ) : (
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#c9a227] px-5 py-3 text-[#08152b] font-black text-sm opacity-80"
                >
                  Booking Link Coming Soon
                </button>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0d1f3c] p-6">
              <h2 className="text-2xl font-black mb-4">Contact</h2>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Phone</p>
                  <p className="text-white text-sm font-semibold">
                    {park.contactInfo.phone || 'To be added'}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Email</p>
                  <p className="text-white text-sm font-semibold">
                    {park.contactInfo.email || 'To be added'}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Website</p>
                  <p className="text-white text-sm font-semibold break-all">
                    {park.contactInfo.websiteUrl || 'To be added'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0d1f3c] p-6">
              <h2 className="text-2xl font-black mb-4">Coordinates</h2>
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-white">Latitude:</span> {park.coordinates.latitude}
                </p>
                <p>
                  <span className="font-semibold text-white">Longitude:</span> {park.coordinates.longitude}
                </p>
                <p className="break-all">
                  <span className="font-semibold text-white">Geohash:</span> {park.coordinates.geohash}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
