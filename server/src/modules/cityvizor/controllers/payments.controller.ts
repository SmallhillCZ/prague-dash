import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { CityvizorService, GetPaymentsOptions } from '../services/cityvizor.service';

@Controller('cityvizor/payments')
export class PaymentsController {

  constructor(
    private cityvizor: CityvizorService
  ) { }

  @Get(":profile")
  getPayments(@Param("profile") profile?: string) {

    if (!profile) throw new BadRequestException("Missing profile parameter.");

    const options: GetPaymentsOptions = {
      limit: 10,
      profile: Number(profile),
      year: (new Date()).getFullYear()
    };

    return this.cityvizor.getPayments(options);
  }
}
