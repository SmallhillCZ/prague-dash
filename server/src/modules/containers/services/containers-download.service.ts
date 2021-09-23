import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import { Repository } from 'typeorm';
import { ContainerType } from '../entities/container-type.entity';
import { Container } from '../entities/container.entity';
import { ContainerResponse } from '../schema/container-response';

@Injectable()
export class ContainersDownloadService {

  private readonly logger = new Logger(ContainersDownloadService.name);

  constructor(
    @InjectRepository(Container) private containerRepository: Repository<Container>,
    @InjectRepository(ContainerType) private containerTypeRepository: Repository<ContainerType>,
    private configService: ConfigService
  ) {

    this.downloadContainers();
  }

  @Interval(60000)
  async downloadContainers() {

    var timeStart = process.hrtime();

    await this.containerTypeRepository.clear();
    await this.containerRepository.clear();

    const requestOptions: AxiosRequestConfig = {
      headers: { "x-access-token": this.configService.get<string>('GOLEMIO_TOKEN') }
    };

    const response = await axios.get<ContainerResponse>("https://api.golemio.cz/v2/sortedwastestations/?onlyMonitored=true&limit=5", requestOptions)
      .then(res => res.data);

    let c = 0;

    for (let feature of response.features) {

      const containerData: Container = {
        "id": feature.properties.id,
        "district": feature.properties.district,
        "lon": feature.geometry.coordinates[0],
        "lat": feature.geometry.coordinates[1],
        "location": feature.properties.name,
        "types": []
      };

      await this.containerRepository.insert(containerData);

      const containerTypesData: ContainerType[] = feature.properties.containers.map(container => ({
        container: containerData,
        id: container.container_id,
        type: container.trash_type.id,
        occupancy: container.last_measurement?.percent_calculated / 100
      }));

      await this.containerTypeRepository.insert(containerTypesData);

      c++;
    }

    const timeEnd = process.hrtime(timeStart);

    this.logger.log(`Downloaded ${c} containers in ${timeEnd[0] * 1000 + timeEnd[1] / 1000000} ms.`);
  }
}
