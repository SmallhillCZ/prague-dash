import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CityvizorService, GetProfilesOptions } from "../services/cityvizor.service";

interface GetProfilesQuery {
  lat?: number;
  lon?: number;
}

@Controller("cityvizor/profiles")
@ApiTags("CityVizor")
export class ProfilesController {
  constructor(private cityvizor: CityvizorService) {}

  @Get("")
  getProfiles(@Query() query: GetProfilesQuery) {
    const options: GetProfilesOptions = {};

    if (query.lat && query.lon) options.coords = { lat: query.lat, lon: query.lon };

    return this.cityvizor.getProfiles(options);
  }
}
