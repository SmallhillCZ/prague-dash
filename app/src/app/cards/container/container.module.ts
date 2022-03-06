import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CARDS } from "src/app/schema/cards-token";
import { SharedModule } from "src/app/shared/shared.module";
import { CardContainerComponent } from "./components/card-container/card-container.component";
import { ContainerDetailCardComponent } from "./components/container-detail-card/container-detail-card.component";
import { ContainerCardType } from "./container-card-type";
import { ContainerRoutingModule } from "./container-routing.module";
import { CardContainerDetailComponent } from "./pages/card-container-detail/card-container-detail.component";
import { CardContainerSelectComponent } from "./pages/card-container-select/card-container-select.component";
import { CardContainerSettingsComponent } from "./pages/card-container-settings/card-container-settings.component";
import { ContainerService } from "./services/container.service";

@NgModule({
  declarations: [
    CardContainerComponent,
    CardContainerSelectComponent,
    CardContainerSettingsComponent,
    CardContainerDetailComponent,
    ContainerDetailCardComponent,
  ],
  imports: [CommonModule, SharedModule, ContainerRoutingModule],
  exports: [CardContainerComponent, CardContainerSelectComponent],
  providers: [{ provide: CARDS, multi: true, useValue: ContainerCardType }],
})
export class ContainerModule {
  // instantiate container service at load
  constructor(private containerService: ContainerService) {}
}
