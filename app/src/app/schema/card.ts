import { CardType } from "./card-type";

export interface Card<T = string, Definition = any> {
  id: string;
  type: T;

  title: string;
  definition: Definition;

  color?: string;
  lastUpdate?: string;
  notifications?: boolean;
}
