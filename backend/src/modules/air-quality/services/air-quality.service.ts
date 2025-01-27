import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { GolemioOldService } from "src/golemio/services/golemio-old.service";
import { Coordinates } from "src/schema/coordinates";
import { coordinatesFromTuple } from "src/utils/coordinates-from-tuple";
import { coordinatesToDistanceCompare } from "src/utils/coordinates-to-distance-compare";
import { AirQualityStation } from "../schema/air-quality-station";
import { AirQualityStationData } from "../schema/air-quality-station-data";

@Injectable()
export class AirQualityService {
  private readonly logger = new Logger(AirQualityService.name);

  private data?: AirQualityStation[];

  constructor(private golemio: GolemioOldService) {
    this.updateStations();
  }

  @Interval(60 * 60 * 1000)
  async updateStations() {
    this.logger.verbose(`Downloading air quality stations...`);

    this.data = await this.golemio.get<AirQualityStationData>("airqualitystations").then((res) => res.data.features);

    this.logger.log(`Downloaded ${this.data.length} air quality stations.`);
  }

  getStations(options?: { coordinates?: Coordinates }) {
    const stations = this.data ?? [];
    if (options?.coordinates) {
      this.sortStationsByDistance(stations, options.coordinates);
    }
    return stations;
  }

  getClosestStation(lat: number, lon: number) {
    const stations = this.data ? [...this.data] : [];
    const sorted = this.sortStationsByDistance(stations, { lat, lon });
    return sorted[0];
  }

  getStation(id: string) {
    return this.data?.find((item) => item.properties.id === id);
  }

  private sortStationsByDistance(stations: AirQualityStation[], coordinates: Coordinates) {
    return stations.sort((a, b) =>
      coordinatesToDistanceCompare(
        coordinatesFromTuple(a.geometry.coordinates),
        coordinatesFromTuple(b.geometry.coordinates),
        coordinates,
      ),
    );
  }
}
