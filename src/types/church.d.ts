export type MinistryType = 'Accessibility' | 'Integrated' | 'Supported' | 'Independent' | 'Unknown';

export type ServiceType = 'Signed' | 'Interpreted' | 'Unknown'

export type LongLat = [number, number];

export interface Service {
  serviceType: ServiceType
  time: string;
  day: string;
}

export interface Church {
  id: string;
  name: string;
  denomination: string;
  email: string;
  ministryType: MinistryType;
  longLat: LongLat;
  website: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  phoneNumber: string | null;
  videoPhoneNumber: string | null;
  services: Service[];
}

export interface Marker extends Church {
  show: boolean;
}
