import { EventEmitter } from "@angular/core";
import { CreateCardOptions } from "./create-card-options";

export interface CardSelectComponentButton {
  icon: string;
  handler: () => void;
}

export interface CardSelectComponent {

  select: EventEmitter<CreateCardOptions>;

  buttons?: EventEmitter<CardSelectComponentButton[]>;
}