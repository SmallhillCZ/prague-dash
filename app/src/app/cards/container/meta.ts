import { CardMeta } from "src/app/schema/card-meta";
import { CardContainerSelectComponent } from "./components/card-container-select/card-container-select.component";
import { CardContainerComponent } from "./components/card-container/card-container.component";

export const ContainerCardMeta: CardMeta = {
  id: "container",

  component: CardContainerComponent,
  selectComponent: CardContainerSelectComponent,
  settingsComponent: undefined,

  title: {
    "cs": "Tříděný odpad",
    "en": "Sorted Waste"
  },
  icon: "trash-outline"
};