// ============================================
// NTK Profile & Verification Helpers
// Path: src/lib/firebase/profiles.ts
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { NtkProfile, NtkVerification } from "../../types/profile";

// --- Profiles ---

export async function getProfile(userId: string): Promise<NtkProfile | null> {
  const snap = await getDoc(doc(db, "ntk_profiles", userId));
  return snap.exists() ? (snap.data() as NtkProfile) : null;
}

export async function createProfile(
  userId: string,
  data: Omit<NtkProfile, "createdAt" | "updatedAt">
): Promise<void> {
  await setDoc(doc(db, "ntk_profiles", userId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProfile(
  userId: string,
  data: Partial<NtkProfile>
): Promise<void> {
  await updateDoc(doc(db, "ntk_profiles", userId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function getProfileCompletionPercent(
  userId: string
): Promise<number> {
  const profile = await getProfile(userId);
  if (!profile) return 0;
  return profile.profileCompletionPercent;
}

// --- Verifications ---

export async function getVerification(
  userId: string
): Promise<NtkVerification | null> {
  const snap = await getDoc(doc(db, "ntk_verifications", userId));
  return snap.exists() ? (snap.data() as NtkVerification) : null;
}

export async function createVerification(
  userId: string,
  data: Omit<NtkVerification, "createdAt" | "updatedAt">
): Promise<void> {
  await setDoc(doc(db, "ntk_verifications", userId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateVerification(
  userId: string,
  data: Partial<NtkVerification>
): Promise<void> {
  await updateDoc(doc(db, "ntk_verifications", userId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function submitVerification(
  userId: string,
  method: NtkVerification["verificationMethod"],
  idIssuingState: string,
  idExpiration: Timestamp,
  idLastFour: string,
  documentReferences: string[]
): Promise<void> {
  await setDoc(doc(db, "ntk_verifications", userId), {
    userId,
    legalNameMatch: false,
    residencyState: idIssuingState,
    verificationStatus: "PENDING",
    verificationMethod: method,
    idIssuingState,
    idExpiration,
    idLastFour,
    documentReferences,
    reviewerNotes: null,
    reviewTimestamp: null,
    reviewerDecision: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
