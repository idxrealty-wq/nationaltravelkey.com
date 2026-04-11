import { readFileSync } from 'fs';
import { join } from 'path';
import { geohashForLocation } from 'geofire-common';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import type { NtkPark } from '../types/park';

type SeedParkInput = Omit<NtkPark, 'slug' | 'createdAt' | 'updatedAt'>;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run(): Promise<void> {
  const filePath = join(process.cwd(), 'src', 'data', 'parks.seed.json');
  const raw = readFileSync(filePath, 'utf-8');
  const parks = JSON.parse(raw) as SeedParkInput[];

  for (const park of parks) {
    const now = new Date().toISOString();
    const geohash = geohashForLocation([
      park.coordinates.latitude,
      park.coordinates.longitude,
    ]);

    const finalPark: NtkPark = {
      ...park,
      slug: slugify(park.name),
      coordinates: {
        ...park.coordinates,
        geohash,
      },
      createdAt: now,
      updatedAt: now,
    };

    const parkRef = doc(db, 'ntk_parks', finalPark.id);
    await setDoc(parkRef, finalPark);

    console.log(`Seeded park: ${finalPark.name}`);
  }

  console.log('Park seed complete.');
}

run().catch((error) => {
  console.error('Park seed failed:', error);
  process.exit(1);
});
