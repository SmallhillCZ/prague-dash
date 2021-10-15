import { Module } from '@nestjs/common';
import { GolemioService } from './services/golemio.service';

@Module({
  providers: [GolemioService]
})
export class CoreModule { }
