import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainersDownloadService } from './services/containers-download.service';
import { ContainersController } from './controllers/containers.controller';
import { ContainersService } from './services/containers.service';
import { Container } from './entities/container.entity';
import { ContainerType } from './entities/container-type.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  providers: [
    ContainersDownloadService,
    ContainersService,
  ],
  imports: [
    TypeOrmModule.forFeature([Container, ContainerType]),
    ConfigModule,
    SharedModule
  ],
  controllers: [ContainersController],
  exports: [ContainersService]
})
export class ContainersModule { }
