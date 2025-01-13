import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { StopsService } from '../services/stops.service';

@Controller('platforms')
export class PlatformsController {
  constructor(private stopsService: StopsService) {}

  @Get(':id')
  async getPlatform(@Param('id') id: string) {
    const platform = await this.stopsService.getPlatform({ id });
    if (!platform) throw new NotFoundException();
    return platform;
  }
}
