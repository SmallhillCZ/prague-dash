import { NgModule } from '@angular/core';
import { ContainerModule } from './container/container.module';
import { PublicTransportModule } from './public-transport/public-transport.module';
1;
@NgModule({
  declarations: [],
  imports: [
    ContainerModule,
    PublicTransportModule
  ],
  exports: [
    ContainerModule,
    PublicTransportModule
  ]
})
export class CardsModule { }
