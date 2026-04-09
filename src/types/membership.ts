// ============================================
// NTK Membership Types
// Collection: ntk_memberships/{membershipId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";
import { MembershipTier } from "./enums";

export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
  SUSPENDED = "SUSPENDED",
}

export enum BillingCycle {
  MONTHLY = "MONTHLY",
  ANNUAL = "ANNUAL",
  LIFETIME = "LIFETIME",
}

export interface MembershipBenefits {
  discountPercent: number;
  priorityCheckIn: boolean;
  freeCardUpgrade: boolean;
  exclusiveDeals: boolean;
  guestPasses: number;
}

export interface NtkMembership {
  membershipId: string;
  userId: string;
  tier: MembershipTier;
  status: MembershipStatus;
  billingCycle: BillingCycle;
  price: number;
  startDate: Timestamp;
  expirationDate: Timestamp;
  autoRenew: boolean;
  cancelledAt: Timestamp | null;
  cancellationReason: string | null;
  benefits: MembershipBenefits;
  referralCode: string | null;
  referredBy: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
