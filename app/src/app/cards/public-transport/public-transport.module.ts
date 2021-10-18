import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CARDS } from 'src/app/schema/cards-token';
import { DepartureBoardsCardType } from './departure-boards-card-type';
import { DepartureBoardCardComponent } from './components/departure-board-card/departure-board-card.component';
import { DepartureBoardSelectComponent } from './components/departure-board-select/departure-board-select.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartureBoardSettingsComponent } from './components/departure-board-settings/departure-board-settings.component';
import { RouteBadgeComponent } from './components/route-badge/route-badge.component';
import { DepartureBoardDetailComponent } from './components/departure-board-detail/departure-board-detail.component';
import { DepartureBoardContentComponent } from './components/departure-board-content/departure-board-content.component';


@NgModule({
  declarations: [
    DepartureBoardContentComponent,
    DepartureBoardCardComponent,
    DepartureBoardSelectComponent,
    DepartureBoardSettingsComponent,
    RouteBadgeComponent,
    DepartureBoardDetailComponent
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
