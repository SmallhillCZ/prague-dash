import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContainerType } from '../entities/container-type.entity';
import { Container } from '../entities/container.entity';

@Injectable()
export class ContainersService {

  constructor(
    @InjectRepository(Container) private containerRepository: Repository<Container>,
  ) { }

  getContainers() {
    return this.containerRepository.find({ relations: ["types"] });
  }

  getContainer(id: string) {
    return this.containerRepository.findOne(id, { relations: ["types"] });
  }
}
