import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { GeolocationService } from "src/app/services/geolocation.service";
import { PlatformData } from "../schema/platform-data";
import { StopData } from "../schema/stop-data";

@Injectable({
  providedIn: "root",
})
export class StopsService {
  constructor(private api: ApiService, private geolocationService: GeolocationService) {}

  async getStops(options: { search?: string; coordinates?: { lat: number; lon: number } }) {
    const params: any = {};

    if (options.search) params["q"] = options.search;

    if (options.coordinates) {
      params["lat"] = options.coordinates.lat;
      params["lon"] = options.coordinates.lon;
    }

    return this.api.get<StopData[]>("stops", params);
  }

  async getStop(name: string) {
    return this.api.get<StopData>("stops/" + name);
  }

  async getClosestStop() {
    const position = await this.geolocationService.getCurrentPosition({ enableHighAccuracy: true });
    if (!position) return null;

    const params = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    return this.api.get<StopData>("stops/closest", params);
  }

  async getPlatform(id: string) {
    return this.api.get<PlatformData>("platforms/" + id);
  }
}
