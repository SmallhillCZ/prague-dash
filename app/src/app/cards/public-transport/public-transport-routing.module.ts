import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartureBoardSelectComponent } from './components/departure-board-select/departure-board-select.component';

const routes: Routes = [
  {
    path: 'public-transport',
    children: [
      {
        path: "departure-boards",
        children: [
          { path: "select", component: DepartureBoardSelectComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicTransportRoutingModule { }