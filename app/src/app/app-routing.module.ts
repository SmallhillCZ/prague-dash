import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import("./modules/dash/dash.module").then(m => m.DashModule) },

  { path: 'settings', loadChildren: () => import("./modules/settings/settings.module").then(m => m.SettingsModule) },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
