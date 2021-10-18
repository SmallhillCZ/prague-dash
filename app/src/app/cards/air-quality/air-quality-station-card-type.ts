import { CardType } from "src/app/schema/card-type";
import { CardAirQualityStationSelectComponent } from "./components/card-air-quality-station-select/card-air-quality-station-select.component";
import { CardAirQualityStationComponent } from "./components/card-air-quality-station/card-air-quality-station.component";

export const AirQualityStationCardType: CardType = {
  type: "air-quality-station",

  component: CardAirQualityStationComponent,
  selectComponent: CardAirQualityStationSelectComponent,

  title: {
    "cs": "Kvalita vzduchu",
    "en": "Air Quality"
  },
};