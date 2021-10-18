import { CardComponent } from "./card-component";
import { CardDetailComponent } from "./card-detail-component";
import { CardSelectComponent } from "./card-select-component";
import { CardSettingsComponent } from "./card-settings-component";
import { LanguageValue } from "./language";

export interface CardType {
  type: string;
  component: new (...args: any[]) => CardComponent;
  detailComponent?: new (...args: any[]) => CardDetailComponent;
  selectComponent?: new (...args: any[]) => CardSelectComponent;
  settingsComponent?: new (...args: any[]) => CardSettingsComponent;

  title: LanguageValue<string>;
}

