import { Controller, Get, InternalServerErrorException, NotFoundException, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import axios from "axios";
import { GolemioClient } from "golemio-sdk";
import { VehiclePositionResponse } from "../dto/vehicle-position-response.dto";

@Controller("vehicle-positions")
@ApiTags("Public Transport")
export class VehiclePositionsController {
  constructor(private golemio: GolemioClient) {}

  @Get(":trip_id")
  async getVehiclePosition(@Param("trip_id") tripId: string): Promise<VehiclePositionResponse> {
    try {
      return (await this.golemio.PublicTransport.PIDRealtimePositionsV2Api.v2VehiclepositionsGtfsTripIdGet(
        tripId,
        {},
        {},
      ).then((res) => res.data)) as VehiclePositionResponse;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        throw new NotFoundException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
