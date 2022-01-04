import { Injectable, Logger } from '@nestjs/common';
import { ContextId } from '@nestjs/core';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { GolemioService } from 'src/shared/services/golemio.service';
import { coordinatesToDistanceCompare } from 'src/utils/coordinates-to-distance-compare';
import { LimitOnUpdateNotSupportedError, Repository } from 'typeorm';
import { ContainerLog } from '../entities/container-log.entity';
import { Container, ContainerType } from '../schema/container';
import { ContainerResponse } from '../schema/container-response';


export interface GetContainersOptions {
  location?: string;
  coordinates?: { lat: number, lon: number; };
}

export interface GetHistoryOptions {
  id?: Container["id"],
  type?: number,
  since?: Date,
  limit?: number;
}

@Injectable()
export class ContainersService {

  private readonly logger = new Logger(ContainersService.name);

  containers: Container[] = [];

  constructor(
    @InjectRepository(ContainerLog) private containerLogRepository: Repository<ContainerLog>,
    private golemio: GolemioService
  ) {
    this.downloadContainers();
  }

  getContainers(options: GetContainersOptions) {
    const locationString = options.location?.toLocaleLowerCase();

    let containers = this.containers
      .filter(item => {
        if (locationString && item.location.toLocaleLowerCase().search(locationString) === -1) return false;
        return true;
      });

    if (options.coordinates) {
      containers.sort((a, b) => coordinatesToDistanceCompare(a, b, options.coordinates));
    }
    else {
      containers.sort((a, b) => a.location.localeCompare(b.location));
    }

    return containers;
  }

  getContainer(id: Container["id"]) {
    return this.containers.find(item => item.id === id);
  }

  getHistory(options: GetHistoryOptions) {
    let query = this.containerLogRepository.createQueryBuilder();

    if (options.id) query = query.andWhere({ id: options.id });

    if (options.type) query = query.andWhere({ type: options.type });

    if (options.since) query = query.andWhere("timestamp >= :value", options.since);

    else return this.containerLogRepository.find();
  }

  getLatestHistoryValues(options: { id?: Container["id"]; } = {}) {

    let latestTimestampsQuery = this.containerLogRepository.createQueryBuilder()
      .select("id")
      .addSelect("type")
      .addSelect("MAX(timestamp)", "timestamp")
      .groupBy("id,type");

    let query = this.containerLogRepository.createQueryBuilder("log")
      .innerJoin(`(${latestTimestampsQuery.getQuery()})`, "latest", "log.id = latest.id AND log.type = latest.type AND log.timestamp = latest.timestamp");

    if (options.id) latestTimestampsQuery = latestTimestampsQuery.where({ "log.id": options.id });

    return query.getMany();
  }

  @Interval(30 * 60 * 1000)
  private async downloadContainers() {

    var timeStart = process.hrtime();


    this.logger.verbose("Downloading new container data...");
    const response = await this.golemio.get<ContainerResponse>("sortedwastestations/?", { onlyMonitored: "true" })
      .then(res => res.data);

    let c = 0;

    this.containers = response.features
      .filter(feature => !!feature.properties.name)
      .map(feature => {

        const container: Container = {
          id: feature.properties.id,
          district: feature.properties.district,
          lon: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1],
          location: feature.properties.name,
          accessibility: feature.properties.accessibility.id,
          types: []
        };

        container.types = feature.properties.containers.map(container => ({
          id: container.container_id,
          type: container.trash_type.id || 0,
          occupancy: container.last_measurement?.percent_calculated / 100,
          cleaning_frequency: container.cleaning_frequency,
          container_type: container.container_type,
        }));

        return container;
      });

    await this.saveLogs(this.containers);

    const timeEnd = process.hrtime(timeStart);

    this.logger.log(`Downloaded ${this.containers.length} containers in ${timeEnd[0] * 1000 + timeEnd[1] / 1000000} ms.`);
  }

  private async saveLogs(containers: Container[]) {

    const timestamp = new Date();

    const newLogs: ContainerLog[] = [];

    const oldLogs = await this.getLatestHistoryValues();

    let skipped = 0;

    for (let container of containers) {
      if (!container.id) continue;


      for (let type of container.types) {
        if (!type.id || !type.occupancy) continue;

        const newLog: ContainerLog = {
          timestamp,
          id: container.id,
          type_id: type.id,
          type: type.type,
          occupancy: type.occupancy
        };

        const oldLog = oldLogs.find(item => item.id === newLog.id && item.type_id === newLog.type_id);

        // skip if exists
        if (oldLog && oldLog.occupancy === newLog.occupancy) {
          skipped++;
          continue;
        }

        newLogs.push(newLog);

      }
    }

    await this.containerLogRepository.save(newLogs);

    this.logger.verbose(`Saved ${newLogs.length} updated values, skipped ${skipped} unchanged values.`);
  }

}
