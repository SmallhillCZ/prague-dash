import { CardType } from "src/app/schema/card-type";
import { CardAirQualityStationComponent } from "./components/card-air-quality-station/card-air-quality-station.component";

export const AirQualityStationCardType: CardType = {
  type: "air-quality-station",

  component: CardAirQualityStationComponent,

  title: {
    cs: "Kvalita vzduchu",
    en: "Air Quality",
  },

  createUrl: "/air-quality/add",
};
