import { EventEmitter } from "@angular/core";
import { Card } from "./card";

export interface CardSettingsComponent {
  card: Card;

  change: EventEmitter<any>;
}