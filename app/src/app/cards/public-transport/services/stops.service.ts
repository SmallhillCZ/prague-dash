import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { StopData } from '../schema/stop-data';


@Injectable({
  providedIn: 'root'
})
export class StopsService {

  constructor(
    private api: ApiService
  ) { }

  async getStops(options: { search?: string; coordinates?: { lat: number, lon: number; }; }) {
    const params: any = {};

    if (options.search) params["q"] = options.search;

    if (options.coordinates) {
      params["lat"] = options.coordinates.lat;
      params["lon"] = options.coordinates.lon;
    }

    return this.api.get<StopData[]>("stops", params);
  }

  async getStop(options: { name: string; }) {
    return this.api.get<StopData>("stops/" + options.name);
  }
}
