import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { GolemioClient } from "golemio-sdk";
import { DateTime } from "luxon";
import { Repository } from "typeorm";
import { ContainerLog } from "../entities/container-log.entity";
import { ContainerType } from "../entities/container-type.entity";
import { Container } from "../entities/container.entity";

export interface GetContainersOptions {
  location?: string;
  coordinates?: { lat: number; lon: number };
}

export interface GetHistoryOptions {
  containerId?: Container["id"];
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
    private golemio: GolemioClient,
  ) {}

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
    return this.containerRepository.findOne({ where: { id }, relations: ["containerTypes"] });
  }

  async getHistory(options: GetHistoryOptions): Promise<Pick<ContainerLog, "timestamp" | "occupancy">[]> {
    let query = this.containerLogRepository
      .createQueryBuilder()
      .select(["timestamp", "occupancy"])
      .where({ type: options.type, containerId: options.containerId })
      .andWhere("timestamp >= :since", { since: options.since });

    return await query.execute();
  }

  getLatestHistoryValues(options: { container_id?: Container["id"] } = {}) {
    let latestTimestampsQuery = this.containerLogRepository
      .createQueryBuilder()
      .select("container_type_id")
      .addSelect("MAX(timestamp)", "timestamp")
      .groupBy("container_id,container_type_id");

    let query = this.containerLogRepository
      .createQueryBuilder("log")
      .innerJoin(
        `(${latestTimestampsQuery.getQuery()})`,
        "latest",
        "log.container_type_id = latest.container_type_id AND log.timestamp = latest.timestamp",
      );

    if (options.container_id) {
      latestTimestampsQuery = latestTimestampsQuery.where({
        "log.container_id": options.container_id,
      });
    }

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
    for (let containerData of response.features!) {
      if (!containerData.properties?.name) continue;
      if (!containerData.properties?.containers) continue;
      if (!containerData.geometry?.coordinates) continue;

      const container: Container = {
        id: containerData.properties!.id.toString(),
        district: containerData.properties!.district,
        lon: containerData.geometry?.coordinates?.[0],
        lat: containerData.geometry?.coordinates?.[1],
        location: containerData.properties!.name,
        accessibility: containerData.properties!.accessibility?.id,
      };

      containers.push(container);

      for (let containerTypeData of containerData.properties!.containers!) {
        if (!containerTypeData.ksnko_id) continue;

        const containerType: ContainerType = {
          id: containerTypeData.ksnko_id.toString(),
          containerId: container.id,
          type: containerTypeData.trash_type?.id || 0,
          cleaning_frequency: containerTypeData.cleaning_frequency,
          container_type: containerTypeData.container_type,
        };

        containerTypes.push(containerType);

        if (containerTypeData.last_measurement?.measured_at_utc) {
          const newLog: ContainerLog = {
            timestamp: DateTime.fromISO(containerTypeData.last_measurement?.measured_at_utc).toJSDate(),
            containerTypeId: containerType.id,
            containerId: container.id,
            type: containerType.type,
            occupancy:
              typeof containerTypeData.last_measurement.percent_calculated === "number"
                ? containerTypeData.last_measurement.percent_calculated / 100
                : null,
          };

          const oldLog = oldLogs.find((item) => item.containerTypeId === newLog.containerTypeId);

          // skip if exists and is the same
          if (
            !oldLog || // previous log does not exist
            oldLog.occupancy !== newLog.occupancy || // occupancy changed
            oldLog.timestamp.getTime() < newLog.timestamp.getTime() // timestamp is newer
          ) {
            containerLogs.push(newLog);
          }
        }
      }
    }

    this.logger.debug(`Saving ${containers.length} containers`);
    await this.containerRepository.save(containers);

    this.logger.debug(`Saving ${containerTypes.length} container types`);
    await this.containerTypeRepository.save(containerTypes);

    this.logger.debug(`Saving ${containerLogs.length} container logs`);
    await this.containerLogRepository.save(containerLogs);

    const rows = containers.length + containerTypes.length + containerLogs.length;
    const timeEnd = process.hrtime(timeStart);

    this.logger.log(`Saved ${rows} rows in ${timeEnd[0] * 1000 + timeEnd[1] / 1000000} ms.`);
  }
}
