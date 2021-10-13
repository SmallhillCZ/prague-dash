import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CARDS } from 'src/app/schema/cards-token';
import { DepartureBoardsCardType } from './departure-boards-card-type';
import { DepartureBoardCardComponent } from './components/departure-board-card/departure-board-card.component';
import { DepartureBoardSelectComponent } from './components/departure-board-select/departure-board-select.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartureBoardSettingsComponent } from './components/departure-board-settings/departure-board-settings.component';
import { RouteBadgeComponent } from './components/route-badge/route-badge.component';


@NgModule({
  declarations: [
    DepartureBoardCardComponent,
    DepartureBoardSelectComponent,
    DepartureBoardSettingsComponent,
    RouteBadgeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    { provide: CARDS, multi: true, useValue: DepartureBoardsCardType }
  ]
})
export class PublicTransportModule { }
