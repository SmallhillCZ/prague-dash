import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { ContainersController } from './controllers/containers.controller';
import { ContainerLog } from './entities/container-log.entity';
import { ContainersService } from './services/containers.service';

@Module({
  providers: [
    ContainersService,
  ],
  imports: [
    TypeOrmModule.forFeature([ContainerLog]),
    ConfigModule,
    SharedModule
  ],
  controllers: [ContainersController],
  exports: [ContainersService]
})
export class ContainersModule { }
