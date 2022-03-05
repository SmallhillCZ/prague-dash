import { CardType } from "src/app/schema/card-type";
import { DepartureBoardCardComponent } from "./components/departure-board-card/departure-board-card.component";
import { DepartureBoardCard } from "./schema/departure-board-card";

export const DepartureBoardsCardType: CardType<DepartureBoardCard> = {
  type: "departure-board",

  title: {
    cs: "Zastávková tabule",
    en: "Departure board",
  },

  component: DepartureBoardCardComponent,
};
