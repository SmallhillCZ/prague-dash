import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { GeolocationService } from "src/app/services/geolocation.service";

@Injectable({
  providedIn: "root",
})
export class StopsService {
  constructor(
    private api: ApiService,
    private geolocationService: GeolocationService,
  ) {}

  async getStops(options: { search?: string; coordinates?: { lat: number; lon: number } }) {
    const params: any = {};

    if (options.search) params["q"] = options.search;

    if (options.coordinates) {
      params["lat"] = options.coordinates.lat;
      params["lon"] = options.coordinates.lon;
    }

    return this.api.PublicTransportApi.getStops(params).then((res) => res.data);
  }

  async getStop(name: string) {
    return this.api.PublicTransportApi.getStop(name).then((res) => res.data);
  }

  async getClosestStop() {
    const position = await this.geolocationService.getCurrentPosition({ enableHighAccuracy: true });
    if (!position) return null;

    const params = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    return this.api.PublicTransportApi.getClosestStop(params).then((res) => res.data);
  }

  async getPlatform(id: string) {
    return this.api.PublicTransportApi.getPlatform(id).then((res) => res.data);
  }
}
