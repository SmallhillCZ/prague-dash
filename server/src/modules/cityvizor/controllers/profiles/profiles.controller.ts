import { Controller, Get, Param, Query } from '@nestjs/common';
import { get } from 'http';
import { CityvizorService, GetProfilesOptions } from '../../services/cityvizor.service';

interface GetProfilesQuery {
  lat?: number;
  lon?: number;
}

@Controller('cityvizor/profiles')
export class ProfilesController {

  constructor(
    private cityvizor: CityvizorService
  ) { }

  @Get("")
  getProfiles(@Query() query: GetProfilesQuery) {
    const options: GetProfilesOptions = {};

    if (query.lat && query.lon) options.coords = { lat: query.lat, lon: query.lon };

    return this.cityvizor.getProfiles(options);
  }

  @Get(":profile/payments")
  getPayments(@Param("profile") profile: string) {

  }
}
