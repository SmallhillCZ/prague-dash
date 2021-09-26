import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardSettingsRoutingModule } from './card-settings-routing.module';
import { CardSettingsComponent } from './card-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardCustomSettingsComponent } from './components/card-custom-settings/card-custom-settings.component';


@NgModule({
  declarations: [
    CardSettingsComponent,
    CardCustomSettingsComponent
  ],
  imports: [
    CommonModule,
    CardSettingsRoutingModule,
    SharedModule
  ]
})
export class CardSettingsModule { }
