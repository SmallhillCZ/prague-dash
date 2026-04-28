import { Routes } from "@angular/router";
import { CardAirQualityStationSelectComponent } from "./cards/air-quality/pages/card-air-quality-station-select/card-air-quality-station-select.component";
import { SunSettingsComponent } from "./cards/astronomical/components/sun-settings/sun-settings.component";
import { CardContainerDetailComponent } from "./cards/container/pages/card-container-detail/card-container-detail.component";
import { CardContainerSelectComponent } from "./cards/container/pages/card-container-select/card-container-select.component";
import { CardContainerSettingsComponent } from "./cards/container/pages/card-container-settings/card-container-settings.component";
import { DepartureBoardDetailComponent } from "./cards/public-transport/pages/departure-board-detail/departure-board-detail.component";
import { DepartureBoardSelectComponent } from "./cards/public-transport/pages/departure-board-select/departure-board-select.component";
import { DepartureBoardSettingsComponent } from "./cards/public-transport/pages/departure-board-settings/departure-board-settings.component";
import { VehiclePositionComponent } from "./cards/public-transport/pages/vehicle-position/vehicle-position.component";
import { DashEditComponent } from "./components/dash-edit/dash-edit.component";
import { DashCardAddComponent } from "./pages/dash-card-add/dash-card-add.component";
import { DashEditPageComponent } from "./pages/dash-edit-page/dash-edit-page.component";
import { DashComponent } from "./pages/dash/dash.component";
import { SettingsComponent } from "./pages/settings/settings.component";

export const routes: Routes = [
  { path: "dash/edit", component: DashEditComponent },

  { path: "dash", component: DashComponent },

  { path: "page/:page/edit", component: DashEditPageComponent },

  { path: "page/:page/add", component: DashCardAddComponent },

  { path: "", pathMatch: "full", redirectTo: "dash" },

  { path: "settings", component: SettingsComponent },

  // air-quality
  { path: "air-quality/add", component: CardAirQualityStationSelectComponent },

  // astronomical
  { path: "astronomical/card/:id/settings", component: SunSettingsComponent },

  // container
  { path: "container/add", component: CardContainerSelectComponent },
  { path: "container/card/:id/detail", component: CardContainerDetailComponent },
  { path: "container/card/:id/settings", component: CardContainerSettingsComponent },

  // public-transport
  { path: "public-transport/departure-boards/select", component: DepartureBoardSelectComponent },
  { path: "public-transport/departure-boards/card/:id/detail", component: DepartureBoardDetailComponent },
  { path: "public-transport/departure-boards/card/:id/settings", component: DepartureBoardSettingsComponent },
  { path: "public-transport/vehicle-position/:trip_id", component: VehiclePositionComponent },

  // { path: "**", redirectTo: "" },
];
