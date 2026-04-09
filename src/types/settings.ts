// ============================================
// NTK Settings Types
// Collection: ntk_settings/{settingId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";

export interface PinSettings {
  pinLength: number;
  pinExpirationMinutes: number;
  maxPinAttempts: number;
  lockoutDurationMinutes: number;
}

export interface MembershipPricing {
  standardMonthly: number;
  standardAnnual: number;
  premiumMonthly: number;
  premiumAnnual: number;
  founderLifetime: number;
}

export interface SupplierPricing {
  basicSetupFee: number;
  standardSetupFee: number;
  premiumSetupFee: number;
  basicMonthly: number | null;
  standardMonthly: number | null;
  premiumMonthly: number | null;
  flatTransactionFee: number;
  percentageTransactionFee: number;
}

export interface NotificationSettings {
  sendCheckInConfirmation: boolean;
  sendPinViaSms: boolean;
  sendPinViaEmail: boolean;
  sendMembershipReminders: boolean;
  reminderDaysBeforeExpiration: number;
  adminAlertOnFailedCheckIn: boolean;
  adminAlertOnCardBlock: boolean;
}

export interface NtkSetting {
  settingId: string;
  settingName: string;
  pinSettings: PinSettings;
  membershipPricing: MembershipPricing;
  supplierPricing: SupplierPricing;
  notificationSettings: NotificationSettings;
  maintenanceMode: boolean;
  maintenanceMessage: string | null;
  currentVersion: string;
  updatedBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
