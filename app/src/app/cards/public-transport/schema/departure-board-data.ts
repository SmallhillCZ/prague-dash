export interface DepartureData {

  delay: {
    is_available: boolean,
    minutes: number,
    seconds: number;
  };

  arrival_timestamp: {
    predicted: string,
    scheduled: string;
  },
  departure_timestamp: {
    predicted: string,
    scheduled: string,
  },
  route: {
    is_night: boolean,
    is_regional: boolean,
    is_substitute_transport: boolean,
    short_name: string,
    type: number,
  },
  stop: {
    name: string,
    id: string,
    platform_code: string,
    is_wheelchair_accessible: number;
  },
  trip: {
    headsign: string,
    id: string,
    is_canceled: boolean,
    is_wheelchair_accessible: 1;
  };
}

export interface DepartureBoardData {
  departures: DepartureData[];
  stops: any[];
  infotexts: any[];
}