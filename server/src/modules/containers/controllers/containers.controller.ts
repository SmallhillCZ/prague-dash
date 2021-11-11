import { Controller, Get, Param, Query } from '@nestjs/common';
import { ContainersService, GetHistoryOptions } from '../services/containers.service';
import { DateTime } from "luxon";

export interface GetContainersQuery {
  q: string;
  lat?: string;
  lon?: string;
}

@Controller('containers')
export class ContainersController {

  constructor(
    private containersService: ContainersService
  ) {

  }

  @Get("/")
  getContainers(@Query() query: GetContainersQuery) {
    return this.containersService.getContainers({
      location: query.q,
      coordinates: (!!query.lat && !!query.lon) ? { lat: Number(query.lat), lon: Number(query.lon) } : undefined,
    });
  }

  @Get("/:id")
  getContainer(@Param("id") id: string) {
    return this.containersService.getContainer(id);
  }

  @Get("/:id/history")
  getHistory(@Param("id") id: string, @Query() query: { since?: string; }) {

    const since = DateTime.fromISO(query.since);
    const monthAgo = DateTime.local().minus({ month: 1 });

    const options: GetHistoryOptions = {
      id,
      since: since.isValid && since > monthAgo ? since.toJSDate() : monthAgo.toJSDate()
    };

    return this.containersService.getHistory(options);
  }
}
