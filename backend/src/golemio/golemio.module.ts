import { Module } from "@nestjs/common";
import { GolemioClient } from "golemio-sdk";
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
  ],
  exports: [GolemioClient],
})
export class GolemioModule {}
