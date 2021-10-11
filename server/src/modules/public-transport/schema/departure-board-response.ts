export interface DepartureBoardResponse {

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
    name: string,
    type: number;
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