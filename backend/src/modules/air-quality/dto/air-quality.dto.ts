import { IsNumber, IsOptional, IsString } from "class-validator";
import { GolemioApi } from "golemio-sdk";

export class GetAirQualityStationsQuery {
  @IsString() @IsOptional() q?: string;
  @IsNumber() @IsOptional() lat?: number;
  @IsNumber() @IsOptional() lon?: number;
}

export class GetAirQualityStationResponse_AveragedTime implements GolemioApi.AirQualityStationComponentAveragedTime {
  averaged_hours?: number;
  value?: number;
}

export class GetAirQualityStationResponse_Component implements GolemioApi.AirQualityStationComponent {
  averaged_time?: GetAirQualityStationResponse_AveragedTime;
  type?: string | undefined;
}

export class GetAirQualityStationResponse_Mesurement implements GolemioApi.AirQualityStationMeasurement {
  AQ_hourly_index?: number | undefined;
  components?: GetAirQualityStationResponse_Component[] | undefined;
}

export class GetAirQualityStationResponse_Properties implements GolemioApi.AirQualityStation {
  id!: string;
  name!: string;
  district?: string | undefined;
  measurement?: GetAirQualityStationResponse_Mesurement;
  updated_at?: string | undefined;
}

export class GetAirQualityStationResponse_Geometry implements GolemioApi.FeaturePointGeometry {
  type!: string;
  coordinates!: number[];
}

export class GetAirQualityStationResponse implements GolemioApi.FeaturePoint {
  type!: string;
  geometry!: GetAirQualityStationResponse_Geometry;
  properties!: GetAirQualityStationResponse_Properties;
}
