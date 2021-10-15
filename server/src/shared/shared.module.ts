import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GolemioService } from './services/golemio.service';

@Module({
  imports: [],
  providers: [GolemioService],
  exports: [GolemioService]
})
export class SharedModule { }
