import { Card } from "./card";
import { CardComponent } from "./card-component";
import { CardDetailComponent } from "./card-detail-component";
import { CardSelectComponent } from "./card-select-component";
import { CardSettingsComponent } from "./card-settings-component";
import { LanguageValue } from "./language";

export interface CardType<C extends Card = Card> {
  type: C["type"];

  component: new (...args: any[]) => CardComponent;
  detailComponent?: new (...args: any[]) => CardDetailComponent;
  selectComponent?: new (...args: any[]) => CardSelectComponent<C>;
  settingsComponent?: new (...args: any[]) => CardSettingsComponent;

  defaultDefinition?: any;

  title: LanguageValue<string>;
}

