// ============================================
// NTK County Helpers
// Path: src/lib/firebase/counties.ts
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import { NtkCounty } from "../../types/county";

export async function getCounty(
  countyId: string
): Promise<NtkCounty | null> {
  const snap = await getDoc(doc(db, "ntk_counties", countyId));
  return snap.exists() ? (snap.data() as NtkCounty) : null;
}

export async function createCounty(
  countyId: string,
  data: Omit<NtkCounty, "createdAt" | "updatedAt">
): Promise<void> {
  await setDoc(doc(db, "ntk_counties", countyId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateCounty(
  countyId: string,
  data: Partial<NtkCounty>
): Promise<void> {
  await updateDoc(doc(db, "ntk_counties", countyId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function getAllCounties(): Promise<NtkCounty[]> {
  const q = query(
    collection(db, "ntk_counties"),
    orderBy("sortOrder", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkCounty);
}

export async function getCountiesByState(
  state: string
): Promise<NtkCounty[]> {
  const q = query(
    collection(db, "ntk_counties"),
    where("state", "==", state),
    orderBy("sortOrder", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkCounty);
}

export async function getFeaturedCounties(
  maxResults: number = 12
): Promise<NtkCounty[]> {
  const q = query(
    collection(db, "ntk_counties"),
    where("featured", "==", true),
    orderBy("sortOrder", "asc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkCounty);
}

export async function updateCountyStats(
  countyId: string,
  stats: NtkCounty["stats"]
): Promise<void> {
  await updateDoc(doc(db, "ntk_counties", countyId), {
    stats,
    updatedAt: serverTimestamp(),
  });
}
