import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardAddComponent } from './card-add.component';
import { CardSelectionComponent } from './components/card-selection/card-selection.component';

const routes: Routes = [
  { path: ":id", component: CardSelectionComponent },
  { path: "", component: CardAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardAddRoutingModule { }
