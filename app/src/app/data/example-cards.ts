import { Card } from "../schema/card";

export const ExampleCards: Card[] = [
  { type: "tram", lastUpdate: "2021-09-21T12:38:00Z", data: { number: "25", stop: "Lipanská", minutes: 10 } },
  { type: "container", lastUpdate: "2021-09-21T12:38:00Z", data: { location: "Bořivojova", occupancy: .5 } },
  { type: "parking", lastUpdate: "2021-09-21T12:38:00Z", data: { location: "OC Flora", vacancy: 32 } }
];