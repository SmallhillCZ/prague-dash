import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AirQualityService } from './services/air-quality.service';
import { AirQualityController } from './controllers/air-quality.controller';

@Module({
  imports: [SharedModule],
  providers: [AirQualityService],
  controllers: [AirQualityController]
})
export class AirQualityModule { }
