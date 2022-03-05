import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SwiperModule } from "swiper/angular";
import { BarChartComponent } from "./components/bar-chart/bar-chart.component";
import { ChartsjsChartComponent } from "./components/chartsjs-chart/chartsjs-chart.component";
import { CircleChartComponent } from "./components/circle-chart/circle-chart.component";
import { CardComponent } from "./components/card/card.component";
import { CardContentComponent } from "./components/card-content/card-content.component";
import { CardTitleComponent } from "./components/card-title/card-title.component";
import { MapComponent } from "./components/map/map.component";
import { MapMarkerComponent } from "./components/map-marker/map-marker.component";

@NgModule({
  declarations: [
    /* Card */
    CardComponent,

    /* Charts */
    BarChartComponent,
    CircleChartComponent,
    ChartsjsChartComponent,
    CardContentComponent,
    CardTitleComponent,
    MapComponent,
    MapMarkerComponent,
  ],
  imports: [IonicModule.forRoot({}), CommonModule, FormsModule, SwiperModule],
  exports: [
    FormsModule,
    IonicModule,
    SwiperModule,

    BarChartComponent,
    CircleChartComponent,
    ChartsjsChartComponent,
    CardComponent,
    CardContentComponent,
    CardTitleComponent,
    MapComponent,
    MapMarkerComponent,
  ],
})
export class SharedModule {}
