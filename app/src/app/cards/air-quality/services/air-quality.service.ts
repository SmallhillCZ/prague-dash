import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AirQualityStationData } from '../schema/air-quality-station-data';

@Injectable({
  providedIn: 'root'
})
export class AirQualityService {

  constructor(
    private api: ApiService,
  ) { }

  async getAirQualityStation(id: string): Promise<AirQualityStationData> {
    return await this.api.get<AirQualityStationData>(`air-quality/stations/${id}`);
  }

  async getAirQualityStations(options: { search?: string, coordinates?: { lat: number, lon: number; }; }) {
    const params: any = {};

    if (options.search) params["q"] = options.search;

    if (options.coordinates) {
      params["lat"] = options.coordinates.lat;
      params["lon"] = options.coordinates.lon;
    }

    return this.api.get<AirQualityStationData[]>("air-quality/stations", params);
  }

}
