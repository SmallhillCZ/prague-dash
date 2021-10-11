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

  async getContainers(options: { search?: string; }) {
    const params: any = {};

    if (options.search) params["q"] = options.search;

    return this.api.get<ContainerData[]>("containers", params);
  }

}
