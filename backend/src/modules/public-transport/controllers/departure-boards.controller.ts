import { Controller, Get, NotFoundException, Query } from "@nestjs/common";
import { DepartureBoardResponse } from "../schema/departure-board-response";
import { DepartureBoardsService, GetDepartureBoardOptions } from "../services/departure-boards.service";
import { StopsService } from "../services/stops.service";

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

@Controller("departure-boards")
export class DepartureBoardsController {
  constructor(
    private departureBoardsService: DepartureBoardsService,
    private stopsService: StopsService,
  ) {}

  @Get("/")
  async getDepartureBoard(@Query() query?: GetDepartureBoardsQuery): Promise<DepartureBoardResponse[]> {
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
  async getClosestDepartureBoard(@Query() query?: GetClosestDepartureBoardsQuery): Promise<DepartureBoardResponse[]> {
    const coordinates = {
      lat: Number(query?.lat),
      lon: Number(query?.lon),
    };

    const closestStop = await this.stopsService.getStops({ coordinates, limit: 1 }).then((stops) => stops[0]);
    if (!closestStop) throw new NotFoundException();

    return this.getDepartureBoard({
      name: closestStop.name,
      limit: query?.limit,
      offset: query?.offset,
    });
  }
}
