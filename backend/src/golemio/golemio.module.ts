import { Module } from "@nestjs/common";
import { GolemioClient, GolemioPublicTransportClient } from "golemio-sdk";
import { Config } from "src/config";

@Module({
  providers: [
    {
      provide: GolemioClient,
      inject: [Config],
      useFactory: (config: Config) => {
        return new GolemioClient({ token: config.golemio.token });
      },
    },
    {
      provide: GolemioPublicTransportClient,
      inject: [Config],
      useFactory: (config: Config) => {
        return new GolemioPublicTransportClient({ token: config.golemio.token });
      },
    },
  ],
  exports: [GolemioClient, GolemioPublicTransportClient],
})
export class GolemioModule {}
