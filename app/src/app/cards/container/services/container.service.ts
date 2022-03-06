import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { ContainerData } from "../schema/container-data";
import { ContainerHistoryData } from "../schema/container-history";

@Injectable({
  providedIn: "root",
})
export class ContainerService {
  constructor(private api: ApiService) {}

  async getContainer(id: string): Promise<ContainerData> {
    return this.api.get<ContainerData>(`containers/${id}`);
  }

  async getContainers(options: { search?: string; coordinates?: { lat: number; lon: number } }) {
    const params: any = {};

    if (options.search) params["q"] = options.search;

    if (options.coordinates) {
      params["lat"] = options.coordinates.lat;
      params["lon"] = options.coordinates.lon;
    }

    return this.api.get<ContainerData[]>("containers", params);
  }

  async getHistory(id: string, type: number, options: { since?: string } = {}) {
    return this.api.get<ContainerHistoryData[]>(`containers/${id}/${type}/history`, { since: options.since });
  }
}
