export enum ContainerType {
  "tinted_glass" = 1,
  "electric_waste" = 2,
  "metals" = 3,
  "beverage cartons" = 4,
  "paper" = 5,
  "plastics" = 6,
  "clear_glass" = 7,
  "textiles" = 8,
}

export const ContainerTypeNames: { [key in ContainerType]: { cs: string, en: string; } } = {
  1: {
    cs: "Barevné sklo",
    en: "Tinted glass"
  },
  2: {
    cs: "Elektrozařízení",
    en: "Electric waste"
  },
  3: {
    cs: "Kovy",
    en: "Metals"
  },
  4: {
    cs: "Nápojové kartóny",
    en: "Beverage cartons"
  },
  5: {
    cs: "Papír",
    en: "Paper"
  },
  6: {
    cs: "Plast",
    en: "Plastics"
  },
  7: {
    cs: "Čiré sklo",
    en: "Clear glass"
  },
  8: {
    cs: "Textil",
    en: "Textiles"
  },
};