import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContainerSelectComponent } from './components/card-container-select/card-container-select.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContainerService } from './container.service';
import { CardContainerSettingsComponent } from './components/card-container-settings/card-container-settings.component';



@NgModule({
  declarations: [
    CardContainerComponent,
    CardContainerSelectComponent,
    CardContainerSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CardContainerComponent,
    CardContainerSelectComponent
  ]
})
export class ContainerModule {

  // instantiate container service at load
  constructor(private containerService: ContainerService) { }
}
