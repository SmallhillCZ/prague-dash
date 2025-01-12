import { LanguageValue } from "src/app/schema/language";

export enum ContainerAccessibilityID {
  "accessible" = 1,
  "residents" = 2,
  "unknown" = 3
}

export interface ContainerAccessibilityInfo {
  title: LanguageValue<string>;
}

export const ContainerAccessibility: { [id in ContainerAccessibilityID]: ContainerAccessibilityInfo } = {
  1: {
    title: { cs: "volně", en: "accessible" }
  },

  2: {
    title: { cs: "obyvatelům domu", en: "only for house residents" }
  },

  3: {
    title: { cs: "neznámá dostupnost", en: "unknown" }
  }
};