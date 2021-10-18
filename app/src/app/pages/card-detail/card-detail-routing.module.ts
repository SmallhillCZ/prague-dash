import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailComponent } from './card-detail.component';

const routes: Routes = [
  { path: "", component: CardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardDetailRoutingModule { }
