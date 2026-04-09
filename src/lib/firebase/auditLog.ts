// ============================================
// NTK Audit Log Helpers
// Path: src/lib/firebase/auditLog.ts
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import {
  doc,
  collection,
  setDoc,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import { NtkAuditLog } from "../../types/auditLog";
import { AuditEventType } from "../../types/enums";

export async function logEvent(
  eventType: AuditEventType,
  details: string,
  userId: string | null = null,
  supplierId: string | null = null,
  ipAddress: string | null = null
): Promise<string> {
  const logId = doc(collection(db, "ntk_audit_log")).id;

  await setDoc(doc(db, "ntk_audit_log", logId), {
    logId,
    eventType,
    userId,
    supplierId,
    details,
    ipAddress,
    timestamp: serverTimestamp(),
  });

  return logId;
}

export async function getAuditTrailByUser(
  userId: string,
  maxResults: number = 50
): Promise<NtkAuditLog[]> {
  const q = query(
    collection(db, "ntk_audit_log"),
    where("userId", "==", userId),
    orderBy("timestamp", "desc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkAuditLog);
}

export async function getAuditTrailBySupplier(
  supplierId: string,
  maxResults: number = 50
): Promise<NtkAuditLog[]> {
  const q = query(
    collection(db, "ntk_audit_log"),
    where("supplierId", "==", supplierId),
    orderBy("timestamp", "desc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkAuditLog);
}

export async function getAuditTrailByType(
  eventType: AuditEventType,
  maxResults: number = 50
): Promise<NtkAuditLog[]> {
  const q = query(
    collection(db, "ntk_audit_log"),
    where("eventType", "==", eventType),
    orderBy("timestamp", "desc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkAuditLog);
}

export async function getRecentAuditTrail(
  maxResults: number = 100
): Promise<NtkAuditLog[]> {
  const q = query(
    collection(db, "ntk_audit_log"),
    orderBy("timestamp", "desc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkAuditLog);
}
