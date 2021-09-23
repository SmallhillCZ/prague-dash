import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add.component';
import { CardSelectComponent } from './components/card-select/card-select.component';

const routes: Routes = [
  { path: ":id", component: CardSelectComponent },
  { path: "", component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule { }
