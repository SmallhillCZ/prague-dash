import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { GolemioService } from 'src/shared/services/golemio.service';
import { coordinatesToDistanceCompare } from 'src/utils/coordinates-to-distance-compare';
import { Repository } from 'typeorm';
import { ContainerLog } from '../entities/container-log.entity';
import { Container } from '../schema/container';
import { ContainerResponse } from '../schema/container-response';

export interface GetContainersOptions {
  location?: string;
  coordinates?: { lat: number; lon: number };
}

export interface GetHistoryOptions {
  id?: Container['id'];
  type: number;
  since: Date;
  limit?: number;
}

@Injectable()
export class ContainersService {
  private readonly logger = new Logger(ContainersService.name);

  containers: Container[] = [];

  constructor(
    @InjectRepository(ContainerLog)
    private containerLogRepository: Repository<ContainerLog>,
    private golemio: GolemioService,
  ) {
    this.downloadContainers();
  }

  getContainers(options: GetContainersOptions) {
    const locationString = options.location?.toLocaleLowerCase();

    let containers = this.containers.filter((item) => {
      if (
        locationString &&
        item.location.toLocaleLowerCase().search(locationString) === -1
      )
        return false;
      return true;
    });

    if (options.coordinates) {
      containers.sort((a, b) =>
        coordinatesToDistanceCompare(a, b, options.coordinates),
      );
    } else {
      containers.sort((a, b) => a.location.localeCompare(b.location));
    }

    return containers;
  }

  getContainer(id: Container['id']) {
    return this.containers.find((item) => item.id === id);
  }

  getHistory(options: GetHistoryOptions) {
    let query = this.containerLogRepository
      .createQueryBuilder()
      .select(['timestamp', 'occupancy'])
      .where({ type: options.type, id: options.id })
      .andWhere('timestamp >= :since', { since: options.since });

    return query.execute();
  }

  getLatestHistoryValues(options: { id?: Container['id'] } = {}) {
    let latestTimestampsQuery = this.containerLogRepository
      .createQueryBuilder()
      .select('id')
      .addSelect('type_id')
      .addSelect('MAX(timestamp)', 'timestamp')
      .groupBy('id,type_id');

    let query = this.containerLogRepository
      .createQueryBuilder('log')
      .innerJoin(
        `(${latestTimestampsQuery.getQuery()})`,
        'latest',
        'log.id = latest.id AND log.type_id = latest.type_id AND log.timestamp = latest.timestamp',
      );

    if (options.id)
      latestTimestampsQuery = latestTimestampsQuery.where({
        'log.id': options.id,
      });

    return query.getMany();
  }

  @Interval(15 * 60 * 1000)
  private async downloadContainers() {
    var timeStart = process.hrtime();

    this.logger.verbose('Downloading new container data...');
    const response = await this.golemio
      .get<ContainerResponse>('sortedwastestations/?', {
        onlyMonitored: 'true',
      })
      .then((res) => res.data);

    let c = 0;

    this.logger.debug('Processing response...');
    this.containers = response.features
      .filter((feature) => !!feature.properties.name)
      .map((feature) => {
        const container: Container = {
          id: feature.properties.id.toString(),
          district: feature.properties.district,
          lon: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1],
          location: feature.properties.name,
          accessibility: feature.properties.accessibility.id,
          types: [],
        };

        container.types = feature.properties.containers.map((container) => ({
          id: container.container_id.toString(),
          type: container.trash_type.id || 0,
          last_measurement: container.last_measurement?.measured_at_utc,
          occupancy: container.last_measurement?.percent_calculated / 100,
          cleaning_frequency: container.cleaning_frequency,
          container_type: container.container_type,
        }));

        return container;
      });

    this.logger.debug('Saving to database...');
    await this.saveLogs(this.containers);

    const timeEnd = process.hrtime(timeStart);

    this.logger.log(
      `Downloaded ${this.containers.length} containers in ${
        timeEnd[0] * 1000 + timeEnd[1] / 1000000
      } ms.`,
    );
  }

  private async saveLogs(containers: Container[]) {
    const newLogs: ContainerLog[] = [];

    const oldLogs = await this.getLatestHistoryValues();

    let skipped = 0;

    for (let container of containers) {
      if (!container.id) continue;

      for (let type of container.types) {
        if (!type.id || !type.occupancy) continue;

        const newLog: ContainerLog = {
          id: container.id,
          timestamp: DateTime.fromISO(type.last_measurement).toJSDate(),
          type_id: type.id,
          type: type.type,
          occupancy: type.occupancy,
        };

        const oldLog = oldLogs.find(
          (item) => item.id === newLog.id && item.type_id === newLog.type_id,
        );

        if (!oldLog) {
          console.log(newLog);
          break;
        }

        // skip if exists and is the same
        if (
          oldLog &&
          oldLog.occupancy === newLog.occupancy &&
          oldLog.timestamp.getTime() >= newLog.timestamp.getTime()
        ) {
          skipped++;
          continue;
        }

        newLogs.push(newLog);
      }
    }

    await this.containerLogRepository.save(newLogs);

    this.logger.verbose(
      `Saved ${newLogs.length} new values, skipped ${skipped} values.`,
    );
  }
}
