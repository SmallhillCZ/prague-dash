import { LanguageValue } from "src/app/schema/language";

export enum ContainerTypeID {
  "unknown" = 0,
  "tinted_glass" = 1,
  "electric_waste" = 2,
  "metals" = 3,
  "beverage cartons" = 4,
  "paper" = 5,
  "plastics" = 6,
  "clear_glass" = 7,
  "textiles" = 8,
}

export interface ContainerTypeInfo {
  title: LanguageValue<string>;
}

export const ContainerTypes: { [key in ContainerTypeID]: ContainerTypeInfo } = {
  0: {
    title: { cs: "Neznámý", en: "Unknown" }
  },
  1: {
    title: { cs: "Barevné sklo", en: "Tinted glass" }
  },
  2: {
    title: { cs: "Elektrozařízení", en: "Electric waste" }
  },
  3: {
    title: { cs: "Kovy", en: "Metals" }
  },
  4: {
    title: { cs: "Nápojové kartóny", en: "Beverage cartons" }
  },
  5: {
    title: { cs: "Papír", en: "Paper" }
  },
  6: {
    title: { cs: "Plast", en: "Plastics" }
  },
  7: {
    title: { cs: "Čiré sklo", en: "Clear glass" }
  },
  8: {
    title: { cs: "Textil", en: "Textiles" }
  },
};