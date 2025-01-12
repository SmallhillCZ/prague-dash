// SQLite doesnt have SQRT or POW by default, so we use just basic math operations
export function coordinatesToDistanceSql(table: string, coordinates: { lat: number, lon: number; }) {
  return `(${table}.lat - ${coordinates.lat}) * (${table}.lat - ${coordinates.lat}) + (${table}.lon - ${coordinates.lon}) * (${table}.lon - ${coordinates.lon})`;
}