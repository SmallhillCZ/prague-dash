export enum Language {
  cs = "cs",
  en = "en",
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type LanguageValue<Content> = PartialBy<{ [lang in Language]: Content }, Language.en>;