import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsModule } from 'src/app/cards/cards.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardContentComponent } from './components/card-content/card-content.component';
import { CardCustomSettingsComponent } from './components/card-custom-settings/card-custom-settings.component';
import { CardDetailContentComponent } from './components/card-detail-content/card-detail-content.component';
import { CardSelectionContentComponent } from './components/card-selection-content/card-selection-content.component';
import { DashCardComponent } from './components/dash-card/dash-card.component';
import { DashRoutingModule } from './dash-routing.module';
import { DashComponent } from './dash.component';
import { DashCardAddComponent } from './views/dash-card-add/dash-card-add.component';
import { DashCardDetailComponent } from './views/dash-card-detail/dash-card-detail.component';
import { DashCardSelectionComponent } from './views/dash-card-selection/dash-card-selection.component';
import { DashCardSettingsComponent } from './views/dash-card-settings/dash-card-settings.component';

@NgModule({
  declarations: [
    /* Views */
    DashComponent,
    DashCardAddComponent,
    DashCardDetailComponent,
    DashCardSelectionComponent,
    DashCardSettingsComponent,

    /* Components */
    DashCardComponent,
    CardContentComponent,
    CardCustomSettingsComponent,
    CardDetailContentComponent,
    CardSelectionContentComponent
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    SharedModule,
    CardsModule,
  ]
})
export class DashModule { }
