// ============================================
// NTK Supplier Helpers
// Path: src/lib/firebase/suppliers.ts
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
} from "firebase/firestore";
import { db } from "./config";
import {
  NtkSupplier,
  NtkSupplierRequirements,
  NtkSupplierTemplate,
} from "../../types/supplier";

// --- Suppliers ---

export async function getSupplier(
  supplierId: string
): Promise<NtkSupplier | null> {
  const snap = await getDoc(doc(db, "ntk_suppliers", supplierId));
  return snap.exists() ? (snap.data() as NtkSupplier) : null;
}

export async function createSupplier(
  supplierId: string,
  data: Omit<NtkSupplier, "createdAt" | "updatedAt">
): Promise<void> {
  await setDoc(doc(db, "ntk_suppliers", supplierId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateSupplier(
  supplierId: string,
  data: Partial<NtkSupplier>
): Promise<void> {
  await updateDoc(doc(db, "ntk_suppliers", supplierId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function getSuppliersByCounty(
  county: string
): Promise<NtkSupplier[]> {
  const q = query(
    collection(db, "ntk_suppliers"),
    where("county", "==", county)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkSupplier);
}

export async function getSuppliersByStatus(
  status: NtkSupplier["onboardingStatus"]
): Promise<NtkSupplier[]> {
  const q = query(
    collection(db, "ntk_suppliers"),
    where("onboardingStatus", "==", status)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkSupplier);
}

export async function getSuppliersByType(
  businessType: NtkSupplier["businessType"]
): Promise<NtkSupplier[]> {
  const q = query(
    collection(db, "ntk_suppliers"),
    where("businessType", "==", businessType)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkSupplier);
}

// --- Supplier Requirements ---

export async function getSupplierRequirements(
  supplierId: string
): Promise<NtkSupplierRequirements | null> {
  const snap = await getDoc(doc(db, "ntk_supplier_requirements", supplierId));
  return snap.exists() ? (snap.data() as NtkSupplierRequirements) : null;
}

export async function createSupplierRequirements(
  supplierId: string,
  data: Omit<NtkSupplierRequirements, "createdAt" | "updatedAt">
): Promise<void> {
  await setDoc(doc(db, "ntk_supplier_requirements", supplierId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateSupplierRequirements(
  supplierId: string,
  data: Partial<NtkSupplierRequirements>
): Promise<void> {
  await updateDoc(doc(db, "ntk_supplier_requirements", supplierId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// --- Supplier Templates ---

export async function getSupplierTemplate(
  templateId: string
): Promise<NtkSupplierTemplate | null> {
  const snap = await getDoc(doc(db, "ntk_supplier_templates", templateId));
  return snap.exists() ? (snap.data() as NtkSupplierTemplate) : null;
}

export async function createSupplierTemplate(
  data: Omit<NtkSupplierTemplate, "createdAt" | "updatedAt">
): Promise<string> {
  const templateId = doc(collection(db, "ntk_supplier_templates")).id;
  await setDoc(doc(db, "ntk_supplier_templates", templateId), {
    ...data,
    templateId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return templateId;
}

export async function updateSupplierTemplate(
  templateId: string,
  data: Partial<NtkSupplierTemplate>
): Promise<void> {
  await updateDoc(doc(db, "ntk_supplier_templates", templateId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function getTemplatesBySupplier(
  supplierId: string
): Promise<NtkSupplierTemplate[]> {
  const q = query(
    collection(db, "ntk_supplier_templates"),
    where("supplierId", "==", supplierId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkSupplierTemplate);
}
