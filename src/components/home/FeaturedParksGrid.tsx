'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/config';
import { getFeaturedParks } from '@/lib/parkQueries';
import type { NtkPark } from '@/types/park';

export default function FeaturedParksGrid() {
  const [parks, setParks] = useState<NtkPark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadParks() {
      try {
        const results = await getFeaturedParks(db, 6);

        if (isMounted) {
          setParks(results);
        }
      } catch (error) {
        console.error('Failed to load featured parks:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadParks();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white/10 bg-[#08152b] p-6 animate-pulse"
          >
            <div className="h-6 w-2/3 rounded bg-white/10 mb-4" />
            <div className="h-4 w-1/3 rounded bg-white/10 mb-6" />
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              <div className="rounded-2xl bg-white/5 p-4 h-20" />
              <div className="rounded-2xl bg-white/5 p-4 h-20" />
              <div className="rounded-2xl bg-white/5 p-4 h-20" />
            </div>
            <div className="h-11 w-40 rounded-xl bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (!parks.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#08152b] p-8 text-center">
        <p className="text-white text-xl font-black mb-3">Featured parks are loading soon</p>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          The NTK park inventory is now connected. Add more seeded parks to expand this live section.
        </p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {parks.map((park) => (
        <div key={park.id} className="rounded-3xl border border-white/10 bg-[#08152b] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <h3 className="text-2xl font-black text-white">{park.name}</h3>
              <p className="text-gray-400 text-sm mt-1">
                {park.address.county} County
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[#c9a227] text-sm font-black uppercase tracking-wide">
                {park.parkType.replaceAll('_', ' ')}
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
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Management</p>
              <p className="text-white text-sm font-semibold">
                {park.managedBy.replaceAll('_', ' ')}
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Pets</p>
              <p className="text-white text-sm font-semibold">
                {park.policySummary.pets.replaceAll('_', ' ')}
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Booking</p>
              <p className="text-white text-sm font-semibold">
                {park.reservationSystem.replaceAll('_', ' ')}
              </p>
            </div>
          </div>

          <a
            href={`/parks/${park.slug}`}
            className="inline-flex items-center justify-center rounded-xl bg-[#c9a227] px-5 py-3 text-[#08152b] font-black text-sm hover:bg-[#d8b13a] transition"
          >
            View Park Details
          </a>
        </div>
      ))}
    </div>
  );
}
