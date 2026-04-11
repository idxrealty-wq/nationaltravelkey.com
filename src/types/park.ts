export type ParkType =
  | 'STATE_PARK'
  | 'COUNTY_PARK'
  | 'CITY_PARK'
  | 'PRIVATE_RV_RESORT'
  | 'CAMPGROUND'
  | 'MARINA'
  | 'OTHER';

export type ManagedBy =
  | 'FLORIDA_STATE_PARKS'
  | 'COUNTY'
  | 'CITY'
  | 'PRIVATE_OWNER'
  | 'FEDERAL'
  | 'OTHER';

export type ReservationSystem =
  | 'NTK_NATIVE'
  | 'EXTERNAL_LINK'
  | 'PHONE_ONLY'
  | 'WALK_UP'
  | 'MIXED';

export type NtkRegistrationType =
  | 'INSTANT_BOOK'
  | 'REQUEST_TO_BOOK'
  | 'APPLICATION_REQUIRED'
  | 'EXTERNAL_CHECKOUT'
  | 'PHONE_CONFIRMATION';

export type DataSource =
  | 'MANUAL'
  | 'COUNTY_IMPORT'
  | 'STATE_IMPORT'
  | 'PARTNER_FEED'
  | 'USER_SUBMITTED';

export type PetPolicy =
  | 'ALLOWED'
  | 'RESTRICTED'
  | 'NOT_ALLOWED'
  | 'UNKNOWN';

export type AlcoholPolicy =
  | 'ALLOWED'
  | 'RESTRICTED'
  | 'NOT_ALLOWED'
  | 'UNKNOWN';

export interface NtkAddress {
  street1: string;
  street2?: string;
  city: string;
  county: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface NtkCoordinates {
  latitude: number;
  longitude: number;
  geohash: string;
}

export interface NtkContactInfo {
  phone?: string;
  email?: string;
  websiteUrl?: string;
  bookingUrl?: string;
}

export interface NtkAmenityFlags {
  rvSites: boolean;
  tentSites: boolean;
  cabins: boolean;
  boatRamp: boolean;
  marina: boolean;
  swimming: boolean;
  fishing: boolean;
  playground: boolean;
  restrooms: boolean;
  showers: boolean;
  laundry: boolean;
  fullHookups: boolean;
  electricHookups: boolean;
  waterHookups: boolean;
  sewerHookups: boolean;
  wifi: boolean;
  dumpStation: boolean;
  petArea: boolean;
}

export interface NtkPolicySummary {
  pets: PetPolicy;
  alcohol: AlcoholPolicy;
  quietHours?: string;
  checkInTime?: string;
  checkOutTime?: string;
  maxOccupancyNote?: string;
}

export interface NtkAvailabilitySummary {
  hasLiveInventory: boolean;
  inventoryLastCheckedAt?: string;
  bookingWindowDays?: number;
  sameDayBookingAllowed?: boolean;
}

export interface NtkPark {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription?: string;

  parkType: ParkType;
  managedBy: ManagedBy;
  reservationSystem: ReservationSystem;
  ntkRegistrationType: NtkRegistrationType;
  dataSource: DataSource;

  address: NtkAddress;
  coordinates: NtkCoordinates;
  contactInfo: NtkContactInfo;

  amenityFlags: NtkAmenityFlags;
  policySummary: NtkPolicySummary;
  availabilitySummary: NtkAvailabilitySummary;

  featuredImageUrl?: string;
  galleryImageUrls?: string[];

  isFeatured: boolean;
  isBookableThroughNtk: boolean;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}
