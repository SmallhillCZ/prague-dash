
export interface FeatureCollection<Properties> {
  type: "FeatureCollection",

  features: Feature<Properties>[];
}

export interface Feature<Properties> {
  type: "Feature";
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  "type": "Point",
  coordinates: [number, number];
}