import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import * as path from 'path';
import { Repository } from 'typeorm';
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

    const requestoOptions: AxiosRequestConfig = {
      headers: this.headers
    };

    const data = await axios.get<StopsResponse>("https://api.golemio.cz/v2/gtfs/stops/", requestoOptions)
      .then(res => res.data.features);

    this.logger.verbose("Clearing old stops...");
    await this.stopsRepository.clear();

    let c = 0;

    this.logger.verbose("Inserting new stops...");
    while (data.length > 0) {

      const stops: Stop[] = data
        .splice(0, 1000)
        .filter(item => !!item.properties.stop_name)
        .map(item => ({
          name: item.properties.stop_name,
          id: item.properties.stop_id,
          lat: item.geometry.coordinates[0],
          lon: item.geometry.coordinates[1]
        }));

      await this.stopsRepository.insert(stops);

      c += stops.length;
    }

    const timeEnd = process.hrtime(timeStart);

    this.logger.log(`Downloaded ${c} stops in ${timeEnd[0] * 1000 + timeEnd[1] / 1000000} ms.`);
  }

}


