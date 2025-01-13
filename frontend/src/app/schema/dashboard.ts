import { ArrayNotEmpty, ValidateNested } from "class-validator";
import { Card } from "./card";

export class Dashboard {
  @ArrayNotEmpty() @ValidateNested({ each: true }) pages!: [DashboardPage, ...DashboardPage[]];
}

export class DashboardPage {
  id!: string;
  cards!: Card[];
  title?: string;
}
