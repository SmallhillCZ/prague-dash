import { LanguageValue } from "src/app/schema/language";

export enum RouteType {
  "Tram" = 0,
  "Subway" = 1,
  "Rail" = 2,
  "Bus" = 3,
  "Ferry" = 4,
  "CableCar" = 5,
  "Lift" = 6,
  "Funicular" = 7,
  "Trolleybus" = 11,
  "Monorail" = 12,
}

export const RouteTypes: { [id in RouteType]?: { name: LanguageValue<string>; } } = {

  [RouteType.Tram]: { name: { cs: "Tramvaj", en: "Tram" } },
  [RouteType.Subway]: { name: { cs: "Metro", en: "Subway" } },
  [RouteType.Bus]: { name: { cs: "Autobus", en: "Bus" } },
};
