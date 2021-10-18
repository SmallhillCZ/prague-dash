import { Controller, Get, Param, Query } from '@nestjs/common';
import { DepartureBoardsService, GetDepartureBoardOptions } from '../services/departure-boards.service';
import { StopsService } from '../services/stops.service';

export interface GetDepartureBoardsQuery {
  name: string | string[];
  id?: string | string[];
  limit?: string;
  offset?: string;
}

export interface GetClosestDepartureBoardsQuery {
  lat: string;
  lon: string;
  limit?: string;
  offset?: string;
}

@Controller('departure-boards')
export class DepartureBoardsController {

  constructor(
    private departureBoardsService: DepartureBoardsService,
    private stopsService: StopsService
  ) { };

  @Get("/")
  async getDepartureBoard(@Query() query?: GetDepartureBoardsQuery) {

    const options: GetDepartureBoardOptions = {
      name: query.name,
      id: query.id,
      limit: query.limit ? Number(query.limit) : undefined,
      offset: query.offset ? Number(query.offset) : undefined,
    };

    return this.departureBoardsService.getDepartureBoard(options);
  }

  @Get("/closest")
  async getClosestDepartureBoard(@Query() query?: GetClosestDepartureBoardsQuery) {

    const stopOptions = {
      lat: Number(query.lat),
      lon: Number(query.lon),
    };

    const closestStop = await this.stopsService.getClosestStop(stopOptions);

    const departureBoardOptions = {
      name: closestStop.name,
      limit: query.limit ? Number(query.limit) : undefined,
      offset: query.offset ? Number(query.offset) : undefined,
    };

    return this.departureBoardsService.getDepartureBoard(departureBoardOptions);
  }

}
