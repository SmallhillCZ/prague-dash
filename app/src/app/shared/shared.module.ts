import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';



@NgModule({
  declarations: [
    BarChartComponent
  ],
  imports: [
    IonicModule.forRoot({}),
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    IonicModule,
    BarChartComponent
  ]
})
export class SharedModule { }
