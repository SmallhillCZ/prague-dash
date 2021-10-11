import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { DepartureBoardData, DepartureData } from '../schema/departure-board-data';

@Injectable({
  providedIn: 'root'
})
export class DepartureBoardsService {

  constructor(
    private api: ApiService
  ) { }

  async getDepartureBoard(params: { name: string, id?: string[], limit?: number; }) {
    return this.api.get<DepartureBoardData>("departure-boards", params);
  }
  async getClosestDepartureBoard(params: { lat: number, lon: number, limit?: number; }) {
    return this.api.get<DepartureBoardData>("departure-boards/closest", params);
  }
}
