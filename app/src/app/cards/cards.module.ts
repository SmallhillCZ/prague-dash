import { NgModule } from '@angular/core';
import { AirQualityModule } from './air-quality/air-quality.module';
import { ContainerModule } from './container/container.module';
import { PublicTransportModule } from './public-transport/public-transport.module';
1;
@NgModule({
  declarations: [],
  imports: [
    ContainerModule,
    PublicTransportModule,
    AirQualityModule
  ],
  exports: [
    ContainerModule,
    PublicTransportModule,
    AirQualityModule
  ]
})
export class CardsModule { }
