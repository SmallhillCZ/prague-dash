import { Injectable } from '@nestjs/common';
import { GolemioService } from 'src/shared/services/golemio.service';
import { DepartureBoardResponse } from '../schema/departure-board-response';

export interface GetDepartureBoardOptions {
  name?: string | string[];
  id?: string | string[];
  limit?: number;
}

@Injectable()
export class DepartureBoardsService {

  constructor(
    private golemio: GolemioService
  ) { }

  async getDepartureBoard(options: GetDepartureBoardOptions) {

    if (!options.name && !options.id) {
      throw new Error("You have to select name or id");
    }

    const params = {
      names: typeof options.name === "string" ? [options.name] : options.name,
      ids: typeof options.id === "string" ? [options.id] : options.id,
      // filter: "routeHeadingOnce",
      skip: ["canceled"],
      limit: options.limit ? Math.min(options.limit, 20) : 5
    };

    return this.golemio.get<DepartureBoardResponse[]>("pid/departureboards", params)
      .then(res => res.data);
  }


}
