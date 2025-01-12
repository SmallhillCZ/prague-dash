import { UrlTree } from "@angular/router";
import { CardComponent } from "./card-component";
import { LanguageValue } from "./language";

export interface CardType {
  type: string;

  title: LanguageValue<string>;

  component: new (...args: any[]) => CardComponent;

  createUrl?: string;
}
