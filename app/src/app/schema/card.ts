import { Cards } from "../cards/cards";

export interface Card<Data = any, Settings = any> {
  id: string;
  type: string;

  data: Data;
  settings?: Settings;

  icon?: string;
  title?: string;
  color?: string;

  lastUpdate?: string;
  notifications?: boolean;
}