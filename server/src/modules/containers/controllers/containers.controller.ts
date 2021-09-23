import { Controller, Get, Param } from '@nestjs/common';
import { ContainersService } from '../services/containers.service';

@Controller('containers')
export class ContainersController {

  constructor(
    private containersService: ContainersService
  ) {

  }

  @Get("/")
  getContainers() {
    return this.containersService.getContainers();
  }

  @Get("/:id")
  getContainer(@Param("id") id: string) {
    return this.containersService.getContainer(id);
  }
}
