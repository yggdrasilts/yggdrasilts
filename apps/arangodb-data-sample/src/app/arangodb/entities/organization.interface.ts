import { BaseEntity } from './common.interface';
import { Location } from './location.interface';

export interface VisualConfiguration {
  timeZone: string;
  dateFormat: string;
  chartValuesNumber?: string;
}

export interface MapConfiguration {
  zoomLevel: number;
  location: Location;
  // TODO: Change to color enum
  mapBackgroundColor: string;
}

export interface OrganizationConfigParams {
  visualConfiguration: VisualConfiguration;
  mapConfiguration: MapConfiguration;
}

export interface Organization extends BaseEntity {
  contactName: string;
  contactEmail: string;
  publicAccess: boolean;
  configParams: OrganizationConfigParams;
}
