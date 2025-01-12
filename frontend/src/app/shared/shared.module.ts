import { CommonModule, PercentPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { BarChartComponent } from "./components/bar-chart/bar-chart.component";
import { CardContentComponent } from "./components/card-content/card-content.component";
import { CardTitleComponent } from "./components/card-title/card-title.component";
import { CardComponent } from "./components/card/card.component";
import { ChartsjsChartComponent } from "./components/chartsjs-chart/chartsjs-chart.component";
import { CircleChartComponent } from "./components/circle-chart/circle-chart.component";
import { MapMarkerComponent } from "./components/map-marker/map-marker.component";
import { MapComponent } from "./components/map/map.component";

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
  imports: [IonicModule, CommonModule, FormsModule, PercentPipe],
  exports: [
    FormsModule,
    IonicModule,

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
