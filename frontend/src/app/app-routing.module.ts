import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashCardAddComponent } from "./pages/dash-card-add/dash-card-add.component";
import { DashEditPageComponent } from "./pages/dash-edit-page/dash-edit-page.component";
import { DashEditComponent } from "./pages/dash-edit/dash-edit.component";
import { DashComponent } from "./pages/dash/dash.component";
import { SettingsComponent } from "./pages/settings/settings.component";

const routes: Routes = [
  { path: "dash/edit", component: DashEditComponent },

  { path: "dash", component: DashComponent },

  { path: "page/:page/edit", component: DashEditPageComponent },

  { path: "page/:page/add", component: DashCardAddComponent },

  { path: "", pathMatch: "full", redirectTo: "dash" },

  { path: "settings", component: SettingsComponent },

  // { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
