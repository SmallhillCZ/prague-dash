import { AirQualityModule } from "./air-quality/air-quality.module";
import { CityvizorModule } from "./cityvizor/cityvizor.module";
import { ContainersModule } from "./containers/containers.module";
import { PublicTransportModule } from "./public-transport/public-transport.module";

export const Modules = {
  "containers": ContainersModule,
  "public-transport": PublicTransportModule,
  "air-quality": AirQualityModule,
  "cityvizor": CityvizorModule,
};