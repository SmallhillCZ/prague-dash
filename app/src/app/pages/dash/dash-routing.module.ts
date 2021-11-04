import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash.component';
import { DashCardAddComponent } from './views/dash-card-add/dash-card-add.component';
import { DashCardDetailComponent } from './views/dash-card-detail/dash-card-detail.component';
import { DashCardSelectionComponent } from './views/dash-card-selection/dash-card-selection.component';
import { DashCardSettingsComponent } from './views/dash-card-settings/dash-card-settings.component';

const routes: Routes = [
  { path: 'dash', component: DashComponent },
  { path: 'dash/add', component: DashCardAddComponent },
  { path: 'dash/add/:id', component: DashCardSelectionComponent },

  { path: 'card/:id', component: DashCardDetailComponent },
  { path: 'card/:id/settings', component: DashCardSettingsComponent },

  { path: '', pathMatch: "full", redirectTo: "dash" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
