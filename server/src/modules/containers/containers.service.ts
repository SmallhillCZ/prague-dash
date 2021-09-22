import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Container } from './entities/container.entity';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import { ContainerResponse } from './schema/container-response';

@Injectable()
export class ContainersService {

  private readonly logger = new Logger(ContainersService.name);

  constructor(
    @InjectRepository(Container) private containersRepository: Repository<Container>,
    private configService: ConfigService
  ) {

    this.downloadContainers();
  }
  // @Cron('*/5 * * * * *')
  async downloadContainers() {

    var timeStart = process.hrtime();

    await this.containersRepository.clear();

    const requestOptions: AxiosRequestConfig = {
      headers: { "x-access-token": this.configService.get<string>('GOLEMIO_TOKEN') }
    };

    const response = await axios.get<ContainerResponse>("https://api.golemio.cz/v2/sortedwastestations/?onlyMonitored=true&limit=5", requestOptions)
      .then(res => res.data);

    const containers: Container[] = [];

    for (let feature of response.features) {
      for (let container of feature.properties.containers) {
        containers.push({
          id: container.container_id,
          location: feature.properties.name,
          district: feature.properties.district,
          lon: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1],
          occupancy: container.last_measurement?.percent_calculated / 100
        });
      }
    }

    await this.containersRepository.insert(containers);

    const timeEnd = process.hrtime(timeStart);

    this.logger.debug(`Downloaded ${containers.length} containers in ${timeEnd[0] * 1000 + timeEnd[1] / 1000000} ms.`);
  }
}
