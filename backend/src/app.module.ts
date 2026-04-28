import { Logger, Module, ModuleMetadata } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import minimist from "minimist";
import { Config, ConfigModule } from "./config";
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
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    DatabaseModule,
    RootModule,
    ServeStaticModule.forRootAsync({
      imports: [],
      inject: [Config],
      useFactory: (config: Config) => {
        const logger = new Logger(ServeStaticModule.name);
        logger.log(`Serving static files from ${config.frontend.serve.rootPath} at ${config.frontend.serve.serveRoot}`);
        return [
          {
            rootPath: config.frontend.serve.rootPath,
            serveRoot: config.frontend.serve.serveRoot,
            serveStaticOptions: {
              fallthrough: true,
            },
          },
        ];
      },
    }),
    ...loadFeatureModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
