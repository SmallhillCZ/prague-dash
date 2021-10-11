
export interface FeatureCollection<Properties> {
  type: "FeatureCollection",

  features: {
    type: "Feature";
    geometry: Geometry;
    properties: Properties;
  }[];
}

export interface Geometry {
  "type": "Point",
  "coordinates": [number, number];
}