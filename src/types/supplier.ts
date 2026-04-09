// ============================================
// NTK Supplier Types
// Collection: ntk_suppliers/{supplierId}
// Collection: ntk_supplier_requirements/{supplierId}
// Collection: ntk_supplier_templates/{templateId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";
import {
  BusinessType,
  OnboardingStatus,
  IntegrationTier,
  SupplierCheckInProcess,
  TransactionFeeType,
  DeliveryMethod,
  DataFormatPreference,
  TemplateOutputFormat,
} from "./enums";

export interface SupplierAddress {
  street: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  country: string;
}

export interface NtkSupplier {
  supplierId: string;
  businessName: string;
  businessType: BusinessType;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: SupplierAddress;
  county: string;
  latitude: number;
  longitude: number;
  onboardingStatus: OnboardingStatus;
  integrationTier: IntegrationTier;
  setupFee: number;
  monthlySubscription: number | null;
  transactionFeeType: TransactionFeeType;
  transactionFeeAmount: number;
  amenities: string[];
  petPolicy: string;
  checkInProcess: SupplierCheckInProcess;
  cancellationPolicy: string;
  loyaltyProgramName: string | null;
  earlyAdopterDiscount: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface NtkSupplierRequirements {
  supplierId: string;
  requiredFields: string[];
  optionalFields: string[];
  dataFormatPreference: DataFormatPreference;
  deliveryMethod: DeliveryMethod;
  webhookEndpoint: string | null;
  apiKey: string | null;
  prefillTemplateId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TemplateFieldMapping {
  ntkField: string;
  supplierField: string;
  transform: string | null;
}

export interface NtkSupplierTemplate {
  templateId: string;
  supplierId: string;
  templateName: string;
  outputFormat: TemplateOutputFormat;
  fieldMappings: TemplateFieldMapping[];
  includePaymentInfo: boolean;
  includeIdVerification: boolean;
  includePetInfo: boolean;
  includeAccessibility: boolean;
  includeRvDetails: boolean;
  customFields: Record<string, string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
