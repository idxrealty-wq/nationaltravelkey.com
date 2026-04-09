// ============================================
// NTK Membership Helpers
// Path: src/lib/firebase/memberships.ts
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
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { NtkMembership, MembershipStatus } from "../../types/membership";
import { MembershipTier } from "../../types/enums";

export async function getMembership(
  membershipId: string
): Promise<NtkMembership | null> {
  const snap = await getDoc(doc(db, "ntk_memberships", membershipId));
  return snap.exists() ? (snap.data() as NtkMembership) : null;
}

export async function getMembershipByUser(
  userId: string
): Promise<NtkMembership | null> {
  const q = query(
    collection(db, "ntk_memberships"),
    where("userId", "==", userId),
    where("status", "==", MembershipStatus.ACTIVE)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as NtkMembership;
}

export async function createMembership(
  userId: string,
  data: Omit<NtkMembership, "membershipId" | "createdAt" | "updatedAt">
): Promise<string> {
  const membershipId = doc(collection(db, "ntk_memberships")).id;
  await setDoc(doc(db, "ntk_memberships", membershipId), {
    ...data,
    membershipId,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return membershipId;
}

export async function renewMembership(
  membershipId: string,
  newExpirationDate: Timestamp
): Promise<void> {
  await updateDoc(doc(db, "ntk_memberships", membershipId), {
    status: MembershipStatus.ACTIVE,
    expirationDate: newExpirationDate,
    autoRenew: true,
    cancelledAt: null,
    cancellationReason: null,
    updatedAt: serverTimestamp(),
  });
}

export async function cancelMembership(
  membershipId: string,
  reason: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_memberships", membershipId), {
    status: MembershipStatus.CANCELLED,
    autoRenew: false,
    cancelledAt: serverTimestamp(),
    cancellationReason: reason,
    updatedAt: serverTimestamp(),
  });
}

export async function suspendMembership(
  membershipId: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_memberships", membershipId), {
    status: MembershipStatus.SUSPENDED,
    autoRenew: false,
    updatedAt: serverTimestamp(),
  });
}

export async function expireMembership(
  membershipId: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_memberships", membershipId), {
    status: MembershipStatus.EXPIRED,
    autoRenew: false,
    updatedAt: serverTimestamp(),
  });
}

export async function upgradeMembership(
  membershipId: string,
  newTier: MembershipTier,
  newPrice: number,
  newBenefits: NtkMembership["benefits"]
): Promise<void> {
  await updateDoc(doc(db, "ntk_memberships", membershipId), {
    tier: newTier,
    price: newPrice,
    benefits: newBenefits,
    updatedAt: serverTimestamp(),
  });
}

export async function getMembershipsByTier(
  tier: MembershipTier
): Promise<NtkMembership[]> {
  const q = query(
    collection(db, "ntk_memberships"),
    where("tier", "==", tier),
    where("status", "==", MembershipStatus.ACTIVE)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkMembership);
}
