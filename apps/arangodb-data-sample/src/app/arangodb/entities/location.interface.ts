export interface Location {
  coordinates: Coordinates;
  type: ArangoGeoTypes;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export enum ArangoGeoTypes {
  POINT = 'Point',
  MULTIPOINT = 'MultiPoint',
  LINESTRING = 'LineString',
  MULTILINESTRING = 'MultiLineString',
  POLYGON = 'Polygon',
  MULTIPOLYGON = 'MultiPolygon',
}
