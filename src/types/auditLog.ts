// ============================================
// NTK Audit Log Types
// Collection: ntk_audit_log/{logId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";
import { AuditEventType } from "./enums";

export interface NtkAuditLog {
  logId: string;
  eventType: AuditEventType;
  userId: string | null;
  supplierId: string | null;
  details: string;
  ipAddress: string | null;
  timestamp: Timestamp;
}

