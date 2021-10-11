import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Like, Repository, SelectQueryBuilder } from 'typeorm';
import { Stop } from '../entities/stop.entity';
import { DepartureBoardResponse } from '../schema/departure-board-response';

export interface GetStopsOptions {
  name?: string;
  coordinates?: { lat: number, lon: number; };
  offset?: number;
}

@Injectable()
export class StopsService {

  private readonly headers = { "x-access-token": this.configService.get<string>("GOLEMIO_TOKEN") };

  constructor(
    @InjectRepository(Stop) private stopsRepository: Repository<Stop>,
    private configService: ConfigService
  ) { }

  async getDepartureBoard(name: string) {
    const params = {
      names: [name]
    };
    return axios.get<DepartureBoardResponse[]>("https://api.golemio.cz/v2/departureboards/", { params, headers: this.headers })
      .then(res => res.data);
  }

  getStops(options: GetStopsOptions = {}): Promise<Stop[]> {
    let query = this.stopsRepository.createQueryBuilder("stops");

    if (options.name) {
      query = query.where({ name: Like(`%${options.name}%`) });
    }

    if (options.coordinates) {
      // SQLite doesnt have SQRT or POW by default, so we use just basic math operations
      query = query.orderBy(`(stops.lat - ${options.coordinates.lat}) * (stops.lat - ${options.coordinates.lat}) + (stops.lon - ${options.coordinates.lon}) * (stops.lon - ${options.coordinates.lon})`);
    }
    else {
      query = query.orderBy({ name: "ASC" });
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    query = query.limit(100);

    return query.getMany();

  }

}
