import { Controller, Get, Param, Query } from '@nestjs/common';
import { AirQualityService } from '../services/air-quality.service';

interface GetStationsQuery {
  lat?: string;
  lon?: string;
}

@Controller('air-quality')
export class AirQualityController {

  constructor(
    private airQualityService: AirQualityService
  ) { }

  @Get("/stations")
  getStations(@Query() query: GetStationsQuery) {
    const options = {
      coordinates: query.lat && query.lon ? { lat: Number(query.lat), lon: Number(query.lon) } : undefined,
    };
    return this.airQualityService.getStations(options);
  }

  @Get("/stations/:id")
  getStation(@Param("id") id: string) {
    return this.airQualityService.getStation(id);
  }
}
