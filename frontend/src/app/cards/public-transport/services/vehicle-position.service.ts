import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { VehiclePosition } from "../schema/vehicle-position";

@Injectable({
  providedIn: "root",
})
export class VehiclePositionService {
  constructor(private api: ApiService) {}

  getVehiclePosition(tripId: string) {
    return this.api.get<VehiclePosition>("vehicle-positions/" + tripId);
  }
}
