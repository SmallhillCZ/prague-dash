import { LanguageValue } from "src/app/schema/language";
import { MapMarkerIconDirection } from "src/app/shared/components/map-marker/map-marker.component";

export enum RouteTypeID {
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

export interface RouteType {
  name: LanguageValue<string>;
  name_short: LanguageValue<string>;
  icon: string;
  iconDirection: MapMarkerIconDirection;
  tracked?: boolean;
}

export const RouteTypes: { [id in RouteTypeID]: RouteType } = {
  [RouteTypeID.Tram]: {
    name: { cs: "Tramvaj", en: "Tram" },
    name_short: { cs: "Tram", en: "Tram" },
    icon: "🚋",
    iconDirection: "left",
    tracked: true,
  },

  [RouteTypeID.Subway]: {
    name: { cs: "Metro", en: "Subway" },
    name_short: { cs: "Metro", en: "Subway" },
    icon: "🚅",
    iconDirection: "left",
  },

  [RouteTypeID.Bus]: {
    name: { cs: "Autobus", en: "Bus" },
    name_short: { cs: "Bus", en: "Bus" },
    icon: "🚌",
    iconDirection: "left",
    tracked: true,
  },

  [RouteTypeID.Rail]: {
    name: { cs: "Vlak", en: "Train" },
    name_short: { cs: "Vlak", en: "Train" },
    icon: "🚃",
    iconDirection: "right",
    tracked: true,
  },

  [RouteTypeID.Trolleybus]: {
    name: { cs: "Trolejbus", en: "Trolleybus" },
    name_short: { cs: "Bus", en: "Bus" },
    icon: "🚎",
    iconDirection: "left",
    tracked: false,
  },

  [RouteTypeID.Ferry]: {
    name: { cs: "Přívoz", en: "Ferry" },
    name_short: { cs: "Přívoz", en: "Ferry" },
    icon: "🛥️",
    iconDirection: "left",
    tracked: false,
  },

  [RouteTypeID.CableCar]: {
    name: { cs: "Lanovka", en: "Cable car" },
    name_short: { cs: "Lanovka", en: "Cable car" },
    icon: "🚠",
    iconDirection: "right",
    tracked: false,
  },

  [RouteTypeID.Funicular]: {
    name: { cs: "Lanovka", en: "Funicular" },
    name_short: { cs: "Lanovka", en: "Funicular" },
    icon: "🚠",
    iconDirection: "right",
    tracked: false,
  },
};
