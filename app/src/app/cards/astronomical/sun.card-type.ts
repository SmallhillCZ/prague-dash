import { CardType } from "src/app/schema/card-type";
import { SunCardComponent } from "./components/sun-card/sun-card.component";

export const SunCardType: CardType = {
  type: "sunset",

  title: {
    cs: "Západ a východ slunce",
  },

  component: SunCardComponent,
};
