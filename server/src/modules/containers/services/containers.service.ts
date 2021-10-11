import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { ContainerType } from '../entities/container-type.entity';
import { Container } from '../entities/container.entity';

@Injectable()
export class ContainersService {

  constructor(
    @InjectRepository(Container) private containerRepository: Repository<Container>,
  ) { }

  getContainers(query: { location: string; }) {
    const options: FindManyOptions<Container> = {
      relations: ["types"]
    };
    if (query.location) {
      options.where = {
        location: Like(`%${query.location}%`)
      };
    }

    return this.containerRepository.find(options);
  }

  getContainer(id: string) {
    return this.containerRepository.findOne(id, { relations: ["types"] });
  }
};
