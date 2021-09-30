import { EventEmitter } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { Card } from "./card";

export interface CardSettingsComponent {
  card: Card;

  change: EventEmitter<any>;
}