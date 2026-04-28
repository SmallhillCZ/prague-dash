import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Config } from "src/config";

@Controller("")
@ApiTags("Root")
export class RootController {
  constructor(private config: Config) {}

  @Get("/config")
  getFrontendConfig() {
    return this.config.frontend.config;
  }
}
