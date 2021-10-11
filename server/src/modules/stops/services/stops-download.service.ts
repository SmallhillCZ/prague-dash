import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as csvParse from "csv-parse";
import * as extract from 'extract-zip';
import * as fs from 'fs-extra';
import * as GTFS from "gtfs-types";
import * as https from 'https';
import * as path from 'path';
import * as sqlite from "sqlite";
import * as sqlite3 from "sqlite3";
import { Writable } from 'stream';
import { Repository } from 'typeorm';
import { StopTime } from '../entities/stop-time.entity';
import { Stop } from '../entities/stop.entity';

@Injectable()
export class StopsDownloadService {

  private readonly logger = new Logger(StopsDownloadService.name);

  private readonly tmpDir = path.resolve(this.configService.get("TMP_DIR"), "stops");

  constructor(
    @InjectRepository(Stop) private stopsRepository: Repository<Stop>,
    @InjectRepository(StopTime) private stopTimesRepository: Repository<StopTime>,
    private configService: ConfigService
  ) {

    this.downloadStops();
  }

  async downloadStops() {

    this.logger.log("Updating data...");

    const gtfsUrl = "https://data.pid.cz/PID_GTFS.zip";

    this.logger.verbose("# Downloading stops");

    await fs.ensureDir(this.tmpDir);

    const gtfsPath = path.join(this.tmpDir, "PID_GTFS.zip");

    if (!fs.existsSync(gtfsPath)) {
      this.logger.verbose("Downloading GTFS file...");
      await this.downloadFile(gtfsUrl, gtfsPath);
      this.logger.verbose("GTFS file downloaded.");
    }
    else {
      this.logger.verbose("GTFS file already present.");
    }

    const db = await sqlite.open({
      filename: ':memory:',
      driver: sqlite3.Database
    });

    this.logger.verbose("Exctracting GTFS file...");
    await extract(gtfsPath, { dir: this.tmpDir });


    let stops: Stop[] = [];
    let stopTimes: StopTime[] = [];

    let stopIndex: { [stop_id: string]: Stop; } = {};
    let calendars: { [service_id: string]: GTFS.Calendar; } = {};
    let trips: { [trip_id: string]: Pick<GTFS.Trip, "trip_id" | "route_id" | "service_id" | "trip_headsign">; } = {};
    let routes: { [route_id: string]: Pick<GTFS.Route, "route_id" | "route_short_name">; } = {};

    this.logger.verbose("Loading stops...");
    await this.loadFile("stops.txt", ["stop_id", "stop_name", "stop_lat", "stop_lon"], item => {
      stops.push({
        id: item.stop_id,
        name: item.stop_name,
        lat: item.stop_lat,
        lon: item.stop_lon,
        times: []
      });
    });

    this.logger.verbose("Clearing stops in DB...");
    await this.stopsRepository.clear();

    this.logger.verbose("Writing stops to DB...");
    while (stops.length > 0) {
      await this.stopsRepository.insert(stops.splice(0, 1000));
    }

    this.logger.verbose("Loading calendar...");
    await this.loadFile<GTFS.Calendar>("calendar.txt", ["service_id", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "start_date", "end_date"], item => {
      calendars[item.service_id] = item;
    });

    this.logger.verbose("Loading trips...");
    await this.loadFile<GTFS.Trip>("trips.txt", ["trip_id", "route_id", "service_id", "trip_headsign"], item => {
      trips[item.trip_id] = item;
    });

    this.logger.verbose("Loading routes...");
    await this.loadFile<GTFS.Route>("routes.txt", ["route_id", "route_short_name"], item => {
      routes[item.route_id] = item;
    });

    this.logger.verbose("Loading stop times...");
    await this.loadFile<GTFS.StopTime>("stop_times.txt", ["trip_id", "stop_id", "departure_time"], (item, i) => {
      if (!item.stop_id) return;

      // let stop = stopIndex[item.stop_id];
      let trip = trips[item.trip_id];
      let calendar = calendars[trip.service_id];
      let route = routes[trip.route_id];

      stopTimes.push({
        id: i,
        stop_id: item.stop_id,
        route_name: route.route_short_name,
        direction: trip.trip_headsign,
        departure_time: item.departure_time,
        start_date: calendar.start_date,
        end_date: calendar.end_date,
        monday: !!calendar.monday,
        tuesday: !!calendar.tuesday,
        wednesday: !!calendar.wednesday,
        thursday: !!calendar.thursday,
        friday: !!calendar.friday,
        saturday: !!calendar.saturday,
        sunday: !!calendar.sunday,
      });
    });

    this.logger.verbose("Clearing stop times from DB...");
    await this.stopTimesRepository.clear();

    this.logger.verbose("Writing stop times to DB...");
    while (stopTimes.length > 0) {
      await this.stopTimesRepository.insert(stopTimes.splice(0, 1000));
    }
    stopTimes = undefined;
    calendars = undefined;
    trips = undefined;


    this.logger.log("Data udpated.");
  }

  private async downloadFile(source: string, target: string) {

    const file = fs.createWriteStream(target);

    return new Promise<void>((resolve, reject) => {
      const request = https.get(source, function (response) {
        response.pipe(file);
      });

      file.on("error", () => reject());
      file.on("finish", () => resolve());

    });
  }

  private async loadFile<T>(file: string, columns?: true | (keyof T)[], processFn?: (item: T, i: number) => void) {
    return new Promise<void>((resolve, reject) => {

      const data: T[] = [];

      const headerFn = (columns: (keyof T)[]) => ((header: string[]) => header.map((item: any) => columns.indexOf(item) === -1 ? null : item));

      let c = 0;

      const reader = fs.createReadStream(path.join(this.tmpDir, file));
      const parser = csvParse({
        delimiter: ",",
        quote: "\"",
        columns: columns === true ? true : headerFn(columns),
      });

      const writer = new Writable({
        objectMode: true,
        write: (chunk: T, encoding: string, callback: (err?: Error | null) => void) => {
          processFn(chunk, c);
          c++;
          callback();
        }
      });

      reader.on("error", err => reject(err));
      parser.on("error", err => reject(err));

      writer.on("finish", () => {
        this.logger.verbose(`Loaded ${c} records from ${file}.`);
        resolve();
      });

      reader.pipe(parser).pipe(writer);

    });
  }

}


