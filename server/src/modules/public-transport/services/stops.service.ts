import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { coordinatesToDistanceSql } from 'src/utils/coordinates-to-distance-sql';
import { ILike, Like, Repository } from 'typeorm';
import { Stop } from '../entities/stop.entity';

export interface GetStopsOptions {
  name?: string;
  id?: string | string[];
  coordinates?: { lat: number, lon: number; };
  offset?: number;
  limit?: number;
}

@Injectable()
export class StopsService {

  constructor(
    @InjectRepository(Stop) private stopsRepository: Repository<Stop>,
  ) { }

  getStops(options: GetStopsOptions = {}): Promise<Stop[]> {
    let query = this.stopsRepository.createQueryBuilder("stops")
      .leftJoinAndSelect("stops.platforms", "platforms");

    if (options.name) {
      query = query.andWhere({ "name": ILike(`%${options.name}%`) });
    }

    if (options.id) {
      query = query.andWhere("platforms.id IN (:...ids)", { "ids": Array.isArray(options.id) ? options.id : [options.id] });
    }

    if (options.coordinates) {
      query = query.orderBy(coordinatesToDistanceSql("platforms", options.coordinates));
    }
    else {
      query = query.orderBy({ "stops.name": "ASC" });
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    query = query.limit(options.limit ? Math.min(options.limit, 100) : 100);

    return query.getMany();

  }

  async getStop(options: { name: string; }) {
    return this.stopsRepository.findOne({ name: options.name, }, { relations: ["platforms"] });
  }

}
