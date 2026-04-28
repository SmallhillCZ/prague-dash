// Distance from a table's geometry column to the given coordinates, using PostGIS.
// Returns a SQL expression and the parameters it expects to be bound on the
// query builder (use `setParameters(...)` on the QueryBuilder).
export function coordinatesToDistanceSql(table: string, coordinates: { lat: number; lon: number }): {
  sql: string;
  parameters: { coordsLat: number; coordsLon: number };
} {
  return {
    sql: `ST_DistanceSphere(${table}.geom, ST_SetSRID(ST_MakePoint(:coordsLon, :coordsLat), 4326))`,
    parameters: { coordsLat: coordinates.lat, coordsLon: coordinates.lon },
  };
}