import { LanguageValue } from "src/app/schema/language";

export enum RouteType {
  "Tram" = 0,
  "Subway" = 1,
  "Rail" = 2,
  "Bus" = 3,
  "Ferry" = 4,
  "CableCar" = 5,
  // "Lift" = 6,
  "Funicular" = 7,
  "Trolleybus" = 11,
  // "Monorail" = 12,
}

interface RouteTypeData {
  name: LanguageValue<string>;
  name_short: LanguageValue<string>;
  icon: string;
  tracked?: boolean;
}

export const RouteTypes: { [id in RouteType]: RouteTypeData } = {
  [RouteType.Tram]: {
    name: { cs: "Tramvaj", en: "Tram" },
    name_short: { cs: "Tram", en: "Tram" },
    icon: "🚋",
    tracked: true,
  },

  [RouteType.Subway]: {
    name: { cs: "Metro", en: "Subway" },
    name_short: { cs: "Metro", en: "Subway" },
    icon: "🚅",
  },

  [RouteType.Bus]: {
    name: { cs: "Autobus", en: "Bus" },
    name_short: { cs: "Bus", en: "Bus" },
    icon: "🚌",
    tracked: true,
  },

  [RouteType.Rail]: {
    name: { cs: "Vlak", en: "Train" },
    name_short: { cs: "Vlak", en: "Train" },
    icon: "🚃",
    tracked: true,
  },

  [RouteType.Trolleybus]: {
    name: { cs: "Trolejbus", en: "Trolleybus" },
    name_short: { cs: "Bus", en: "Bus" },
    icon: "🚎",
    tracked: false,
  },

  [RouteType.Ferry]: {
    name: { cs: "Přívoz", en: "Ferry" },
    name_short: { cs: "Přívoz", en: "Ferry" },
    icon: "🛥️",
    tracked: false,
  },

  [RouteType.CableCar]: {
    name: { cs: "Lanovka", en: "Cable car" },
    name_short: { cs: "Lanovka", en: "Cable car" },
    icon: "🚠",
    tracked: false,
  },

  [RouteType.Funicular]: {
    name: { cs: "Lanovka", en: "Funicular" },
    name_short: { cs: "Lanovka", en: "Funicular" },
    icon: "🚠",
    tracked: false,
  },
};
