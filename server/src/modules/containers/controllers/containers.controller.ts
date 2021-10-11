import { Controller, Get, Param, Query } from '@nestjs/common';
import { ContainersService } from '../services/containers.service';

export interface GetContainersQuery {
  q: string;
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
      location: query.q
    });
  }

  @Get("/:id")
  getContainer(@Param("id") id: string) {
    return this.containersService.getContainer(id);
  }
}
