import { Card } from "./card";
import { CardComponent } from "./card-component";
import { LanguageValue } from "./language";

export interface CardType<C extends Card = Card> {
  type: C["type"];

  component: new (...args: any[]) => CardComponent;

  defaultDefinition?: any;

  title: LanguageValue<string>;
}
