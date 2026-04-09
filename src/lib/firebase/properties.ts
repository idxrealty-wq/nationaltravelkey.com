// ============================================
// NTK Property Helpers
// Path: src/lib/firebase/properties.ts
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
import { NtkProperty } from "../../types/property";
import { PropertyType, AvailabilityStatus } from "../../types/enums";

export async function getProperty(
  propertyId: string
): Promise<NtkProperty | null> {
  const snap = await getDoc(doc(db, "ntk_properties", propertyId));
  return snap.exists() ? (snap.data() as NtkProperty) : null;
}

export async function createProperty(
  data: Omit<NtkProperty, "propertyId" | "createdAt" | "updatedAt">
): Promise<string> {
  const propertyId = doc(collection(db, "ntk_properties")).id;
  await setDoc(doc(db, "ntk_properties", propertyId), {
    ...data,
    propertyId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return propertyId;
}

export async function updateProperty(
  propertyId: string,
  data: Partial<NtkProperty>
): Promise<void> {
  await updateDoc(doc(db, "ntk_properties", propertyId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function getPropertiesByCounty(
  county: string
): Promise<NtkProperty[]> {
  const q = query(
    collection(db, "ntk_properties"),
    where("county", "==", county),
    orderBy("rankingTier", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkProperty);
}

export async function getPropertiesByState(
  state: string
): Promise<NtkProperty[]> {
  const q = query(
    collection(db, "ntk_properties"),
    where("state", "==", state),
    orderBy("rankingTier", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkProperty);
}

export async function getPropertiesBySupplier(
  supplierId: string
): Promise<NtkProperty[]> {
  const q = query(
    collection(db, "ntk_properties"),
    where("supplierId", "==", supplierId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkProperty);
}

export async function getPropertiesByType(
  propertyType: PropertyType
): Promise<NtkProperty[]> {
  const q = query(
    collection(db, "ntk_properties"),
    where("propertyType", "==", propertyType),
    orderBy("rankingTier", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkProperty);
}

export async function getPropertiesByAvailability(
  status: AvailabilityStatus
): Promise<NtkProperty[]> {
  const q = query(
    collection(db, "ntk_properties"),
    where("availabilityStatus", "==", status),
    orderBy("rankingTier", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkProperty);
}

export async function getFeaturedProperties(
  maxResults: number = 20
): Promise<NtkProperty[]> {
  const q = query(
    collection(db, "ntk_properties"),
    where("featured", "==", true),
    orderBy("rankingTier", "asc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkProperty);
}

export async function searchProperties(
  county: string,
  propertyType: PropertyType,
  petFriendly: boolean | null = null
): Promise<NtkProperty[]> {
  let q = query(
    collection(db, "ntk_properties"),
    where("county", "==", county),
    where("propertyType", "==", propertyType)
  );

  const snap = await getDocs(q);
  let results = snap.docs.map((d) => d.data() as NtkProperty);

  if (petFriendly !== null) {
    results = results.filter((p) => p.petFriendly === petFriendly);
  }

  return results.sort((a, b) => a.rankingTier - b.rankingTier);
}
