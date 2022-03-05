import { CardType } from "src/app/schema/card-type";
import { CardContainerComponent } from "./components/card-container/card-container.component";
import { ContainerCard } from "./schema/container-card";

export const ContainerCardType: CardType<ContainerCard> = {
  type: "container",

  component: CardContainerComponent,

  title: {
    cs: "Tříděný odpad",
    en: "Sorted Waste",
  },
};
