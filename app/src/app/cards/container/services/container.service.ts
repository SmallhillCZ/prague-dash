import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ContainerData } from '../schema/container-data';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(
    private api: ApiService,
  ) {
  }

  async getContainer(id: string): Promise<ContainerData> {
    return await this.api.get<ContainerData>(`containers/${id}`);
  }

  async getContainers(options: { search?: string, coordinates?: { lat: number, lon: number; }; }) {
    const params: any = {};

    if (options.search) params["q"] = options.search;

    if (options.coordinates) {
      params["lat"] = options.coordinates.lat;
      params["lon"] = options.coordinates.lon;
    }

    return this.api.get<ContainerData[]>("containers", params);
  }

}
