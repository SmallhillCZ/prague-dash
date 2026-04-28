import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StopsService } from "../services/stops.service";

@Controller("platforms")
@ApiTags("Public Transport")
export class PlatformsController {
  constructor(private stopsService: StopsService) {}

  @Get(":id")
  async getPlatform(@Param("id") id: string) {
    const platform = await this.stopsService.getPlatform({ id });
    if (!platform) throw new NotFoundException();
    return platform;
  }
}
