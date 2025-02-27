import { Coordinates } from "src/schema/coordinates";

// for comparison this is faster and enough
export function coordinatesToDistanceCompare(a: Coordinates, b: Coordinates, current: Coordinates) {
  if (!a || !b) return 0;
  const distA = Math.pow(a.lat - current.lat, 2) + Math.pow(a.lon - current.lon, 2);
  const distB = Math.pow(b.lat - current.lat, 2) + Math.pow(b.lon - current.lon, 2);
  return distA === distB ? 0 : distA > distB ? 1 : -1;
}
