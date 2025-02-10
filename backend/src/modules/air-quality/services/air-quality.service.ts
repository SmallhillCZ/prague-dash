import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { GolemioApi, GolemioClient } from "golemio-sdk";
import { Coordinates } from "src/schema/coordinates";
import { coordinatesFromTuple } from "src/utils/coordinates-from-tuple";
import { coordinatesToDistanceCompare } from "src/utils/coordinates-to-distance-compare";

@Injectable()
export class AirQualityService {
  private readonly logger = new Logger(AirQualityService.name);

  private data?: GolemioApi.FeaturePoint[];

  constructor(private golemio: GolemioClient) {
    this.updateStations();
  }

  @Interval(60 * 60 * 1000)
  async updateStations() {
    this.logger.verbose(`Downloading air quality stations...`);

    this.data = await this.golemio.AirQualityV2Api.v2AirqualitystationsGet().then((res) => res.data.features);

    this.logger.log(`Downloaded ${this.data?.length ?? 0} air quality stations.`);
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

  private sortStationsByDistance(stations: GolemioApi.FeaturePoint[], coordinates: Coordinates) {
    return stations.sort((a, b) =>
      coordinatesToDistanceCompare(
        coordinatesFromTuple(a.geometry.coordinates as [number, number]),
        coordinatesFromTuple(b.geometry.coordinates as [number, number]),
        coordinates,
      ),
    );
  }
}
