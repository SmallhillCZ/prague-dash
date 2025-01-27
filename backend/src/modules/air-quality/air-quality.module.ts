import { Module } from "@nestjs/common";
import { GolemioModule } from "src/golemio/golemio.module";
import { AirQualityController } from "./controllers/air-quality.controller";
import { AirQualityService } from "./services/air-quality.service";

@Module({
  imports: [GolemioModule],
  providers: [AirQualityService],
  controllers: [AirQualityController],
})
export class AirQualityModule {}
