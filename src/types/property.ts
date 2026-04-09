// ============================================
// NTK Property Types
// Collection: ntk_properties/{propertyId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";
import { PropertyType, AvailabilityStatus } from "./enums";

export interface PropertyAddress {
  street: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  country: string;
}

export interface PropertyCoordinates {
  latitude: number;
  longitude: number;
}

export interface PropertyAmenities {
  wifi: boolean;
  pool: boolean;
  laundry: boolean;
  showers: boolean;
  restrooms: boolean;
  dumpStation: boolean;
  generalStore: boolean;
  playground: boolean;
  dogPark: boolean;
  boatRamp: boolean;
  fishing: boolean;
  hiking: boolean;
  biking: boolean;
  picnicArea: boolean;
  fireRing: boolean;
  electricHookup: boolean;
  waterHookup: boolean;
  sewerHookup: boolean;
}

export interface NtkProperty {
  propertyId: string;
  supplierId: string;
  propertyName: string;
  propertyType: PropertyType;
  address: PropertyAddress;
  coordinates: PropertyCoordinates;
  county: string;
  state: string;
  description: string;
  photoUrls: string[];
  totalSites: number;
  availableSites: number;
  availabilityStatus: AvailabilityStatus;
  priceRangeMin: number;
  priceRangeMax: number;
  amenities: PropertyAmenities;
  petFriendly: boolean;
  adaAccessible: boolean;
  seasonStart: string | null;
  seasonEnd: string | null;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  rating: number | null;
  reviewCount: number;
  featured: boolean;
  rankingTier: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
