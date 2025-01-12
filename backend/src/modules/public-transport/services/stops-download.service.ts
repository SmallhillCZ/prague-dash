import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { GolemioService } from 'src/shared/services/golemio.service';
import { coordinatesFromTuple } from 'src/utils/coordinates-from-tuple';
import { Repository } from 'typeorm';
import { Stop } from '../entities/stop.entity';
import { StopsResponse } from '../schema/stops-response';

@Injectable()
export class StopsDownloadService {

  private readonly logger = new Logger(StopsDownloadService.name);

  constructor(
    @InjectRepository(Stop) private stopsRepository: Repository<Stop>,
    private golemio: GolemioService,
    private config: ConfigService
  ) {
    if (this.config.get("NODE_ENV") === "production") this.updateStops();
  }

  @Interval(24 * 60 * 60 * 1000)
  async updateStops() {

    var timeStart = process.hrtime();

    this.logger.verbose("Downloading new stops...");

    const stopIndex: { [name: string]: Stop; } = {};
    const stops: Stop[] = [];
    let offset = 0;

    while (1) { // loop until any data

      const data = await this.golemio.get<StopsResponse>("gtfs/stops", { offset })
        .then(res => res.data);

      if (!data.features.length) break; // break when no more data

      offset += 10000;

      data.features
        .forEach(item => {

          // • 0 (or empty): Stop (or Platform). A location where passengers board or disembark from a transit vehicle. Is called a platform when defined within a parent_station.
          // • 1: Station. A physical structure or area that contains one or more platform.
          // • 2: Entrance/Exit. A location where passengers can enter or exit a station from the street. If an entrance/exit belongs to multiple stations, it can be linked by pathways to both, but the data provider must pick one of them as parent.
          // • 3: Generic Node. A location within a station, not matching any other location_type, which can be used to link together pathways define in pathways.txt.
          // • 4: Boarding Area. A specific location on a platform, where passengers can board and/or alight vehicles.
          if (item.properties.location_type) return;

          if (!item.properties.stop_name) return;

          if (!stopIndex[item.properties.stop_name]) {
            const stop = new Stop();
            stop.name = item.properties.stop_name;
            stop.platforms = [];

            stops.push(stop);
            stopIndex[item.properties.stop_name] = stop;
          }

          const stop = stopIndex[item.properties.stop_name];

          stop.platforms.push({
            stop,
            id: item.properties.stop_id,
            name: item.properties.platform_code,
            ...coordinatesFromTuple(item.geometry.coordinates)
          });
        });
    }


    this.logger.verbose("Clearing old stops...");
    await this.stopsRepository.delete({});

    const c = stops.length;

    this.logger.verbose("Inserting new stops...");
    while (stops.length > 0) {
      await this.stopsRepository.save(stops.splice(0, 1000));
    }

    const timeEnd = process.hrtime(timeStart);

    this.logger.log(`Downloaded ${c} stops in ${timeEnd[0] * 1000 + timeEnd[1] / 1000000} ms.`);
  }

}


