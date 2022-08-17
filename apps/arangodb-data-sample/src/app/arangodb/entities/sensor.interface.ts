import { BaseEntity } from './common.interface';
import { Location } from './location.interface';

export interface Sensor extends BaseEntity {
  organization: string;
  publicAccess: boolean;
  type: TypeOfSensor;
  tags: string[];
  dataType: DataType;
  measurementUnit: string;
  timeZone: string;
  state: string;
  subState: string;
  ttl: number;
  location: Location;
}

export interface SensorType {
  identifier: string;
  name: string;
  description?: string;
}

export enum TypeOfSensor {
  ACCELEROMETER = 'accelerometer',
  ACTIVE_ENERGY = 'active_energy',
  ACTIVE_POWER = 'active_power',
  AIR_POLLUTANT = 'air_pollutant',
  AIR_QUALITY_CO = 'air_quality_co',
  AIR_QUALITY_CO2 = 'air_quality_co2',
  AIR_QUALITY_NO2 = 'air_quality_no2',
  AIR_QUALITY_O3 = 'air_quality_o3',
  AIR_QUALITY_PM10 = 'air_quality_pm10',
  AIR_QUALITY_PM25 = 'air_quality_pm25',
  AIR_QUALITY_SO2 = 'air_quality_so2',
  AMMONIA = 'ammonia',
  ANEMOMETER = 'anemometer',
  ATMOSPHERIC_PRESSURE = 'atmospheric_pressure',
  BATTERY = 'battery',
  BEND = 'bend',
  BROMIDE_ION = 'bromide_ion',
  BYCICLE_FLOW = 'bycicle_flow',
  CALCIUM_ION = 'calcium_ion',
  CHLORIDE_ION = 'chloride_ion',
  CONDUCTIVITY = 'conductivity',
  CONTAINER_OPEN = 'container_open',
  CONTAINER_OVERTURN = 'container_overturn',
  CONTAINER_VOLUME = 'container_volume',
  COPPER_ION = 'copper_ion',
  COSPHI = 'cosphi',
  CRACK_DETECTION = 'crack_detection',
  CRACK_PROPAGATION = 'crack_propagation',
  CURRENT = 'current',
  DEMOGRAPHIC = 'demographic',
  DENDOMETER = 'dendometer',
  DISTANCE = 'distance',
  ETO = 'eto',
  FLOWMETER = 'flowmeter',
  FLUORIDE_ION = 'fluoride_ion',
  FREQUENCY = 'frequency',
  GAS_VOLUME = 'gas_volume',
  GLOBAL_SOLAR_IRRADIANCE = 'global_solar_irradiance',
  HALL_EFFECT = 'hall_effect',
  HUMIDITY = 'humidity',
  IODIDE_ION = 'iodide_ion',
  LEAF_MOISTURE = 'leaf_moisture',
  LINEAR_DISPLACEMENT = 'linear_displacement',
  LIQUID_LEAKAGE_LINE = 'liquid_leakage_line',
  LIQUID_LEAKAGE_POINT = 'liquid_leakage_point',
  LIQUID_LEVEL = 'liquid_level',
  LOAD = 'load',
  LPG = 'lpg',
  LUMINOSITY = 'luminosity',
  MAGNESSIUM_ION = 'magnessium_ion',
  METHANE = 'methane',
  MODEM_3G_CONNECT = 'modem_3g_connect',
  NITRATE_ION = 'nitrate_ion',
  NOISE = 'noise',
  NOISE_CLASS_I = 'noise_class_i',
  O_SATURATION = 'o_saturation',
  OTHERS = 'others',
  OXYGEN = 'oxygen',
  PARK_METER = 'park_meter',
  PARKING = 'parking',
  PEOPLE_FLOW = 'people_flow',
  PH = 'ph',
  PLUVIOMETER = 'pluviometer',
  POTASSIUM_ION = 'potassium_ion',
  POWER_GRID = 'power_grid',
  PRESENCE = 'presence',
  PRESSURE = 'pressure',
  PROXIMITY_INDOOR = 'proximity_indoor',
  PROXIMITY_OUTDOOR = 'proximity_outdoor',
  RAIN = 'rain',
  REACTIVE_ENERGY = 'reactive_energy',
  REACTIVE_POWER = 'reactive_power',
  REDOX_POTENTIAL = 'redox_potential',
  SALINITY = 'salinity',
  SIGNAL = 'signal',
  SODIUM_ION = 'sodium_ion',
  SOIL_MOISTURE_15 = 'soil_moisture_15',
  SOIL_MOISTURE_35 = 'soil_moisture_35',
  SOLAR_RADIATION = 'solar_radiation',
  SOLENOID_VALVE = 'solenoid_valve',
  SOLVENT_VAPORS = 'solvent_vapors',
  STATUS = 'status',
  STRETCH = 'stretch',
  TACHOMETER = 'tachometer',
  TEMPERATURE = 'temperature',
  TORQUE_METER = 'torque_meter',
  UV_WIDE_SPECTRUM = 'uv_wide_spectrum',
  VEHICLE_OCCUPATION_AVERAGE = 'vehicle_occupation_average',
  VEHICLE_ODOMETER = 'vehicle_odometer',
  VEHICLE_ORIENTATION = 'vehicle_orientation',
  VEHICLE_SPEED = 'vehicle_speed',
  VEHICLE_VOLUME = 'vehicle_volume',
  VERTICAL_LEVEL = 'vertical_level',
  VIBRATION = 'vibration',
  VOC = 'voc',
  VOLTAGE = 'voltage',
  WATER_METER = 'water_meter',
  WIND = 'wind',
  WIND_DIRECTION_10_M = 'wind_direction_10_m',
  WIND_DIRECTION_6_M = 'wind_direction_6_m',
}

export enum DataType {
  NUMERICAL = 'numerical',
  AUDIO_LINK = 'audio_link',
  BOOLEAN = 'boolean',
  FILE_LINK = 'file_link',
  JSON = 'json',
  LINK = 'link',
  TEXT = 'text',
  VIDEO_LINK = 'video_link',
}
