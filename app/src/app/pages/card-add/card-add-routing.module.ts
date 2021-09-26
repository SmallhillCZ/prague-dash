import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardAddComponent } from './card-add.component';
import { CardSelectComponent } from './components/card-select/card-select.component';

const routes: Routes = [
  { path: ":id", component: CardSelectComponent },
  { path: "", component: CardAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardAddRoutingModule { }
