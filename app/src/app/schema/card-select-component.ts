import { EventEmitter } from "@angular/core";
import { Card } from "./card";
import { CardCreateData } from "./card-create-data";

export interface CardSelectComponentButton {
  icon: string;
  handler: () => void;
}

export interface CardSelectComponent<T extends Card = Card> {

  select: EventEmitter<CardCreateData<T>>;

  buttons?: EventEmitter<CardSelectComponentButton[]>;
}