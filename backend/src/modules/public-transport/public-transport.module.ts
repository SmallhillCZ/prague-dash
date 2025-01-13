import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { DepartureBoardsController } from './controllers/departure-boards.controller';
import { StopsController } from './controllers/stops.controller';
import { StopPlatform } from './entities/stop-platform.entity';
import { Stop } from './entities/stop.entity';
import { DepartureBoardsService } from './services/departure-boards.service';
import { StopsDownloadService } from './services/stops-download.service';
import { StopsService } from './services/stops.service';
import { VehiclePositionsService } from './services/vehicle-positions.service';
import { VehiclePositionsController } from './controllers/vehicle-positions.controller';
import { PlatformsController } from './controllers/platforms.controller';

@Module({
  providers: [
    StopsService,
    StopsDownloadService,
    DepartureBoardsService,
    VehiclePositionsService,
  ],
  imports: [
    TypeOrmModule.forFeature([Stop, StopPlatform]),
    ConfigModule,
    SharedModule,
  ],
  controllers: [
    StopsController,
    PlatformsController,
    DepartureBoardsController,
    VehiclePositionsController,
  ],
})
export class PublicTransportModule {}
