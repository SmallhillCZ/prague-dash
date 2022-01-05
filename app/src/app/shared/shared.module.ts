import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ChartsjsChartComponent } from './components/chartsjs-chart/chartsjs-chart.component';
import { CircleChartComponent } from './components/circle-chart/circle-chart.component';



@NgModule({
  declarations: [
    BarChartComponent,
    CircleChartComponent,
    ChartsjsChartComponent
  ],
  imports: [
    IonicModule.forRoot({}),
    CommonModule,
    FormsModule,
  ],
  exports: [
    FormsModule,
    IonicModule,

    BarChartComponent,
    CircleChartComponent,
    ChartsjsChartComponent
  ]
})
export class SharedModule { }
