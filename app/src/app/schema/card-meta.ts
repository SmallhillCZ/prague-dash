import { Language } from "src/app/schema/language";
import { CardComponent } from "./card-component";
import { CardSelectComponent } from "./card-select-component";
import { CardSettingsComponent } from "./card-settings-component";

export interface CardMeta {
  id: string;
  component: new (...args: any[]) => CardComponent;
  selectComponent?: new (...args: any[]) => CardSelectComponent;
  settingsComponent?: new (...args: any[]) => CardSettingsComponent;

  title: { [lang in Language]: string };
  icon?: string;
}