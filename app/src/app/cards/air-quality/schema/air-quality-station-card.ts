import { Card } from "src/app/schema/card";

export interface AirQualityStationCardDefinition {
  id: string;
}

export type AirQualityStationCard = Card<AirQualityStationCardDefinition>;