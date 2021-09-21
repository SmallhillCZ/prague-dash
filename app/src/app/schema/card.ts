import { Cards } from "../cards/cards";

export interface Card {
  type: keyof typeof Cards;
  data: any;
  definition?: any;
  settings?: any;

  lastUpdate: string;
  color?: string;
  notifications?: boolean;
}