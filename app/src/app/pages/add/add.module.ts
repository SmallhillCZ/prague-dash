import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddComponent } from './add.component';
import { CardSelectComponent } from './components/card-select/card-select.component';
import { CardSelectContentComponent } from './components/card-select-content/card-select-content.component';


@NgModule({
  declarations: [
    AddComponent,
    CardSelectComponent,
    CardSelectContentComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    SharedModule
  ]
})
export class AddModule { }
