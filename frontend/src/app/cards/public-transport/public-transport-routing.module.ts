import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DepartureBoardDetailComponent } from "./pages/departure-board-detail/departure-board-detail.component";
import { DepartureBoardSelectComponent } from "./pages/departure-board-select/departure-board-select.component";
import { DepartureBoardSettingsComponent } from "./pages/departure-board-settings/departure-board-settings.component";
import { VehiclePositionComponent } from "./pages/vehicle-position/vehicle-position.component";

const routes: Routes = [
  { path: "public-transport/departure-boards/select", component: DepartureBoardSelectComponent },

  { path: "public-transport/departure-boards/card/:id/detail", component: DepartureBoardDetailComponent },
  { path: "public-transport/departure-boards/card/:id/settings", component: DepartureBoardSettingsComponent },

  { path: "public-transport/vehicle-position/:trip_id", component: VehiclePositionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicTransportRoutingModule {}
