// ============================================
// NTK Profile & Verification Types
// Collection: ntk_profiles/{userId}
// Collection: ntk_verifications/{userId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";
import {
  FacePhotoVisibility,
  ContactMethod,
  BedType,
  AccessibilityNeed,
  SmokingPreference,
  FloorPreference,
  RoomLocationPreference,
  RvType,
  HookupRequirements,
  DietaryRestriction,
  MembershipTier,
  VerificationStatus,
  VerificationMethod,
  ReviewerDecision,
} from "./enums";

export interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface NtkProfile {
  userId: string;
  fullName: string;
  dateOfBirth: Timestamp;
  phoneNumber: string;
  secondaryPhone: string;
  email: string;
  facePhotoUrl: string | null;
  facePhotoVisibility: FacePhotoVisibility;
  preferredContactMethod: ContactMethod;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bedTypePreference: BedType;
  occupancyAdults: number;
  occupancyChildren: number;
  occupancyInfants: number;
  petType: string | null;
  petSize: string | null;
  petCount: number;
  accessibilityNeeds: AccessibilityNeed[];
  smokingPreference: SmokingPreference;
  floorPreference: FloorPreference;
  roomLocationPreference: RoomLocationPreference;
  rvType: RvType;
  rvLength: string | null;
  hookupRequirements: HookupRequirements;
  waterfrontPreference: boolean;
  shadePreference: boolean;
  petFriendlyRequired: boolean;
  primaryPaymentMethod: string;
  backupPaymentMethod: string | null;
  preferredCheckInPayment: string | null;
  billingAddress: BillingAddress;
  dietaryRestrictions: DietaryRestriction[];
  serviceAnimalInfo: string | null;
  languagePreference: string;
  membershipTier: MembershipTier;
  membershipStartDate: Timestamp;
  membershipExpirationDate: Timestamp;
  loyaltyProgramNumbers: Record<string, string>;
  marketingOptIn: boolean;
  dataSharingConsent: boolean;
  publicProfileFields: string[];
  supplierVisibleFields: string[];
  profileCompletionPercent: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface NtkVerification {
  userId: string;
  legalNameMatch: boolean;
  residencyState: string;
  verificationStatus: VerificationStatus;
  verificationMethod: VerificationMethod;
  idIssuingState: string;
  idExpiration: Timestamp;
  idLastFour: string;
  documentReferences: string[];
  reviewerNotes: string | null;
  reviewTimestamp: Timestamp | null;
  reviewerDecision: ReviewerDecision | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
