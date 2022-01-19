import { CardType } from "src/app/schema/card-type";
import { DepartureBoardCardComponent } from "./components/departure-board-card/departure-board-card.component";
import { DepartureBoardDetailComponent } from "./components/departure-board-detail/departure-board-detail.component";
import { DepartureBoardSelectComponent } from "./components/departure-board-select/departure-board-select.component";
import { DepartureBoardSettingsComponent } from "./components/departure-board-settings/departure-board-settings.component";
import { DepartureBoardCard } from "./schema/departure-board-card";

export const DepartureBoardsCardType: CardType<DepartureBoardCard> = {

  type: "departure-board",

  title: {
    cs: "Zastávková tabule",
    en: "Departure board"
  },

  component: DepartureBoardCardComponent,
  selectComponent: DepartureBoardSelectComponent,
  settingsComponent: DepartureBoardSettingsComponent,
  detailComponent: DepartureBoardDetailComponent,

  selectUrl: "/public-transport/depature-boards/select"
};