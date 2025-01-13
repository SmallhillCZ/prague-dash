import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { CARDS } from "src/app/schema/cards-token";
import { SharedModule } from "src/app/shared/shared.module";
import { DepartureBoardCardComponent } from "./components/departure-board-card/departure-board-card.component";
import { RouteBadgeComponent } from "./components/route-badge/route-badge.component";
import { DepartureBoardsCardType } from "./departure-boards-card-type";
import { DepartureBoardDetailComponent } from "./pages/departure-board-detail/departure-board-detail.component";
import { DepartureBoardSelectComponent } from "./pages/departure-board-select/departure-board-select.component";
import { DepartureBoardSettingsComponent } from "./pages/departure-board-settings/departure-board-settings.component";
import { VehiclePositionComponent } from "./pages/vehicle-position/vehicle-position.component";
import { DepartureDelayColorPipe } from "./pipes/departure-delay-color.pipe";
import { DepartureDelayPipe } from "./pipes/departure-delay.pipe";
import { DepartureStylePipe } from "./pipes/departure-style.pipe";
import { DepartureTimePipe } from "./pipes/departure-time.pipe";
import { PublicTransportRoutingModule } from "./public-transport-routing.module";

@NgModule({
  declarations: [
    DepartureBoardCardComponent,
    DepartureBoardSelectComponent,
    DepartureBoardSettingsComponent,
    RouteBadgeComponent,
    DepartureBoardDetailComponent,
    DepartureTimePipe,
    DepartureStylePipe,
    DepartureDelayPipe,
    DepartureDelayColorPipe,
    VehiclePositionComponent,
  ],
  imports: [CommonModule, SharedModule, PublicTransportRoutingModule],
  providers: [DatePipe, { provide: CARDS, multi: true, useValue: DepartureBoardsCardType }],
  exports: [PublicTransportRoutingModule],
})
export class PublicTransportModule {}
