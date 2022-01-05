import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
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
    SwiperModule
  ],
  exports: [
    FormsModule,
    IonicModule,
    SwiperModule,

    BarChartComponent,
    CircleChartComponent,
    ChartsjsChartComponent
  ]
})
export class SharedModule { }
