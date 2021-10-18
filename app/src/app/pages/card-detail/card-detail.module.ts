import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDetailRoutingModule } from './card-detail-routing.module';
import { CardDetailComponent } from './card-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardDetailContentComponent } from './components/card-detail-content/card-detail-content.component';
import { CardsModule } from 'src/app/cards/cards.module';


@NgModule({
  declarations: [
    CardDetailComponent,
    CardDetailContentComponent
  ],
  imports: [
    CommonModule,
    CardDetailRoutingModule,
    SharedModule,
    CardsModule
  ]
})
export class CardDetailModule { }
