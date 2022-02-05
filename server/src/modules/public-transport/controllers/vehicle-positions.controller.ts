import { Controller, Get, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import axios from 'axios';
import { GolemioService } from 'src/shared/services/golemio.service';
import { VehiclePositionResponse } from '../schema/vehicle-position-response';

@Controller('vehicle-positions')
export class VehiclePositionsController {

  constructor(
    private golemio: GolemioService
  ) { }

  @Get(":trip_id")
  async getVehiclePosition(@Param("trip_id") tripId: string) {
    try {
      return await this.golemio.get<VehiclePositionResponse>(`vehiclepositions/${tripId}`)
        .then(res => res.data);
    }
    catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        throw new NotFoundException();
      }
      else {
        throw new InternalServerErrorException();
      }
    }
  }
}
