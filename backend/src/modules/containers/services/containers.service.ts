import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { DateTime } from "luxon";
import { GolemioService } from "src/golemio/services/golemio.service";
import { Repository } from "typeorm";
import { ContainerLog } from "../entities/container-log.entity";
import { ContainerType } from "../entities/container-type.entity";
import { Container } from "../entities/container.entity";

export interface GetContainersOptions {
  location?: string;
  coordinates?: { lat: number; lon: number };
}

export interface GetHistoryOptions {
  id?: Container["id"];
  type: number;
  since: Date;
  limit?: number;
}

@Injectable()
export class ContainersService {
  private readonly logger = new Logger(ContainersService.name);

  containers: Container[] = [];

  constructor(
    @InjectRepository(Container) private containerRepository: Repository<Container>,
    @InjectRepository(ContainerType) private containerTypeRepository: Repository<ContainerType>,
    @InjectRepository(ContainerLog) private containerLogRepository: Repository<ContainerLog>,

    private golemio: GolemioService,
  ) {
    this.downloadContainers();
  }

  async getContainers(options: GetContainersOptions) {
    const query = this.containerRepository.createQueryBuilder("container");

    if (options.location) query.where("container.location ILIKE :location", { location: `%${options.location}%` });

    if (options.coordinates?.lat && options.coordinates?.lon) {
      query.orderBy("ST_Distance_Sphere(ST_MakePoint(:lon, :lat), ST_MakePoint(container.lon, container.lat))", "ASC");
    } else {
      query.orderBy("container.location", "ASC");
    }

    return await query.getMany();
  }

  getContainer(id: Container["id"]) {
    return this.containers.find((item) => item.id === id);
  }

  getHistory(options: GetHistoryOptions) {
    let query = this.containerLogRepository
      .createQueryBuilder()
      .select(["timestamp", "occupancy"])
      .where({ type: options.type, id: options.id })
      .andWhere("timestamp >= :since", { since: options.since });

    return query.execute();
  }

  getLatestHistoryValues(options: { id?: Container["id"] } = {}) {
    let latestTimestampsQuery = this.containerLogRepository
      .createQueryBuilder()
      .select("id")
      .addSelect("type_id")
      .addSelect("MAX(timestamp)", "timestamp")
      .groupBy("id,type_id");

    let query = this.containerLogRepository
      .createQueryBuilder("log")
      .innerJoin(
        `(${latestTimestampsQuery.getQuery()})`,
        "latest",
        "log.id = latest.id AND log.type_id = latest.type_id AND log.timestamp = latest.timestamp",
      );

    if (options.id)
      latestTimestampsQuery = latestTimestampsQuery.where({
        "log.id": options.id,
      });

    return query.getMany();
  }

  @Interval(15 * 60 * 1000)
  private async downloadContainers() {
    var timeStart = process.hrtime();

    this.logger.verbose("Downloading new container data...");
    const response = await this.golemio.WasteCollectionV2Api.getWCStations({
      onlyMonitored: true,
    }).then((res) => res.data);

    const oldLogs = await this.getLatestHistoryValues();

    const containers: Container[] = [];
    const containerTypes: ContainerType[] = [];
    const containerLogs: ContainerLog[] = [];

    this.logger.debug("Processing response...");
    for (let feature of response.features!) {
      if (!feature.properties?.name) continue;
      if (!feature.properties?.containers) continue;
      if (!feature.geometry?.coordinates) continue;

      const container = {
        id: feature.properties!.id.toString(),
        district: feature.properties!.district,
        lon: feature.geometry?.coordinates?.[0],
        lat: feature.geometry?.coordinates?.[1],
        location: feature.properties!.name,
        accessibility: feature.properties!.accessibility?.id,
      };

      containers.push(container);

      for (let container of feature.properties!.containers!) {
        if (!container.container_id) continue;

        const containerType: ContainerType = {
          id: container.container_id!.toString(),
          container_id: feature.properties!.id.toString(),
          type: container.trash_type?.id || 0,
          last_measurement: container.last_measurement?.measured_at_utc
            ? DateTime.fromISO(container.last_measurement?.measured_at_utc).toJSDate()
            : null,
          occupancy: container.last_measurement?.percent_calculated
            ? container.last_measurement?.percent_calculated / 100
            : null,
          cleaning_frequency: container.cleaning_frequency,
          container_type: container.container_type,
        };

        containerTypes.push(containerType);

        if (!containerType.last_measurement) continue;

        const newLog: ContainerLog = {
          id: feature.properties!.id.toString(),
          timestamp: containerType.last_measurement,
          type_id: containerType.id,
          type: containerType.type,
          occupancy: containerType.occupancy,
        };

        const oldLog = oldLogs.find((item) => item.id === newLog.id && item.type_id === newLog.type_id);

        // skip if exists and is the same
        if (
          !oldLog ||
          (oldLog.occupancy !== newLog.occupancy && oldLog.timestamp.getTime() < newLog.timestamp.getTime())
        ) {
          containerLogs.push(newLog);
        }
      }
    }

    this.logger.debug("Saving to database...");
    await this.containerRepository.save(containers);
    await this.containerTypeRepository.save(containerTypes);
    await this.containerLogRepository.save(containerLogs);

    const timeEnd = process.hrtime(timeStart);

    this.logger.log(
      `Downloaded ${this.containers.length} containers in ${timeEnd[0] * 1000 + timeEnd[1] / 1000000} ms.`,
    );
  }
}
