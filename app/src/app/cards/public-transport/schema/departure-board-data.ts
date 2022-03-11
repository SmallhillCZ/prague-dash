import { RouteTypeID } from "./route-type";

export interface DepartureData {
  delay: {
    is_available: boolean;
    minutes: number;
    seconds: number;
  };

  arrival_timestamp: {
    predicted: string;
    scheduled: string;
  };
  departure_timestamp: {
    predicted: string;
    scheduled: string;
  };
  route: {
    is_night: boolean;
    is_regional: boolean;
    is_substitute_transport: boolean;
    short_name: string;
    type: RouteTypeID;
  };
  stop: {
    name: string;
    id: string;
    platform_code: string;
    is_wheelchair_accessible: number;
  };
  trip: {
    direction: string;
    headsign: string;
    id: string;
    is_at_stop: boolean;
    is_canceled: boolean;
    is_wheelchair_accessible: boolean;
    short_name: string;
  };
}

export interface DepartureStopData {
  level_id: string;
  location_type: number;
  parent_station: string;
  platform_code: string;
  stop_lat: number;
  stop_lon: number;
  asw_id: {
    node: number;
    stop: number;
  };
  stop_id: string;
  stop_name: string;
  wheelchair_boarding: number;
  zone_id: string;
}

export interface DepartureBoardData {
  departures: DepartureData[];
  stops: DepartureStopData[];
  infotexts: any[];
}
