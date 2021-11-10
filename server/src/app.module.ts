import { Logger, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ContainersModule } from './modules/containers/containers.module';
import { PublicTransportModule } from './modules/public-transport/public-transport.module';
import { SharedModule } from './shared/shared.module';
import { AirQualityModule } from './modules/air-quality/air-quality.module';
import { CityvizorModule } from './modules/cityvizor/cityvizor.module';
import * as minimist from "minimist";
import { Modules } from './modules/modules';

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

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: ["dist/**/*.entity{.ts,.js}"],
      dropSchema: true,
      synchronize: true,
    }),

    ConfigModule.forRoot({ isGlobal: true }),

    SharedModule,

    ...loadModules

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
