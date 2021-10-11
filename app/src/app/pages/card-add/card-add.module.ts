import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardAddRoutingModule } from './card-add-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardAddComponent } from './card-add.component';
import { CardSelectionComponent } from './components/card-selection/card-selection.component';
import { CardsModule } from 'src/app/cards/cards.module';
import { CardSelectionContentComponent } from './components/card-selection-content/card-selection-content.component';


@NgModule({
  declarations: [
    CardAddComponent,
    CardSelectionComponent,
    CardSelectionContentComponent,
  ],
  imports: [
    CommonModule,
    CardAddRoutingModule,
    SharedModule,
    CardsModule
  ]
})
export class CardAddModule { }
