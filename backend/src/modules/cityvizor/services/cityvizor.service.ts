import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { coordinatesToDistanceCompare } from 'src/utils/coordinates-to-distance-compare';
import { CityvizorPayment, CityvizorProfiles } from '../schema/cityvizor';

export class GetProfilesOptions {
  coords?: {
    lat: number;
    lon: number;
  };
}

export class GetPaymentsOptions {
  profile: number;
  year: number;
  limit: number = 10;
}

@Injectable()
export class CityvizorService {

  private logger = new Logger(CityvizorService.name);

  private cityvizorRoot = "https://cityvizor.cz/api";

  constructor() {
    this.getProfiles();
  }

  async getProfiles(options: GetProfilesOptions = {}) {

    options = Object.assign(new GetProfilesOptions(), options);

    const profiles = await axios.get<CityvizorProfiles[]>(this.cityvizorRoot + "/exports/profiles").then(res => res.data);

    if (options.coords) {
      profiles.sort((a, b) => coordinatesToDistanceCompare({ lat: a.gpsY, lon: a.gpsX }, { lat: b.gpsY, lon: b.gpsX }, options.coords));
    }

    return profiles;
  }

  // TODO:
  async getPayments(options: GetPaymentsOptions) {

    options = Object.assign(new GetPaymentsOptions(), options);

    const payments = await axios.get<CityvizorPayment[]>(this.cityvizorRoot + `/exports/profiles/${options.profile}/payments/${options.year}`).then(res => res.data);

    payments.sort((a, b) => (a.date && b.date) ? a.date.localeCompare(b.date) : 0);

    return payments.slice((-1) * options.limit);
  }
}
