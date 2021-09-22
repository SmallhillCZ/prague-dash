import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainersService } from './containers.service';
import { Container } from './entities/container.entity';
import { ContainersController } from './controllers/containers/containers.controller';

@Module({
  providers: [
    ContainersService,
  ],
  imports: [
    TypeOrmModule.forFeature([Container]),
    ConfigModule
  ],
  controllers: [ContainersController]
})
export class ContainersModule { }
