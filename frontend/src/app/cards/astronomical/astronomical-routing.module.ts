import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SunSettingsComponent } from "./components/sun-settings/sun-settings.component";

const routes: Routes = [{ path: "astronomical/card/:id/settings", component: SunSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AstronomicalRoutingModule {}
