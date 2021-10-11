import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stop } from '../entities/stop.entity';

@Injectable()
export class StopsService {

  constructor(
    @InjectRepository(Stop) private stopsRepository: Repository<Stop>
  ) { }

  async getStop(id: string) {
    return this.stopsRepository.findOne(id, { relations: ["times"] });
  }

  async getStops() {
    return this.stopsRepository.find({ select: ["id", "name"] });
  }
}
