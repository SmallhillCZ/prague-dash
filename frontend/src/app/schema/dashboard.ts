import { Card } from "./card";

export interface Dashboard {
  pages: [DashboardPage, ...DashboardPage[]];
}


export interface DashboardPage {
  id: string;
  cards: Card[];
  title?: string;
}