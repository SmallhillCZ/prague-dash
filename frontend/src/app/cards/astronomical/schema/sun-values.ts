import { LanguageValue } from "src/app/schema/language";

export enum SunValueNames {
  "sunset" = "sunset",
  "sunrise" = "sunrise",
  "dusk" = "dusk",
  "dawn" = "dawn"
}

export interface SunValuesMeta {
  title: LanguageValue<string>;
}

export const SunValues: { [value in SunValueNames]: SunValuesMeta } = {

  dusk: {
    title: { "cs": "Soumrak", "en": "Dusk" }
  },
  sunset: {
    title: { "cs": "Západ", "en": "Sunset" }
  },

  sunrise: {
    title: { "cs": "Východ", "en": "Sunrise" }
  },


  dawn: {
    title: { "cs": "Úsvit", "en": "Dawn" }
  },

};