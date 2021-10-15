import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CARDS } from 'src/app/schema/cards-token';
import { SharedModule } from 'src/app/shared/shared.module';
import { AirQualityStationCardType } from './air-quality-station-card-type';
import { CardAirQualityStationSelectComponent } from './components/card-air-quality-station-select/card-air-quality-station-select.component';
import { CardAirQualityStationComponent } from './components/card-air-quality-station/card-air-quality-station.component';


@NgModule({
  declarations: [
    CardAirQualityStationComponent,
    CardAirQualityStationSelectComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CardAirQualityStationComponent,
    CardAirQualityStationSelectComponent,
  ],
  providers: [
    { provide: CARDS, multi: true, useValue: AirQualityStationCardType }
  ]
})
export class AirQualityModule {
}
