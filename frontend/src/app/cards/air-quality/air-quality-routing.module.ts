import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CardAirQualityStationSelectComponent } from "./pages/card-air-quality-station-select/card-air-quality-station-select.component";

const routes: Routes = [{ path: "air-quality/add", component: CardAirQualityStationSelectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirQualityRoutingModule {}
