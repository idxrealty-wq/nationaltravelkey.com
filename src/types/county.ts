// ============================================
// NTK County Types
// Collection: ntk_counties/{countyId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";

export interface CountyCoordinates {
  latitude: number;
  longitude: number;
}

export interface CountyStats {
  totalProperties: number;
  totalSites: number;
  averagePrice: number;
  averageRating: number | null;
}

export interface NtkCounty {
  countyId: string;
  countyName: string;
  state: string;
  fipsCode: string;
  coordinates: CountyCoordinates;
  boundaryGeoJson: string | null;
  tileImageUrl: string | null;
  description: string;
  stats: CountyStats;
  popularPropertyTypes: string[];
  featured: boolean;
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
