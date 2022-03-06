import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Subscription, timer } from "rxjs";
import { ApiError } from "src/app/services/api.service";
import { PlatformData } from "../../schema/platform-data";
import { RouteType, RouteTypes } from "../../schema/route-type";
import { VehiclePosition } from "../../schema/vehicle-position";
import { StopsService } from "../../services/stops.service";
import { VehiclePositionService } from "../../services/vehicle-position.service";

@UntilDestroy()
@Component({
  selector: "pd-vehicle-position",
  templateUrl: "./vehicle-position.component.html",
  styleUrls: ["./vehicle-position.component.scss"],
})
export class VehiclePositionComponent implements OnInit {
  vehiclePosition?: VehiclePosition;
  routeType?: RouteType;
  targetPlatform?: PlatformData;
  lastPlatform?: PlatformData;
  nextPlatform?: PlatformData;

  private timerSubscription?: Subscription;

  constructor(
    private vehiclePositions: VehiclePositionService,
    private stops: StopsService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.timerSubscription = timer(0, 10 * 1000)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.updatePosition());
  }

  async updatePosition() {
    try {
      const tripId = this.route.snapshot.params["trip_id"];
      const platformId = this.route.snapshot.queryParams["platform"];

      this.vehiclePosition = await this.vehiclePositions.getVehiclePosition(tripId);

      this.routeType = RouteTypes[this.vehiclePosition.properties.trip.gtfs.route_type];

      if (platformId) {
        this.targetPlatform = await this.loadPlatform(platformId);
      }

      if (this.lastPlatform?.id !== this.vehiclePosition.properties.last_position.last_stop.id) {
        this.lastPlatform = await this.loadPlatform(this.vehiclePosition.properties.last_position.last_stop.id);
      }

      if (this.nextPlatform?.id !== this.vehiclePosition.properties.last_position.next_stop.id) {
        this.nextPlatform = await this.loadPlatform(this.vehiclePosition.properties.last_position.next_stop.id);
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        this.timerSubscription?.unsubscribe();
        const alert = await this.alertController.create({
          message: "Poloha vozu nenalezena. Buď není monitorovaný, nebo ještě nevyjel z konečné.",
        });
        alert.present();
      }
    }
  }

  async loadPlatform(id: string) {
    return this.stops.getPlatform(id);
  }

  formatDelay(delay: number) {
    if (Math.abs(delay) >= 60) return `${Math.round(delay / 60)} min`;
    else return `${delay} s`;
  }
}
