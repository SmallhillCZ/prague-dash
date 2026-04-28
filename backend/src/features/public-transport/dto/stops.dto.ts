import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetStopsQuery {
  @IsString() @IsOptional() q?: string;
  @IsNumber() @IsOptional() lat?: number;
  @IsNumber() @IsOptional() lon?: number;
  @IsNumber() @IsOptional() offset?: number;
  @IsNumber() @IsOptional() limit?: number;
}

export class GetClosestStopQuery {
  @IsNumber() lat!: number;
  @IsNumber() lon!: number;
}
