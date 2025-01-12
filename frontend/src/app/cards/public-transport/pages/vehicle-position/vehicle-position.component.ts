import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { DateTime, Duration } from "luxon";
import { Subscription, timer } from "rxjs";
import { ApiError } from "src/app/services/api.service";
import { DepartureData, DepartureStopData } from "../../schema/departure-board-data";
import { PlatformData } from "../../schema/platform-data";
import { RouteType, RouteTypes } from "../../schema/route-type";
import { VehiclePosition } from "../../schema/vehicle-position";
import { DepartureBoardsService } from "../../services/departure-boards.service";
import { StopsService } from "../../services/stops.service";
import { VehiclePositionService } from "../../services/vehicle-position.service";

@UntilDestroy()
@Component({
    selector: "pd-vehicle-position",
    templateUrl: "./vehicle-position.component.html",
    styleUrls: ["./vehicle-position.component.scss"],
    standalone: false
})
export class VehiclePositionComponent implements OnInit {
  tripId?: string;

  vehiclePosition?: VehiclePosition;
  routeType?: RouteType;
  lastPlatform?: PlatformData;

  delayTime?: string;

  departurePlatform?: PlatformData;
  departurePlatformType?: "next" | "user";

  departure?: DepartureData;
  departureTime?: string;

  private updateTimerSubscription?: Subscription;
  private departureTimerSubscription?: Subscription;

  constructor(
    private vehiclePositions: VehiclePositionService,
    private departureBoards: DepartureBoardsService,
    private stops: StopsService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.updateTimerSubscription = timer(0, 10 * 1000)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.updatePosition());

    this.tripId = this.route.snapshot.params["trip_id"];
  }

  async updatePosition() {
    if (!this.tripId) return;

    try {
      this.vehiclePosition = await this.vehiclePositions.getVehiclePosition(this.tripId);
      this.delayTime = this.formatDelay(this.vehiclePosition.properties.last_position.delay.actual);

      this.routeType = RouteTypes[this.vehiclePosition.properties.trip.gtfs.route_type];

      if (this.lastPlatform?.id !== this.vehiclePosition.properties.last_position.last_stop.id) {
        this.lastPlatform = await this.getPlatform(this.vehiclePosition.properties.last_position.last_stop.id);
      }

      const platformId =
        this.route.snapshot.queryParams["platform"] || this.vehiclePosition?.properties.last_position.next_stop.id;

      if (this.departurePlatform?.id !== platformId) {
        this.departurePlatformType = !!this.route.snapshot.queryParams["platform"] ? "user" : "next";
        this.loadDeparture(platformId);
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        this.updateTimerSubscription?.unsubscribe();
        const alert = await this.alertController.create({
          message: "Poloha vozu nenalezena. Buď není monitorovaný, nebo ještě nevyjel z konečné.",
        });
        alert.present();
      }
    }
  }

  async getPlatform(id: string) {
    return this.stops.getPlatform(id);
  }

  async loadDeparture(id: string) {
    this.departurePlatform = await this.getPlatform(id);

    const departureBoard = await this.departureBoards.loadDepartures({ platforms: [id], limit: 20 });
    this.departure = departureBoard.departures.find((item) => item.trip.id === this.tripId);

    if (this.departure) {
      this.departureTimerSubscription = timer(0, 1000)
        .pipe(untilDestroyed(this))
        .subscribe(() => this.updateDepartureTime());
    } else {
      this.departure = undefined;
      this.departureTimerSubscription?.unsubscribe();
    }
  }

  updateDepartureTime() {
    if (this.departure) {
      let arrival = DateTime.fromISO(this.departure.arrival_timestamp.scheduled);

      if (this.vehiclePosition) {
        arrival = arrival.plus({
          seconds: this.vehiclePosition.properties.last_position.delay.actual,
        });
      }

      const diff = arrival.diffNow(["minutes", "seconds"]);
      this.departureTime = this.formatDepartureTime(diff);
    } else {
      this.departureTime = undefined;
    }
  }

  formatDepartureTime(diff: Duration) {
    const negative = diff.minutes * 60 + diff.seconds < 0;
    const minutes = Math.abs(diff.minutes);
    const seconds = negative ? Math.abs(Math.ceil(diff.seconds)) : Math.abs(Math.floor(diff.seconds));
    const departureTime = `${minutes}m ${seconds}s`;
    return `${negative ? "−" : ""}${departureTime}`;
  }

  formatDelay(delay: number) {
    const minutes = Math.floor(delay / 60);
    const seconds = delay % 60;
    if (Math.abs(delay) >= 60) return `${minutes}m ${seconds}s`;
    else return `${delay}s`;
  }
}
