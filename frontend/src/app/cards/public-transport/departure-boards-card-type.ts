import { CardType } from "src/app/schema/card-type";
import { DepartureBoardCardComponent } from "./components/departure-board-card/departure-board-card.component";

export const DepartureBoardsCardType: CardType = {
  type: "departure-board",

  title: {
    cs: "Zastávková tabule",
    en: "Departure board",
  },

  component: DepartureBoardCardComponent,

  createUrl: "/public-transport/departure-boards/select",
};
