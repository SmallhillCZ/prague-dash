import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetAirQualityStationResponse, GetAirQualityStationsQuery } from "../dto/air-quality.dto";
import { AirQualityService } from "../services/air-quality.service";

@Controller("air-quality")
@ApiTags("AirQuality")
export class AirQualityController {
  constructor(private airQualityService: AirQualityService) {}

  @Get("/stations")
  getStations(@Query() query: GetAirQualityStationsQuery): GetAirQualityStationResponse[] {
    const options = {
      q: query.q,
      coordinates: query.lat && query.lon ? { lat: query.lat, lon: query.lon } : undefined,
    };
    return this.airQualityService.getStations(options);
  }

  @Get("/stations/:id")
  getStation(@Param("id") id: string): GetAirQualityStationResponse {
    const station = this.airQualityService.getStation(id);
    if (!station) throw new NotFoundException("Air quality station not found.");

    return station;
  }
}
