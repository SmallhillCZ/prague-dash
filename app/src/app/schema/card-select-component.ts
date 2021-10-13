import { EventEmitter } from "@angular/core";
import { Card } from "./card";

export interface CardSelectComponentButton {
  icon: string;
  handler: () => void;
}

export interface CardSelectComponent {

  select: EventEmitter<Card["definition"]>;

  buttons?: EventEmitter<CardSelectComponentButton[]>;
}