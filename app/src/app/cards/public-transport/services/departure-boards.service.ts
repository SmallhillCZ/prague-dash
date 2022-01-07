import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { DepartureBoardData } from '../schema/departure-board-data';

export interface LoadDeparturesOptions {
  allPlatforms: boolean;
  name: string;
  platforms: { [id: string]: boolean; };
  limit: number;
  offset?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DepartureBoardsService {

  constructor(
    private api: ApiService
  ) { }

  async loadDepartures(options: LoadDeparturesOptions) {
    // const options = {

    // };
    // if (options.allPlatforms) {
    //   return this.getDepartureBoard({ name: definition.name, limit: definition.limit, offset: definition.offset });
    // }
    // else {
    //   const id = 
    //   return await this.getDepartureBoard({ name: definition.name, id, limit: definition.limit, offset: definition.offset });
    // }
    const params = {
      name: options.name,
      id: options.allPlatforms ? undefined : Object.entries(options.platforms).filter(entry => !!entry[1]).map(entry => entry[0]),
      limit: options.limit,
      offset: options.offset,
    };
    return this.api.get<DepartureBoardData>("departure-boards", params);
  }
}
