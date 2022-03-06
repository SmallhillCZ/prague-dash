import { Injectable } from "@angular/core";
import { Geolocation } from "@capacitor/geolocation";
import { ApiService } from "src/app/services/api.service";
import { PlatformData } from "../schema/platform-data";
import { StopData } from "../schema/stop-data";

@Injectable({
  providedIn: "root",
})
export class StopsService {
  constructor(private api: ApiService) {}

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
    const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((res) => ({
      lat: res.coords.latitude,
      lon: res.coords.longitude,
    }));

    return this.api.get<StopData>("stops/closest", position);
  }

  async getPlatform(id: string) {
    return this.api.get<PlatformData>("platforms/" + id);
  }
}
