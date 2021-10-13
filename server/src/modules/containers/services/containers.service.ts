import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { coordinatesToDistanceSql } from 'src/utils/coordinates-to-distance-sql';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { ContainerType } from '../entities/container-type.entity';
import { Container } from '../entities/container.entity';


interface GetStopsOptions {
  location?: string;
  coordinates?: { lat: number, lon: number; };
}

@Injectable()
export class ContainersService {

  constructor(
    @InjectRepository(Container) private containerRepository: Repository<Container>,
  ) { }

  getContainers(options: GetStopsOptions) {
    let query = this.containerRepository.createQueryBuilder("containers")
      .leftJoinAndSelect("containers.types", "types");

    if (options.location) {
      query = query.andWhere({ "location": Like(`%${options.location}%`) });
    }

    if (options.coordinates) {
      // SQLite doesnt have SQRT or POW by default, so we use just basic math operations
      query = query.orderBy(coordinatesToDistanceSql("containers", options.coordinates));
    }
    else {
      query = query.orderBy({ "containers.location": "ASC" });
    }

    return query.getMany();
  }

  getContainer(id: string) {
    return this.containerRepository.findOne(id, { relations: ["types"] });
  }
};
