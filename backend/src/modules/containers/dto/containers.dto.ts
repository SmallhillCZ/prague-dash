import { OmitType, PickType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { ContainerLog } from "../entities/container-log.entity";
import { ContainerType } from "../entities/container-type.entity";
import { Container } from "../entities/container.entity";

export class GetContainersQuery {
  @IsString() @IsOptional() q?: string;
  @IsNumber() @IsOptional() lat?: number;
  @IsNumber() @IsOptional() lon?: number;
}

export class GetContainerHistoryQuery {
  @IsString() @IsOptional() since?: string;
}

export class GetHistoryResponse extends PickType(ContainerLog, ["timestamp", "occupancy"]) {}

export class GetContainerResponse_ContainerType extends ContainerType {
  occupancy?: number | null;
  occupancy_timestamp?: string | null;
}

export class GetContainerResponse extends OmitType(Container, ["containerTypes"]) {
  containerTypes!: GetContainerResponse_ContainerType[];
}
