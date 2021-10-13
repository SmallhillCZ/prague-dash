import { Controller, Get, Param, Query } from '@nestjs/common';
import { StopsService } from '../services/stops.service';

export interface GetStopsQuery {
  q?: string,
  lat?: string,
  lon?: string,
  offset?: string;
}

@Controller('stops')
export class StopsController {

  constructor(
    private stopsService: StopsService
  ) { };

  @Get("/")
  async getStops(@Query() query?: GetStopsQuery) {

    const options = {
      name: query.q,
      offset: query.offset ? Number(query.offset) : undefined,
      coordinates: (!!query.lat && !!query.lon) ? { lat: Number(query.lat), lon: Number(query.lon) } : undefined,
    };

    return this.stopsService.getStops(options);
  }

  @Get("/:name")
  async getStop(@Param() name: string) {
    return this.stopsService.getStops({ name });
  }
}
