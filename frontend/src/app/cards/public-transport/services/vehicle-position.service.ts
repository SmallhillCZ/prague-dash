import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

@Injectable({
  providedIn: "root",
})
export class VehiclePositionService {
  constructor(private api: ApiService) {}

  async getVehiclePosition(tripId: string) {
    return await this.api.PublicTransportApi.getVehiclePosition(tripId).then((res) => res.data);
  }
}
