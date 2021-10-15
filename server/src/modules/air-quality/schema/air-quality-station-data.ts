import { FeatureCollection } from "src/shared/schema/golemio-api";

export interface AirQualityStationComponent {
  _id: string;
  averaged_time: {
    averaged_hours: number,
    value: number;
  },
  type: "NO2" | "PM10";
}

export interface AirQualityStationMeasurement {
  AQ_hourly_inde: number;
  component: AirQualityStationComponent[];
}


export interface AirQualityStationProperties {
  id: string;
  name: string;
  updated_at: string;
  district: string;
  measurement: AirQualityStationMeasurement;

}

export type AirQualityStationData = FeatureCollection<AirQualityStationProperties>;