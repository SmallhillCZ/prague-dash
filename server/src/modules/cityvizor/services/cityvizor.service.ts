import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { coordinatesToDistanceCompare } from 'src/utils/coordinates-to-distance-compare';
import { CityvizorProfiles } from '../schema/cityvizor';

export interface GetProfilesOptions {
  coords?: {
    lat: number;
    lon: number;
  };
}

@Injectable()
export class CityvizorService {

  private logger = new Logger(CityvizorService.name);

  private cityvizorRoot = "https://cityvizor.cz/api";

  constructor() {
    this.getProfiles();
  }

  async getProfiles(options: GetProfilesOptions = {}) {
    const profiles = await axios.get<CityvizorProfiles[]>(this.cityvizorRoot + "/exports/profiles").then(res => res.data);

    if (options.coords) {
      profiles.sort((a, b) => coordinatesToDistanceCompare({ lat: a.gpsY, lon: a.gpsX }, { lat: b.gpsY, lon: b.gpsX }, options.coords));
    }

    return profiles;
  }

  // TODO:
  async getPayments(profile: number, year: number, limit: number, options = {}) {
    const payments = axios.get(this.cityvizorRoot + `/exports/profiles/${profile}/payments/${year}`);
  }
}
