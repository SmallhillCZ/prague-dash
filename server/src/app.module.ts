import { Logger, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as minimist from "minimist";
import { AppController } from './app.controller';
import { Modules } from './modules/modules';
import { SharedModule } from './shared/shared.module';

/* DECIDE WHICH MODULES TO LOAD */
const logger = new Logger("AppModule");

var argv = minimist(process.argv.slice(2));

let loadModules: ModuleMetadata["imports"] = [];
let modules = argv["_"] || [];

if (modules.length) {
  logger.log(`Loading modules: ${modules}`);
  loadModules = modules.map(item => Modules[item]);
}
else {
  logger.log(`Loading all modules`);
  loadModules = Object.values(Modules);
}

@Module({
  imports: [
    ScheduleModule.forRoot(),

    TypeOrmModule.forRoot(),

    ConfigModule.forRoot({ isGlobal: true }),

    SharedModule,

    ...loadModules

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
