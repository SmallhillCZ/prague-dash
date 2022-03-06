import { NgModule } from "@angular/core";
import { AirQualityModule } from "./air-quality/air-quality.module";
import { AstronomicalModule } from "./astronomical/astronomical.module";
import { ContainerModule } from "./container/container.module";
import { PublicTransportModule } from "./public-transport/public-transport.module";

@NgModule({
  declarations: [],
  imports: [ContainerModule, PublicTransportModule, AirQualityModule, AstronomicalModule],
  exports: [ContainerModule, PublicTransportModule, AirQualityModule, AstronomicalModule],
})
export class CardsModule {}
