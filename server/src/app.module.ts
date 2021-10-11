import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainersModule } from './modules/containers/containers.module';
import { StopsModule } from './modules/stops/stops.module';
import { StopsService } from './modules/stops/services/stops.service';
import { StopsController } from './modules/stops/controllers/stops.controller';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

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

    ConfigModule.forRoot(),

    ContainersModule,

    StopsModule,

    SharedModule,

    CoreModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
