import { Injectable } from "@nestjs/common";
import { Config } from "src/config";
import { SDK } from "../sdk";

@Injectable()
export class GolemioService extends SDK {
  constructor(config: Config) {
    super({
      basePath: config.golemio.apiRoot,
      apiKey: config.golemio.token,
    });
  }
}
