import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CARDS } from 'src/app/schema/cards-token';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartureBoardCardComponent } from './components/departure-board-card/departure-board-card.component';
import { DepartureBoardDetailComponent } from './components/departure-board-detail/departure-board-detail.component';
import { DepartureBoardSelectComponent } from './components/departure-board-select/departure-board-select.component';
import { DepartureBoardSettingsComponent } from './components/departure-board-settings/departure-board-settings.component';
import { RouteBadgeComponent } from './components/route-badge/route-badge.component';
import { DepartureBoardsCardType } from './departure-boards-card-type';
import { DepartureDelayColorPipe } from './pipes/departure-delay-color.pipe';
import { DepartureDelayPipe } from './pipes/departure-delay.pipe';
import { DepartureTimePipe } from './pipes/departure-time.pipe';
import { RouteStylePipe } from './pipes/route-style.pipe';


@NgModule({
  declarations: [
    DepartureBoardCardComponent,
    DepartureBoardSelectComponent,
    DepartureBoardSettingsComponent,
    RouteBadgeComponent,
    DepartureBoardDetailComponent,
    DepartureTimePipe,
    RouteStylePipe,
    DepartureDelayPipe,
    DepartureDelayColorPipe
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    DatePipe,
    { provide: CARDS, multi: true, useValue: DepartureBoardsCardType }
  ]
})
export class PublicTransportModule { }
