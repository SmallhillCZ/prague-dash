import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ContainersModule } from './modules/containers/containers.module';
import { PublicTransportModule } from './modules/public-transport/public-transport.module';
import { SharedModule } from './shared/shared.module';

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

    PublicTransportModule,

    SharedModule,

    CoreModule,

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
