import { Coordinates } from "src/schema/coordinates";

export function coordinatesFromTuple(array: [number, number]): Coordinates {
  return {
    lat: array[1],
    lon: array[0],
  };
}
