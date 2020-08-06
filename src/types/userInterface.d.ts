import { LongLat, Service } from './church';

export interface SearchDocData {
  name: string;
  state: string;
  services: Service[];
  denomination: string;
  city: string;
  id: string;
  longLat: LongLat;
}

export interface SearchDoc {
  id: string;
  name: string;
  data: SearchDocData;
}
