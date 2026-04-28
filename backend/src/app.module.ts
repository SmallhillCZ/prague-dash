import { Logger, Module, ModuleMetadata } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import minimist from "minimist";
import { ConfigModule } from "./config";
import { DatabaseModule } from "./database/database.module";
import { FeatureModules } from "./features";
import { RootModule } from "./modules/root/root.module";

/** DECIDE WHICH MODULES TO LOAD
 *
 * Usage: npm run dev -- -- containers air-quality
 */
const logger = new Logger("AppModule");

var argv = minimist(process.argv.slice(2));

let loadFeatureModules: ModuleMetadata["imports"] = [];
let featureModules = argv["_"] || [];

if (featureModules.length) {
  logger.log(`Loading modules: ${featureModules}`);
  loadFeatureModules = featureModules
    .filter((item): item is keyof typeof FeatureModules => item in FeatureModules)
    .map((item) => FeatureModules[item]);
} else {
  logger.log(`Loading all modules`);
  loadFeatureModules = Object.values(FeatureModules);
}

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule, DatabaseModule, RootModule, ...loadFeatureModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
