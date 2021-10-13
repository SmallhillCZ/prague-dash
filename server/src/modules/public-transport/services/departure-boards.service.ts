import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Stop } from '../entities/stop.entity';
import { DepartureBoardResponse } from '../schema/departure-board-response';

export interface GetDepartureBoardOptions {
  name?: string | string[];
  id?: string | string[];
  limit?: number;
}

@Injectable()
export class DepartureBoardsService {

  private readonly headers = { "x-access-token": this.configService.get<string>("GOLEMIO_TOKEN") };

  constructor(
    @InjectRepository(Stop) private stopsRepository: Repository<Stop>,
    private configService: ConfigService
  ) { }

  async getDepartureBoard(options: GetDepartureBoardOptions) {

    if (!options.name && !options.id) {
      throw new Error("You have to select name or id");
    }

    const params = {
      names: typeof options.name === "string" ? [options.name] : options.name,
      ids: typeof options.id === "string" ? [options.id] : options.id,
      // filter: "routeHeadingOnce",
      skip: ["canceled"],
      limit: options.limit ? Math.min(options.limit, 20) : 5
    };

    return axios.get<DepartureBoardResponse[]>("https://api.golemio.cz/v2/pid/departureboards/", { params, headers: this.headers })
      .then(res => res.data);
  }


}
