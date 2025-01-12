import { AirQualityComponentType } from "./air-quality-station-data";

export interface AirQualityComponent {
  name: string;
  limit?: number;
}

export const AirQualityComponents: { [key in AirQualityComponentType]: AirQualityComponent } = {
  "NO2": {
    name: "NO₂",
    limit: 200
  },
  "O3": {
    name: "O₃",
    limit: 120
  },
  "PM10": {
    name: "PM10",
    limit: 50
  },
  "PM2_5": {
    name: "PM2,5"
  },
  "SO2": {
    name: "SO₂",
    limit: 350
  },
};
