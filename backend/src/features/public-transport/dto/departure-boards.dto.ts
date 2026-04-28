import { IsNumber, IsOptional, IsString } from "class-validator";
import { TransformArray } from "src/helpers/helpers/validation";

export class GetDepartureBoardsQuery {
  @TransformArray() @IsString({ each: true }) @IsOptional() name?: string[];
  @TransformArray() @IsString({ each: true }) @IsOptional() id?: string[];
  @IsNumber() @IsOptional() limit?: number;
  @IsNumber() @IsOptional() offset?: number;
}

export class GetClosestDepartureBoardsQuery {
  @IsNumber() lat!: number;
  @IsNumber() lon!: number;
  @IsNumber() limit?: number;
  @IsNumber() offset?: number;
}

import { GolemioPublicTransportApi } from "golemio-sdk";

export class DepartureBoardResponse implements GolemioPublicTransportApi.PIDDepartureBoard {
  departures?: DepartureBoardItem[];
}

export class DepartureBoardItem implements GolemioPublicTransportApi.PIDDepartureBoardDeparture {
  delay?: {
    is_available: boolean;
    minutes: number | null;
    seconds: number | null;
  };

  arrival_timestamp?: {
    predicted: string;
    scheduled: string;
  };

  departure_timestamp?: {
    predicted: string;
    scheduled: string;
  };

  route?: {
    type: number | null;
    short_name: string | null;
    is_night: boolean;
    is_regional: boolean;
    is_substitute_transport: boolean;
  };

  stop?: {
    id: string;
    platform_code: string | null;
  };

  trip?: {
    headsign: string;
    id: string;
    is_canceled: boolean;
    is_wheelchair_accessible: boolean;
    direction: string | null;
    is_at_stop: boolean;
    is_air_conditioned: boolean | null;
    short_name: string | null;
  };
}
