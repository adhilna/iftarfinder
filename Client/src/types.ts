export type IftarType = 'full' | 'dates_water' | 'none' | 'unknown';

export type VerificationStatus =
  | 'confirmed_recent'
  | 'confirmed_today'
  | 'needs_confirmation'
  | 'potentially_outdated'
  | 'recently_submitted'
  | 'representative_verified';

export type DayOfWeek =
  | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface Masjid {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  photo?: string;
  iftarType: IftarType;
  iftarTime: string;
  availableDays: DayOfWeek[];
  facilities: string[];
  contact?: string;
  notes?: string;
  verification: {
    status: VerificationStatus;
    lastConfirmedDate: string;
    confirmationCount: number;
  };
  distanceKm?: number;
}

export interface ReportReason {
  id: string;
  label: string;
}
