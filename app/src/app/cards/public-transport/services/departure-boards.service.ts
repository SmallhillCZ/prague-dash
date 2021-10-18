import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { DepartureBoardData } from '../schema/departure-board-data';
import { Geolocation } from '@capacitor/geolocation';
import { DepartureBoardCardDefinition } from '../schema/departure-board-card';

@Injectable({
  providedIn: 'root'
})
export class DepartureBoardsService {

  constructor(
    private api: ApiService
  ) { }

  async getDepartureBoard(params: { name: string, id?: string[], limit?: number, offset?: number; }) {
    return this.api.get<DepartureBoardData>("departure-boards", params);
  }
  async getClosestDepartureBoard(params: { lat: number, lon: number, limit?: number, offset?: number; }) {
    return this.api.get<DepartureBoardData>("departure-boards/closest", params);
  }

  async loadDepartures(definition: { allPlatforms: boolean, name: string | null, platforms: { [id: string]: boolean; }, limit: number, offset?: number; }) {
    if (definition.allPlatforms && definition.name) {
      return this.getDepartureBoard({ name: definition.name, limit: definition.limit, offset: definition.offset });
    }
    else if (!definition.allPlatforms && definition.name) {
      const id = Object.entries(definition.platforms).filter(entry => !!entry[1]).map(entry => entry[0]);
      return await this.getDepartureBoard({ name: definition.name, id, limit: definition.limit, offset: definition.offset });
    }
    else {
      const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then(res => ({ lat: res.coords.latitude, lon: res.coords.longitude }));
      return await this.getClosestDepartureBoard({ ...position, limit: definition.limit, offset: definition.offset });
    }
  }
}
