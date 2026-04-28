import { LanguageValue } from "src/app/schema/language";
import { ContainerTypeTypeEnum } from "src/sdk";

export interface ContainerTypeInfo {
  title: LanguageValue<string>;
}

// Trash type
// | 1 | Barevné sklo | Tinted glass |
// | 2 | Elektrozařízení | Electric waste |
// | 3 | Kovy | Metals |
// | 4 | Nápojové kartóny | Beverage cartons |
// | 5 | Papír | Paper |
// | 6 | Plast | Plastics |
// | 7 | Čiré sklo | Clear glass |
// | 8 | Jedlé tuky a oleje | Edible fats and oils |
// | 9 | Multikomoditní sběr | Multicommodity |

export const ContainerTypes: { [key in ContainerTypeTypeEnum]: ContainerTypeInfo } = {
  1: {
    title: { cs: "Barevné sklo", en: "Tinted glass" },
  },
  2: {
    title: { cs: "Elektrozařízení", en: "Electric waste" },
  },
  3: {
    title: { cs: "Kovy", en: "Metals" },
  },
  4: {
    title: { cs: "Nápojové kartóny", en: "Beverage cartons" },
  },
  5: {
    title: { cs: "Papír", en: "Paper" },
  },
  6: {
    title: { cs: "Plast", en: "Plastics" },
  },
  7: {
    title: { cs: "Čiré sklo", en: "Clear glass" },
  },
  8: {
    title: { cs: "Jedlé tuky a oleje", en: "Edible fats and oils" },
  },
  9: {
    title: { cs: "Multikomoditní sběr", en: "Multicommodity" },
  },
};
