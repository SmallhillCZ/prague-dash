import { BadRequestException, Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DateTime } from "luxon";
import { GetContainerHistoryQuery, GetContainersQuery, GetHistoryResponse } from "../dto/containers.dto";
import { Container } from "../entities/container.entity";
import { ContainersService, GetHistoryOptions } from "../services/containers.service";

@Controller("containers")
@ApiTags("Containers")
export class ContainersController {
  constructor(private containersService: ContainersService) {}

  @Get("/")
  async getContainers(@Query() query: GetContainersQuery): Promise<Container[]> {
    const containers = await this.containersService.getContainers({
      location: query.q,
      coordinates: !!query.lat && !!query.lon ? { lat: Number(query.lat), lon: Number(query.lon) } : undefined,
    });

    return containers;
  }

  @Get("/:id")
  async getContainer(@Param("id") id: string): Promise<Container> {
    const container = await this.containersService.getContainer(id);
    if (!container) throw new NotFoundException("Container not found.");

    return container;
  }

  @Get("/:id/:type/history")
  getHistory(
    @Param("id") id: string,
    @Param("type") type: string,
    @Query() query: GetContainerHistoryQuery,
  ): Promise<GetHistoryResponse[]> {
    const since = query.since && DateTime.fromISO(query.since);
    const monthAgo = DateTime.local().minus({ month: 1 });

    if (!since || !since.isValid) throw new BadRequestException("Parameter since invalid.");

    if (query.since && since < monthAgo) throw new BadRequestException("Parameter since more than a month ago.");

    const options: GetHistoryOptions = {
      containerId: id,
      type: parseInt(type),
      since: since!.isValid ? since.toJSDate() : monthAgo.toJSDate(),
    };

    return this.containersService.getHistory(options);
  }
}
