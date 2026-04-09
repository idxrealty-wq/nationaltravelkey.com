// ============================================
// NTK Check-In Types
// Collection: ntk_check_ins/{checkInId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";
import { ScanMethod, PinDeliveryMethod, CheckInStatus } from "./enums";

export interface NtkCheckIn {
  checkInId: string;
  userId: string;
  supplierId: string;
  cardNumber: string;
  scanMethod: ScanMethod;
  pinCode: string;
  pinSentVia: PinDeliveryMethod;
  pinExpiresAt: Timestamp;
  pinVerified: boolean;
  checkInStatus: CheckInStatus;
  checkInTimestamp: Timestamp;
  propertyName: string;
  notificationSentToMember: boolean;
  createdAt: Timestamp;
}
