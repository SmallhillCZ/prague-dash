import { Feature, FeatureCollection } from "src/app/schema/golemio-api";
import { RouteTypeID } from "./route-type";

export type VehiclePosition = Feature<VehiclePositionProperties>;

export interface VehiclePositionProperties {
  last_position: {
    bearing: number;
    delay: { actual: number; last_stop_arrival: number; last_stop_departure: number };
    is_canceled: boolean;
    last_stop: {
      arrival_time: string;
      departure_time: string;
      id: string;
      sequence: number;
    };
    next_stop: {
      arrival_time: string;
      departure_time: string;
      id: string;
      sequence: number;
    };

    origin_timestamp: string;
    shape_dist_traveled: string;
    speed: null;
    state_position: "at_stop";
    tracking: boolean;
  };

  trip: {
    agency_name: { real: string; scheduled: string };
    cis: { line_id: unknown; trip_number: unknown };
    gtfs: {
      route_id: string;
      route_short_name: string;
      route_type: RouteTypeID;
      trip_headsign: string;
      trip_id: string;
      trip_short_name: unknown;
    };
    origin_route_name: string;
    sequence_id: number;
    start_timestamp: string;
    vehicle_registration_number: number;
    vehicle_type: { description_cs: string; description_en: string; id: number };
    wheelchair_accessible: boolean;
    air_conditioned: boolean;
  };

  all_positions: FeatureCollection<unknown>;
}
