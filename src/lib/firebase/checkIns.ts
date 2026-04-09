// ============================================
// NTK Check-In Helpers
// Path: src/lib/firebase/checkIns.ts
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
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { NtkCheckIn } from "../../types/checkIn";
import {
  ScanMethod,
  PinDeliveryMethod,
  CheckInStatus,
} from "../../types/enums";

function generatePin(length: number = 6): string {
  const digits = "0123456789";
  let pin = "";
  for (let i = 0; i < length; i++) {
    pin += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return pin;
}

export async function createCheckIn(
  userId: string,
  supplierId: string,
  cardNumber: string,
  scanMethod: ScanMethod,
  pinSentVia: PinDeliveryMethod,
  propertyName: string,
  pinExpirationMinutes: number = 10
): Promise<{ checkInId: string; pinCode: string }> {
  const checkInId = doc(collection(db, "ntk_check_ins")).id;
  const pinCode = generatePin();
  const now = Timestamp.now();
  const pinExpiresAt = Timestamp.fromMillis(
    now.toMillis() + pinExpirationMinutes * 60 * 1000
  );

  await setDoc(doc(db, "ntk_check_ins", checkInId), {
    checkInId,
    userId,
    supplierId,
    cardNumber,
    scanMethod,
    pinCode,
    pinSentVia,
    pinExpiresAt,
    pinVerified: false,
    checkInStatus: CheckInStatus.PENDING_PIN,
    checkInTimestamp: serverTimestamp(),
    propertyName,
    notificationSentToMember: false,
    createdAt: serverTimestamp(),
  });

  return { checkInId, pinCode };
}

export async function verifyPin(
  checkInId: string,
  enteredPin: string
): Promise<boolean> {
  const snap = await getDoc(doc(db, "ntk_check_ins", checkInId));
  if (!snap.exists()) return false;

  const checkIn = snap.data() as NtkCheckIn;

  if (checkIn.checkInStatus !== CheckInStatus.PENDING_PIN) return false;

  const now = Timestamp.now();
  if (now.toMillis() > checkIn.pinExpiresAt.toMillis()) {
    await updateDoc(doc(db, "ntk_check_ins", checkInId), {
      checkInStatus: CheckInStatus.EXPIRED,
    });
    return false;
  }

  if (checkIn.pinCode !== enteredPin) {
    await updateDoc(doc(db, "ntk_check_ins", checkInId), {
      checkInStatus: CheckInStatus.FAILED,
    });
    return false;
  }

  await updateDoc(doc(db, "ntk_check_ins", checkInId), {
    pinVerified: true,
    checkInStatus: CheckInStatus.VERIFIED,
    notificationSentToMember: true,
  });

  return true;
}

export async function getCheckIn(
  checkInId: string
): Promise<NtkCheckIn | null> {
  const snap = await getDoc(doc(db, "ntk_check_ins", checkInId));
  return snap.exists() ? (snap.data() as NtkCheckIn) : null;
}

export async function getCheckInsByUser(
  userId: string
): Promise<NtkCheckIn[]> {
  const q = query(
    collection(db, "ntk_check_ins"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkCheckIn);
}

export async function getCheckInsBySupplier(
  supplierId: string
): Promise<NtkCheckIn[]> {
  const q = query(
    collection(db, "ntk_check_ins"),
    where("supplierId", "==", supplierId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkCheckIn);
}
