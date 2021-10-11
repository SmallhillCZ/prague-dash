import { CardType } from "src/app/schema/card-meta";
import { DepartureBoardCardComponent } from "./components/departure-board-card/departure-board-card.component";
import { DepartureBoardSelectComponent } from "./components/departure-board-select/departure-board-select.component";
import { DepartureBoardSettingsComponent } from "./components/departure-board-settings/departure-board-settings.component";

export const DepartureBoardsCardType: CardType = {

  type: "departure-board",

  title: {
    cs: "Odjezdové tabule",
    en: "Departure boards"
  },

  component: DepartureBoardCardComponent,
  selectComponent: DepartureBoardSelectComponent,
  settingsComponent: DepartureBoardSettingsComponent
};