import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import {
  ContainersService,
  GetHistoryOptions,
} from '../services/containers.service';

export interface GetContainersQuery {
  q: string;
  lat?: string;
  lon?: string;
}

@Controller('containers')
export class ContainersController {
  constructor(private containersService: ContainersService) {}

  @Get('/')
  getContainers(@Query() query: GetContainersQuery) {
    return this.containersService.getContainers({
      location: query.q,
      coordinates:
        !!query.lat && !!query.lon
          ? { lat: Number(query.lat), lon: Number(query.lon) }
          : undefined,
    });
  }

  @Get('/:id')
  getContainer(@Param('id') id: string) {
    return this.containersService.getContainer(id);
  }

  @Get('/:id/:type/history')
  getHistory(
    @Param('id') id: string,
    @Param('type') type: string,
    @Query() query: { since?: string },
  ) {
    const since = DateTime.fromISO(query.since);
    const monthAgo = DateTime.local().minus({ month: 1 });

    if (query.since && !since.isValid)
      throw new BadRequestException('Parameter since invalid.');
    if (query.since && since < monthAgo)
      throw new BadRequestException('Parameter since more than a month ago.');

    const options: GetHistoryOptions = {
      id,
      type: parseInt(type),
      since: since.isValid ? since.toJSDate() : monthAgo.toJSDate(),
    };

    return this.containersService.getHistory(options);
  }
}
