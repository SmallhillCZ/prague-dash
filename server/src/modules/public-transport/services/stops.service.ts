import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { StopPlatform } from '../entities/stop-platform.entity';
import { Stop } from '../entities/stop.entity';

export interface GetStopsOptions {
  name?: string;
  id?: string | string[];
  coordinates?: { lat: number, lon: number; };
  offset?: number;
}

@Injectable()
export class StopsService {

  constructor(
    @InjectRepository(Stop) private stopsRepository: Repository<Stop>,
    @InjectRepository(StopPlatform) private platformsRepository: Repository<StopPlatform>,
    private configService: ConfigService
  ) { }

  getStops(options: GetStopsOptions = {}): Promise<Stop[]> {
    let query = this.stopsRepository.createQueryBuilder("stops")
      .leftJoinAndSelect("stops.platforms", "platforms");

    if (options.name) {
      query = query.andWhere({ "name": Like(`%${options.name}%`) });
    }

    if (options.id) {
      query = query.andWhere("platform.id IN (:...ids)", { "ids": Array.isArray(options.id) ? options.id : [options.id] });
    }

    if (options.coordinates) {
      // SQLite doesnt have SQRT or POW by default, so we use just basic math operations
      query = query.orderBy(`(platforms.lat - ${options.coordinates.lat}) * (platforms.lat - ${options.coordinates.lat}) + (platforms.lon - ${options.coordinates.lon}) * (platforms.lon - ${options.coordinates.lon})`);
    }
    else {
      query = query.orderBy({ "stops.name": "ASC" });
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    query = query.limit(100);

    return query.getMany();

  }

  async getClosestStop(options: { lat: number, lon: number; }) {
    return this.stopsRepository.createQueryBuilder("stops")
      .leftJoinAndSelect("stops.platforms", "platforms")
      .orderBy(`(platforms.lat - ${options.lat}) * (platforms.lat - ${options.lat}) + (platforms.lon - ${options.lon}) * (platforms.lon - ${options.lon})`)
      .getOne();
  }

}
