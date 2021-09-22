import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Container } from '../../entities/container.entity';

@Controller('containers')
export class ContainersController {

  constructor(
    @InjectRepository(Container) private containerRepository: Repository<Container>
  ) {

  }

  @Get("/")
  getContainers() {
    return this.containerRepository.find();
  }
}
