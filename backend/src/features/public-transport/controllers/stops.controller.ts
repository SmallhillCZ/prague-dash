import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetClosestStopQuery, GetStopsQuery } from "../dto/stops.dto";
import { StopsService } from "../services/stops.service";

@Controller("stops")
@ApiTags("Public Transport")
export class StopsController {
  constructor(private stopsService: StopsService) {}

  @Get("/")
  async getStops(@Query() query: GetStopsQuery) {
    const options = {
      name: query?.q,
      offset: query?.offset,
      limit: query?.limit,
      coordinates: !!query?.lat && !!query.lon ? { lat: query.lat, lon: query.lon } : undefined,
    };

    return this.stopsService.getStops(options);
  }

  @Get("/closest")
  async getClosestStop(@Query() query: GetClosestStopQuery) {
    const stop = await this.getStops({ ...query, limit: 1 }).then((stops) => stops[0]);
    if (!stop) throw new NotFoundException();
    return stop;
  }

  @Get("/:name")
  async getStop(@Param("name") name: string) {
    const stop = await this.stopsService.getStop({ name });
    if (!stop) throw new NotFoundException();
    return stop;
  }
}
