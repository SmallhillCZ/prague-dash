import { Feature, FeatureCollection } from "src/shared/schema/golemio-api";

export type VehiclePositionResponse = Feature<VehiclePositionProperties>;

export interface VehiclePositionProperties {

  last_position: {
    bearing: null | number;
    delay: {
      actual?: null | number;
      last_stop_arrival?: null | number;
      last_stop_departure?: null | number;

    };
    last_stop: {
      id: null | string;
      sequence: null | number;
      arrival_time: null | string;
      departure_time: null | string;

    };
    next_stop: {
      id: null | string;
      sequence: null | number;
      arrival_time: null | string;
      departure_time: null | string;

    };

    is_canceled: null | boolean;
    origin_timestamp: string;
    speed?: null | number;
    shape_dist_traveled?: null | string;
    tracking: boolean;

  };

  all_positions: FeatureCollection<unknown>;

  trip: {
    agency_name: {
      real: string;
      scheduled: string;
    };

    cis: {
      line_id: string;
      trip_number: number;
    };

    sequence_id: number;
    origin_route_name: string;

    gtfs: {
      route_id: string;
      route_short_name: string;
      route_type: number;
      trip_id: string;
      trip_headsign?: null | string;

    };

    start_timestamp: string;
    vehicle_type: {
      id: number;
      description_cs: string;
      description_en: string;

    };
    vehicle_registration_number: number;
    wheelchair_accessible: boolean;

  };



};