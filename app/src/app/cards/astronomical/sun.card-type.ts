import { CardType } from "src/app/schema/card-type";
import { SunCardComponent } from "./components/sun-card/sun-card.component";
import { SunSettingsComponent } from "./components/sun-settings/sun-settings.component";
import { SunCard, SunCardDefinition } from "./schema/sun-card";

export const SunCardType: CardType<SunCard> = {
  type: "sunset",

  title: {
    "cs": "Západ a východ slunce"
  },

  component: SunCardComponent,
  defaultDefinition: new SunCardDefinition(),

  settingsComponent: SunSettingsComponent
};