import { Cards } from "../cards/cards";

export interface Card<Data = any> {
  id: string;
  type: string;

  data: Data;

  icon?: string;
  title?: string;
  color?: string;

  lastUpdate?: string;
  notifications?: boolean;
}