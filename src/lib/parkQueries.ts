import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
  type Firestore,
} from 'firebase/firestore';
import type { NtkPark } from '@/types/park';

const COLLECTION_NAME = 'ntk_parks';

export async function createPark(db: Firestore, park: NtkPark): Promise<void> {
  const parkRef = doc(db, COLLECTION_NAME, park.id);
  await setDoc(parkRef, park);
}

export async function updatePark(
  db: Firestore,
  parkId: string,
  updates: Partial<NtkPark>
): Promise<void> {
  const parkRef = doc(db, COLLECTION_NAME, parkId);
  await updateDoc(parkRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function getParkById(
  db: Firestore,
  parkId: string
): Promise<NtkPark | null> {
  const parkRef = doc(db, COLLECTION_NAME, parkId);
  const snapshot = await getDoc(parkRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as NtkPark;
}

export async function getFeaturedParks(
  db: Firestore,
  maxResults = 12
): Promise<NtkPark[]> {
  const parksRef = collection(db, COLLECTION_NAME);
  const parksQuery = query(
    parksRef,
    where('isActive', '==', true),
    where('isFeatured', '==', true),
    limit(maxResults)
  );

  const snapshot = await getDocs(parksQuery);
  return snapshot.docs.map((docItem) => docItem.data() as NtkPark);
}

export async function getBookableParks(
  db: Firestore,
  maxResults = 24
): Promise<NtkPark[]> {
  const parksRef = collection(db, COLLECTION_NAME);
  const parksQuery = query(
    parksRef,
    where('isActive', '==', true),
    where('isBookableThroughNtk', '==', true),
    limit(maxResults)
  );

  const snapshot = await getDocs(parksQuery);
  return snapshot.docs.map((docItem) => docItem.data() as NtkPark);
}

export async function getParksByCounty(
  db: Firestore,
  county: string,
  maxResults = 50
): Promise<NtkPark[]> {
  const parksRef = collection(db, COLLECTION_NAME);
  const parksQuery = query(
    parksRef,
    where('isActive', '==', true),
    where('address.county', '==', county),
    limit(maxResults)
  );

  const snapshot = await getDocs(parksQuery);
  return snapshot.docs.map((docItem) => docItem.data() as NtkPark);
}
