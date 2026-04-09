// ============================================
// NTK Settings Helpers
// Path: src/lib/firebase/settings.ts
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import { NtkSetting } from "../../types/settings";

const DEFAULT_SETTING_ID = "global";

export async function getSettings(): Promise<NtkSetting | null> {
  const snap = await getDoc(doc(db, "ntk_settings", DEFAULT_SETTING_ID));
  return snap.exists() ? (snap.data() as NtkSetting) : null;
}

export async function createSettings(
  data: Omit<NtkSetting, "createdAt" | "updatedAt">
): Promise<void> {
  await setDoc(doc(db, "ntk_settings", DEFAULT_SETTING_ID), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateSettings(
  data: Partial<NtkSetting>,
  updatedBy: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_settings", DEFAULT_SETTING_ID), {
    ...data,
    updatedBy,
    updatedAt: serverTimestamp(),
  });
}

export async function updatePinSettings(
  pinSettings: NtkSetting["pinSettings"],
  updatedBy: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_settings", DEFAULT_SETTING_ID), {
    pinSettings,
    updatedBy,
    updatedAt: serverTimestamp(),
  });
}

export async function updateMembershipPricing(
  membershipPricing: NtkSetting["membershipPricing"],
  updatedBy: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_settings", DEFAULT_SETTING_ID), {
    membershipPricing,
    updatedBy,
    updatedAt: serverTimestamp(),
  });
}

export async function updateSupplierPricing(
  supplierPricing: NtkSetting["supplierPricing"],
  updatedBy: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_settings", DEFAULT_SETTING_ID), {
    supplierPricing,
    updatedBy,
    updatedAt: serverTimestamp(),
  });
}

export async function updateNotificationSettings(
  notificationSettings: NtkSetting["notificationSettings"],
  updatedBy: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_settings", DEFAULT_SETTING_ID), {
    notificationSettings,
    updatedBy,
    updatedAt: serverTimestamp(),
  });
}

export async function toggleMaintenanceMode(
  enabled: boolean,
  message: string | null,
  updatedBy: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_settings", DEFAULT_SETTING_ID), {
    maintenanceMode: enabled,
    maintenanceMessage: message,
    updatedBy,
    updatedAt: serverTimestamp(),
  });
}
