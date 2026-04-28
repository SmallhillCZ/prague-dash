// Distance from a table's geometry column to the given coordinates, using PostGIS.
export function coordinatesToDistanceSql(table: string, coordinates: { lat: number; lon: number }) {
  return `ST_DistanceSphere(${table}.geom, ST_SetSRID(ST_MakePoint(${coordinates.lon}, ${coordinates.lat}), 4326))`;
}