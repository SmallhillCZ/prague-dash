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

interface RouteTypeData {
  name: LanguageValue<string>;
  name_short: LanguageValue<string>;
  icon: string;
}

export const RouteTypes: { [id in RouteType]?: RouteTypeData } = {
  [RouteType.Tram]: {
    name: { cs: "Tramvaj", en: "Tram" },
    name_short: { cs: "Tram", en: "Tram" },
    icon: "🚋",
  },

  [RouteType.Subway]: {
    name: { cs: "Metro", en: "Subway" },
    name_short: { cs: "Metro", en: "Subway" },
    icon: "🚃",
  },

  [RouteType.Bus]: {
    name: { cs: "Autobus", en: "Bus" },
    name_short: { cs: "Bus", en: "Bus" },
    icon: "🚌",
  },
};
