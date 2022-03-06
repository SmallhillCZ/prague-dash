import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Geolocation } from "@capacitor/geolocation";
import { AlertController } from "@ionic/angular";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Subscription, timer } from "rxjs";
import { ApiError } from "src/app/services/api.service";
import { RouteType, RouteTypes } from "../../schema/route-type";
import { TripData } from "../../schema/trip";
import { VehiclePosition } from "../../schema/vehicle-position";
import { VehiclePositionService } from "../../services/vehicle-position.service";

@UntilDestroy()
@Component({
  selector: "pd-vehicle-position",
  templateUrl: "./vehicle-position.component.html",
  styleUrls: ["./vehicle-position.component.scss"],
})
export class VehiclePositionComponent implements OnInit {
  vehiclePosition?: VehiclePosition;

  gpsCoords?: [number, number];

  timerSubscription?: Subscription;

  constructor(
    private vehiclePositions: VehiclePositionService,
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
      this.vehiclePosition = await this.vehiclePositions.getVehiclePosition(tripId);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        this.timerSubscription?.unsubscribe();
        const alert = await this.alertController.create({
          message: "Poloha vozu nenalezena. Buď není monitorovaný, nebo ještě nevyjel z konečné.",
        });
        alert.present();
      }
    }

    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    this.gpsCoords = [pos.coords.longitude, pos.coords.latitude];
  }

  getRouteIcon(routeType: RouteType) {
    return RouteTypes[routeType]?.icon || "❓";
  }

  getRouteType(routeType: RouteType) {
    return RouteTypes[routeType]?.name_short.cs || "Vůz";
  }
}
