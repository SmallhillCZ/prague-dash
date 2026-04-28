import { FeatureCollection } from "src/schema/geojson";

export enum AirQualityComponentType {
  "SO2" = "SO2",
  "NO2" = "NO2",
  "O3" = "O3",
  "PM10" = "PM10",
  "PM2_5" = "PM2_5",
}

export interface AirQualityStationComponent {
  _id: string;
  averaged_time: {
    averaged_hours: number;
    value: number;
  };
  type: AirQualityComponentType;
}

export interface AirQualityStationMeasurement {
  AQ_hourly_inde: number;
  components: AirQualityStationComponent[];
}

export interface AirQualityStationProperties {
  id: string;
  name: string;
  updated_at: string;
  district: string;
  measurement: AirQualityStationMeasurement;
}

export type AirQualityStationData = FeatureCollection<AirQualityStationProperties>;
