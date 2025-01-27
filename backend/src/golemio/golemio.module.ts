import { Global, Module } from "@nestjs/common";
import { GolemioOldService } from "./services/golemio-old.service";
import { GolemioService } from "./services/golemio.service";

@Global()
@Module({
  providers: [GolemioOldService, GolemioService],
  exports: [GolemioService, GolemioOldService],
})
export class GolemioModule {}
