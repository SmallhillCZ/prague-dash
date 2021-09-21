import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CardTramComponent } from './components/card-tram/card-tram.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { CardParkingComponent } from './components/card-parking/card-parking.component';
import { CardTramSettingsComponent } from './components/card-tram-settings/card-tram-settings.component';



@NgModule({
  declarations: [
    CardTramComponent,
    CardTramSettingsComponent,
    CardContainerComponent,
    CardParkingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CardTramComponent,
    CardTramSettingsComponent,
    CardContainerComponent,
    CardParkingComponent
  ]
})
export class CardsModule { }
