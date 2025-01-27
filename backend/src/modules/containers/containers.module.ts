import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContainersController } from "./controllers/containers.controller";
import { ContainerLog } from "./entities/container-log.entity";
import { ContainersService } from "./services/containers.service";

@Module({
  providers: [ContainersService],
  imports: [TypeOrmModule.forFeature([ContainerLog])],
  controllers: [ContainersController],
  exports: [ContainersService],
})
export class ContainersModule {}
