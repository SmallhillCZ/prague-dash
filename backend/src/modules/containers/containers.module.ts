import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GolemioModule } from "src/golemio/golemio.module";
import { ContainersController } from "./controllers/containers.controller";
import { ContainerLog } from "./entities/container-log.entity";
import { ContainerType } from "./entities/container-type.entity";
import { Container } from "./entities/container.entity";
import { ContainersService } from "./services/containers.service";

@Module({
  providers: [ContainersService],
  imports: [GolemioModule, TypeOrmModule.forFeature([Container, ContainerType, ContainerLog])],
  controllers: [ContainersController],
  exports: [ContainersService],
})
export class ContainersModule {}
