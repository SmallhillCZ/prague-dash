import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsModule } from '../cards/cards.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardsModule
  ],
})
export class CoreModule { }
