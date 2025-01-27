import { Logger, Module, ModuleMetadata } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import * as minimist from "minimist";
import { AppController } from "./app.controller";
import { ConfigModule } from "./config";
import { DatabaseModule } from "./database/database.module";
import { Modules } from "./modules/modules";

/** DECIDE WHICH MODULES TO LOAD
 *
 * Usage: npm run dev -- -- containers air-quality
 */
const logger = new Logger("AppModule");

var argv = minimist(process.argv.slice(2));

let loadModules: ModuleMetadata["imports"] = [];
let modules = argv["_"] || [];

if (modules.length) {
  logger.log(`Loading modules: ${modules}`);
  loadModules = modules.filter((item): item is keyof typeof Modules => item in Modules).map((item) => Modules[item]);
} else {
  logger.log(`Loading all modules`);
  loadModules = Object.values(Modules);
}

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule, DatabaseModule, ...loadModules],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
