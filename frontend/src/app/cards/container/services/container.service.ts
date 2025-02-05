import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Container, ContainersApiGetContainersQueryParams } from "src/sdk";

@Injectable({
  providedIn: "root",
})
export class ContainerService {
  constructor(private api: ApiService) {}

  async getContainer(id: string): Promise<Container> {
    return this.api.ContainersApi.getContainer(id).then((res) => res.data);
  }

  async getContainers(options: { search?: string; coordinates?: { lat: number; lon: number } }) {
    const params: ContainersApiGetContainersQueryParams = {};

    if (options.search) params["q"] = options.search;

    if (options.coordinates) {
      params["lat"] = options.coordinates.lat;
      params["lon"] = options.coordinates.lon;
    }

    return this.api.ContainersApi.getContainers(params).then((res) => res.data);
  }

  async getHistory(id: string, type: number, options: { since?: string } = {}) {
    return this.api.ContainersApi.getHistory(id, String(type), {
      since: options.since,
    }).then((res) => res.data);
  }
}
