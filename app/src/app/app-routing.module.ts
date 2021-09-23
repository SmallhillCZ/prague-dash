import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: 'add', loadChildren: () => import("./pages/add/add.module").then(m => m.AddModule) },

  { path: 'dash', loadChildren: () => import("./pages/dash/dash.module").then(m => m.DashModule) },

  { path: '', pathMatch: 'full', redirectTo: 'dash' },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
