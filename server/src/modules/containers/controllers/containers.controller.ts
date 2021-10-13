import { Controller, Get, Param, Query } from '@nestjs/common';
import { ContainersService } from '../services/containers.service';

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
}
