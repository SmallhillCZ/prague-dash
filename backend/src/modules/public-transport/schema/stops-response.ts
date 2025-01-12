import { FeatureCollection } from "src/shared/schema/golemio-api";

export interface StopProperties {
  location_type: number;
  parent_station: string;
  platform_code: string;
  stop_id: string;
  stop_name: string;
  wheelchair_boarding: number;
  zone_id: string;
}

export type StopsResponse = FeatureCollection<StopProperties>;
