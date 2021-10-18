export enum Language {
  cs = "cs",
  en = "en",
}

export type LanguageValue<Content> = { [lang in Language]: Content };