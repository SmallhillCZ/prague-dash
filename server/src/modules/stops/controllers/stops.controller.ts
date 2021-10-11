import { Controller, Get, Param } from '@nestjs/common';
import { StopsService } from '../services/stops.service';

@Controller('stops')
export class StopsController {

  constructor(
    private stopsService: StopsService
  ) { };

  @Get("/")
  async stops() {
    return this.stopsService.getStops();
  }

  @Get("/:id")
  async stop(@Param("id") id: string) {
    return this.stopsService.getStop(id);
  }
}
