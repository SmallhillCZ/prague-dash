import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CardContainerDetailComponent } from "./pages/card-container-detail/card-container-detail.component";
import { CardContainerSelectComponent } from "./pages/card-container-select/card-container-select.component";
import { CardContainerSettingsComponent } from "./pages/card-container-settings/card-container-settings.component";

const routes: Routes = [
  { path: "container/add", component: CardContainerSelectComponent },
  { path: "container/card/:id/detail", component: CardContainerDetailComponent },
  { path: "container/card/:id/settings", component: CardContainerSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerRoutingModule {}
