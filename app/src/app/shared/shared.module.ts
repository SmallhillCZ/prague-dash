import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SwiperModule } from "swiper/angular";
import { BarChartComponent } from "./components/bar-chart/bar-chart.component";
import { CardContentComponent } from "./components/card-content/card-content.component";
import { ChartsjsChartComponent } from "./components/chartsjs-chart/chartsjs-chart.component";
import { CircleChartComponent } from "./components/circle-chart/circle-chart.component";
import { DashCardComponent } from "./components/dash-card/dash-card.component";

@NgModule({
  declarations: [
    /* Card */
    DashCardComponent,
    CardContentComponent,

    /* Charts */
    BarChartComponent,
    CircleChartComponent,
    ChartsjsChartComponent,
  ],
  imports: [IonicModule.forRoot({}), CommonModule, FormsModule, SwiperModule],
  exports: [
    FormsModule,
    IonicModule,
    SwiperModule,

    BarChartComponent,
    CircleChartComponent,
    ChartsjsChartComponent,
    DashCardComponent,
    CardContentComponent,
  ],
})
export class SharedModule {}
