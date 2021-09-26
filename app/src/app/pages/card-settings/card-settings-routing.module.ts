import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardSettingsComponent } from './card-settings.component';

const routes: Routes = [
  { path: '', component: CardSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardSettingsRoutingModule { }
