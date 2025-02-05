import { PickType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { ContainerLog } from "../entities/container-log.entity";

export class GetContainersQuery {
  @IsString() @IsOptional() q?: string;
  @IsNumber() @IsOptional() lat?: number;
  @IsNumber() @IsOptional() lon?: number;
}

export class GetContainerHistoryQuery {
  @IsString() @IsOptional() since?: string;
}

export class GetHistoryResponse extends PickType(ContainerLog, ["timestamp", "occupancy"]) {}
