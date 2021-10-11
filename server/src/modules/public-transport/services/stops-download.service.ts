import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import * as path from 'path';
import { Repository } from 'typeorm';
import { StopPlatform } from '../entities/stop-platform.entity';
import { Stop } from '../entities/stop.entity';
import { DepartureBoardResponse } from '../schema/departure-board-response';
import { StopsResponse } from '../schema/stops-response';

@Injectable()
export class StopsDownloadService {

  private readonly logger = new Logger(StopsDownloadService.name);

  private readonly tmpDir = path.resolve(this.configService.get("TMP_DIR"), "stops");

  private readonly headers = { "x-access-token": this.configService.get<string>("GOLEMIO_TOKEN") };

  constructor(
    @InjectRepository(Stop) private stopsRepository: Repository<Stop>,
    private configService: ConfigService
  ) {

    this.updateStops();
  }

  @Interval(24 * 60 * 60 * 1000)
  async updateStops() {

    var timeStart = process.hrtime();

    this.logger.verbose("Downloading new stops...");



    const stopIndex: { [name: string]: Stop; } = {};
    const stops: Stop[] = [];
    let offset = 0;

    while (1) { // loop until any data

      const requestOptions: AxiosRequestConfig = {
        headers: this.headers,
        params: {
          offset
        }
      };

      const data = await axios.get<StopsResponse>("https://api.golemio.cz/v2/gtfs/stops/", requestOptions)
        .then(res => res.data);

      if (!data.features.length) break; // break when no more data

      offset += 10000;

      data.features
        .filter(item => !!item.properties.stop_name)
        .forEach(item => {

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
            lat: item.geometry.coordinates[1],
            lon: item.geometry.coordinates[0]
          });



        });
    }


    this.logger.verbose("Clearing old stops...");
    await this.stopsRepository.clear();

    const c = stops.length;

    this.logger.verbose("Inserting new stops...");
    while (stops.length > 0) {
      await this.stopsRepository.save(stops.splice(0, 1000));
    }

    const timeEnd = process.hrtime(timeStart);

    this.logger.log(`Downloaded ${c} stops in ${timeEnd[0] * 1000 + timeEnd[1] / 1000000} ms.`);
  }

}


