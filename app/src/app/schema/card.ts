import { CardType } from "./card-type";

export interface Card<T = string, Definition = any> {
  id: string;
  type: T;

  definition: Definition;

  color?: string;
  lastUpdate?: string;
  notifications?: boolean;
}
