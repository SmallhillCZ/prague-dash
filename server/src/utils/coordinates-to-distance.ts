import { Coordinates } from "src/shared/schema/coordinates";

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function coordinatesToDistance(coordA: Coordinates, coordB: Coordinates) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(coordB.lat - coordA.lat);  // deg2rad below
  var dLon = deg2rad(coordB.lon - coordA.lon);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coordA.lat)) * Math.cos(deg2rad(coordB.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};