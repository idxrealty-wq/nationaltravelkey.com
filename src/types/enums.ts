// ============================================
// NTK Shared Enums — Single Source of Truth
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

// --- Profile Enums ---

export enum FacePhotoVisibility {
  MEMBERS_ONLY = "MEMBERS_ONLY",
  SUPPLIERS_ONLY = "SUPPLIERS_ONLY",
  ALL = "ALL",
  NONE = "NONE",
}

export enum ContactMethod {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PHONE = "PHONE",
}

export enum BedType {
  QUEEN = "QUEEN",
  KING = "KING",
  DOUBLE = "DOUBLE",
  TWIN = "TWIN",
  NO_PREFERENCE = "NO_PREFERENCE",
}

export enum AccessibilityNeed {
  MOBILITY = "MOBILITY",
  HEARING = "HEARING",
  VISUAL = "VISUAL",
  OTHER = "OTHER",
}

export enum SmokingPreference {
  SMOKING = "SMOKING",
  NON_SMOKING = "NON_SMOKING",
  NO_PREFERENCE = "NO_PREFERENCE",
}

export enum FloorPreference {
  GROUND = "GROUND",
  LOW = "LOW",
  HIGH = "HIGH",
  NO_PREFERENCE = "NO_PREFERENCE",
}

export enum RoomLocationPreference {
  QUIET = "QUIET",
  NEAR_ELEVATOR = "NEAR_ELEVATOR",
  NO_PREFERENCE = "NO_PREFERENCE",
}

export enum RvType {
  CLASS_A = "CLASS_A",
  CLASS_C = "CLASS_C",
  TRAVEL_TRAILER = "TRAVEL_TRAILER",
  FIFTH_WHEEL = "FIFTH_WHEEL",
  TENT = "TENT",
  NONE = "NONE",
}

export enum HookupRequirements {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  NONE = "NONE",
}

export enum DietaryRestriction {
  VEGETARIAN = "VEGETARIAN",
  VEGAN = "VEGAN",
  GLUTEN_FREE = "GLUTEN_FREE",
  ALLERGIES = "ALLERGIES",
}

export enum MembershipTier {
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  FOUNDER = "FOUNDER",
}

// --- Verification Enums ---

export enum VerificationStatus {
  NOT_STARTED = "NOT_STARTED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
}

export enum VerificationMethod {
  STATE_ID = "STATE_ID",
  DRIVERS_LICENSE = "DRIVERS_LICENSE",
  UTILITY_BILL = "UTILITY_BILL",
  OTHER = "OTHER",
}

export enum ReviewerDecision {
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  NEEDS_ATTENTION = "NEEDS_ATTENTION",
}

// --- Card Enums ---

export enum CardType {
  DIGITAL = "DIGITAL",
  PVC = "PVC",
  METAL = "METAL",
}

export enum CardStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  EXPIRED = "EXPIRED",
  REPLACED = "REPLACED",
}

// --- Check-In Enums ---

export enum ScanMethod {
  QR_CODE = "QR_CODE",
  NFC_TAP = "NFC_TAP",
  MANUAL = "MANUAL",
}

export enum PinDeliveryMethod {
  SMS = "SMS",
  EMAIL = "EMAIL",
  VOICE = "VOICE",
}

export enum CheckInStatus {
  PENDING_PIN = "PENDING_PIN",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
}

// --- Audit Log Enums ---

export enum AuditEventType {
  CHECK_IN = "CHECK_IN",
  CHECK_IN_FAILED = "CHECK_IN_FAILED",
  CARD_BLOCKED = "CARD_BLOCKED",
  CARD_ISSUED = "CARD_ISSUED",
  PROFILE_UPDATED = "PROFILE_UPDATED",
  VERIFICATION_REVIEWED = "VERIFICATION_REVIEWED",
  PIN_GENERATED = "PIN_GENERATED",
  PIN_FAILED = "PIN_FAILED",
  ADMIN_ACTION = "ADMIN_ACTION",
}

// --- Supplier Enums ---

export enum BusinessType {
  HOTEL = "HOTEL",
  CAMPGROUND = "CAMPGROUND",
  RV_PARK = "RV_PARK",
  MARINA = "MARINA",
  RESORT = "RESORT",
  GLAMPING = "GLAMPING",
  STATE_PARK = "STATE_PARK",
  NATIONAL_FOREST = "NATIONAL_FOREST",
  COUNTY_PARK = "COUNTY_PARK",
}

export enum OnboardingStatus {
  NOT_STARTED = "NOT_STARTED",
  QUESTIONNAIRE_COMPLETE = "QUESTIONNAIRE_COMPLETE",
  INTEGRATION_SETUP = "INTEGRATION_SETUP",
  TESTING = "TESTING",
  LIVE = "LIVE",
}

export enum IntegrationTier {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
}

export enum SupplierCheckInProcess {
  ONLINE = "ONLINE",
  AT_DESK = "AT_DESK",
  MOBILE_APP = "MOBILE_APP",
}

export enum TransactionFeeType {
  FLAT = "FLAT",
  PERCENTAGE = "PERCENTAGE",
}

export enum DeliveryMethod {
  API = "API",
  WEBHOOK = "WEBHOOK",
  EMAIL = "EMAIL",
  SMS = "SMS",
  QR_SCAN = "QR_SCAN",
}

export enum DataFormatPreference {
  JSON = "JSON",
  XML = "XML",
  CSV = "CSV",
  PDF = "PDF",
}

export enum TemplateOutputFormat {
  JSON = "JSON",
  PDF = "PDF",
  PREFILLED_FORM = "PREFILLED_FORM",
}

// --- Property Enums ---

export enum PropertyType {
  HOTEL = "HOTEL",
  CAMPGROUND = "CAMPGROUND",
  RV_PARK = "RV_PARK",
  MARINA = "MARINA",
  RESORT = "RESORT",
  GLAMPING = "GLAMPING",
  STATE_PARK = "STATE_PARK",
  CABIN = "CABIN",
}

export enum AvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  FULL = "FULL",
  SEASONAL = "SEASONAL",
  CLOSED = "CLOSED",
}

// --- Transaction Enums ---

export enum TransactionType {
  MEMBERSHIP_PAYMENT = "MEMBERSHIP_PAYMENT",
  MEMBERSHIP_RENEWAL = "MEMBERSHIP_RENEWAL",
  SUPPLIER_SETUP_FEE = "SUPPLIER_SETUP_FEE",
  SUPPLIER_SUBSCRIPTION = "SUPPLIER_SUBSCRIPTION",
  BOOKING_TRANSACTION_FEE = "BOOKING_TRANSACTION_FEE",
}

export enum PaymentProcessor {
  SQUARE = "SQUARE",
  STRIPE = "STRIPE",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}
