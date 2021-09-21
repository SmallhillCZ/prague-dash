import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsModule } from 'src/app/cards/cards.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashCardComponent } from './components/dash-card/dash-card.component';
import { DashRoutingModule } from './dash-routing.module';
import { DashComponent } from './dash.component';
import { DashCardContentComponent } from './components/dash-card-content/dash-card-content.component';


@NgModule({
  declarations: [
    DashComponent,
    DashCardComponent,
    DashCardContentComponent
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    SharedModule,
    CardsModule
  ]
})
export class DashModule { }
