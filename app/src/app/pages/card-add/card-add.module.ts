import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardAddRoutingModule } from './card-add-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardAddComponent } from './card-add.component';
import { CardSelectComponent } from './components/card-select/card-select.component';
import { CardSelectContentComponent } from './components/card-select-content/card-select-content.component';


@NgModule({
  declarations: [
    CardAddComponent,
    CardSelectComponent,
    CardSelectContentComponent
  ],
  imports: [
    CommonModule,
    CardAddRoutingModule,
    SharedModule
  ]
})
export class CardAddModule { }
