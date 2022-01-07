import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashCardAddComponent } from './pages/dash-card-add/dash-card-add.component';
import { DashCardDetailComponent } from './pages/dash-card-detail/dash-card-detail.component';
import { DashCardSelectionComponent } from './pages/dash-card-selection/dash-card-selection.component';
import { DashCardSettingsComponent } from './pages/dash-card-settings/dash-card-settings.component';
import { DashEditPageComponent } from './pages/dash-edit-page/dash-edit-page.component';
import { DashEditComponent } from './pages/dash-edit/dash-edit.component';
import { DashComponent } from './pages/dash/dash.component';

const routes: Routes = [
  { path: 'dash/edit', component: DashEditComponent },

  { path: 'dash', component: DashComponent },

  { path: 'page/:page/edit', component: DashEditPageComponent },

  { path: 'page/:page/add', component: DashCardAddComponent },
  { path: 'page/:page/add/:type', component: DashCardSelectionComponent },

  { path: 'card/:id', component: DashCardDetailComponent },
  { path: 'card/:id/settings', component: DashCardSettingsComponent },

  { path: '', pathMatch: "full", redirectTo: "dash" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
