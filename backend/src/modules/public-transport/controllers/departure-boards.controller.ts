import { Controller, Get, NotFoundException, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DepartureBoardResponse } from "../dto/departure-board-response.dto";
import { GetClosestDepartureBoardsQuery, GetDepartureBoardsQuery } from "../dto/departure-boards.dto";
import { DepartureBoardsService, GetDepartureBoardOptions } from "../services/departure-boards.service";
import { StopsService } from "../services/stops.service";

@Controller("departure-boards")
@ApiTags("Public Transport")
export class DepartureBoardsController {
  constructor(
    private departureBoardsService: DepartureBoardsService,
    private stopsService: StopsService,
  ) {}

  @Get("/")
  async getDepartureBoard(@Query() query?: GetDepartureBoardsQuery): Promise<DepartureBoardResponse> {
    const options: GetDepartureBoardOptions = {
      name: query?.name,
      id: query?.id,
      limit: query?.limit ? Number(query?.limit) : undefined,
      offset: query?.offset ? Number(query?.offset) : undefined,
    };

    const board = await this.departureBoardsService.getDepartureBoard(options);
    if (!board) throw new NotFoundException();

    return board;
  }

  /**
   * @deprecated
   */
  @Get("/closest")
  async getClosestDepartureBoard(@Query() query?: GetClosestDepartureBoardsQuery): Promise<DepartureBoardResponse> {
    const coordinates = {
      lat: Number(query?.lat),
      lon: Number(query?.lon),
    };

    const closestStop = await this.stopsService.getStops({ coordinates, limit: 1 }).then((stops) => stops[0]);
    if (!closestStop) throw new NotFoundException();

    return this.getDepartureBoard({
      name: [closestStop.name],
      limit: query?.limit,
      offset: query?.offset,
    });
  }
}
