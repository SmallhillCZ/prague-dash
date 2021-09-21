import { CardTramSettingsComponent } from "./components/card-tram-settings/card-tram-settings.component";
import { CardTramComponent } from "./components/card-tram/card-tram.component";
import { CardContainerComponent } from "./components/card-container/card-container.component";
import { CardParkingComponent } from "./components/card-parking/card-parking.component";

export interface CardComponent {
  data: any;
}

export interface CardSettingsComponent {
  data: any;
}

export interface CardMeta {
  component: new () => CardComponent;
  settingsComponent?: new () => CardSettingsComponent;
}

const asCardsMeta = <T>(cards: { [key in keyof T]: CardMeta; }) => cards;

export const Cards = asCardsMeta({
  "tram": { component: CardTramComponent, settingsComponent: CardTramSettingsComponent },
  "container": { component: CardContainerComponent, settingsComponent: undefined },
  "parking": { component: CardParkingComponent, settingsComponent: undefined }
});