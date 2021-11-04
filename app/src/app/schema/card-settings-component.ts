import { EventEmitter } from "@angular/core";
import { Card } from "./card";

export interface CardSettingsComponent<CustomCard extends Card = Card> {
  card: CustomCard;

  change: EventEmitter<CustomCard["definition"]>;
}