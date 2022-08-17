import { BaseEntity } from './common.interface';
import { Location } from './location.interface';

export interface Component extends BaseEntity {
  organization: string;
  type: TypeOfComponent;
  provider: string;
  photo: string;
  publicAccess: boolean;
  tags: string[];
  mobile: boolean;
  location: Location;
}

export interface ComponentType {
  identifier: string;
  name: string;
  description?: string;
  photo: string;
  // TODO: Review icon property
  icon: string;
}

export enum TypeOfComponent {
  AIR_QUALITY = 'air_quality',
  OTHERS = 'others',
  BUILDING_ANALYZER = 'building_analyzer',
  BYCICLE_FLOW = 'bycicle_flow',
  CONTAINER_GLASS = 'container_glass',
  CONTAINER_ORGANIC = 'container_organic',
  CONTAINER_PAPER = 'container_paper',
  CONTAINER_PLASTIC = 'container_plastic',
  CONTAINER_REFUSE = 'container_refuse',
  CONTAINER_VOLUME = 'container_volume',
  ELECTRICITY_METER = 'electricity_meter',
  EXTERNAL_AMBIENT_CONDITIONS = 'external_ambient_conditions',
  FLOWMETER = 'flowmeter',
  GAS_METER = 'gas_meter',
  GENERIC = 'generic',
  HUMIDITY = 'humidity',
  INTERNAL_AMBIENT_CONDITIONS = 'internal_ambient_conditions',
  LUMINOSITY = 'luminosity',
  METEO = 'meteo',
  NETWORK_ANALYZER = 'network_analyzer',
  NOISE = 'noise',
  PAPERERA_PARET = 'paperera_paret',
  PARK_METER = 'park_meter',
  PARKING = 'parking',
  PEOPLE_FLOW = 'people_flow',
  PHOTOVOLTAIC_SOLAR_ENERGY = 'photovoltaic_solar_energy',
  PLUGSENSE = 'plugsense',
  SALINITY = 'salinity',
  SOIL_SENSOR = 'soil_sensor',
  SOLAR_THERMAL_INSTALLATION = 'solar_thermal_installation',
  SOLENOID_VALVE = 'solenoid_valve',
  TEMPERATURE = 'temperature',
  TRAFFIC = 'traffic',
  URBAN_CLEANING_VEHICLE = 'urban_cleaning_vehicle',
  URBAN_MAINTENANCE_VEHICLE = 'urban_maintenance_vehicle',
  VEHICLE = 'vehicle',
  WATER_METER = 'water_meter',
  WATER_QUALITY = 'water_quality',
  WIND = 'wind',
}
