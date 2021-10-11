import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StopsController } from './controllers/stops.controller';
import { Stop } from './entities/stop.entity';
import { StopsDownloadService } from './services/stops-download.service';
import { StopsService } from './services/stops.service';

@Module({
  providers: [StopsService, StopsDownloadService],
  imports: [
    TypeOrmModule.forFeature([Stop]),
    ConfigModule
  ],
  controllers: [StopsController]
})
export class StopsModule { }
