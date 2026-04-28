import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { AirQualityApiGetStationsQueryParams, GetAirQualityStationResponse } from "src/sdk";

@Injectable({
  providedIn: "root",
})
export class AirQualityService {
  constructor(private api: ApiService) {}

  async getAirQualityStation(id: string): Promise<GetAirQualityStationResponse> {
    return await this.api.AirQualityApi.getStation(id).then((res) => res.data);
  }

  async getAirQualityStations(options: { search?: string; coordinates?: { lat: number; lon: number } }) {
    const params: AirQualityApiGetStationsQueryParams = {};

    if (options.search) params["q"] = options.search;

    if (options.coordinates) {
      params["lat"] = options.coordinates.lat;
      params["lon"] = options.coordinates.lon;
    }

    return this.api.AirQualityApi.getStations(params);
  }
}
