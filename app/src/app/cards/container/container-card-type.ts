import { CardType } from "src/app/schema/card-type";
import { CardContainerComponent } from "./components/card-container/card-container.component";

export const ContainerCardType: CardType = {
  type: "container",

  component: CardContainerComponent,

  title: {
    cs: "Tříděný odpad",
    en: "Sorted Waste",
  },

  createUrl: "/container/add",
};
