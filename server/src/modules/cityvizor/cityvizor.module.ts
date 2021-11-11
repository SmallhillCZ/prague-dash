import { Module } from '@nestjs/common';
import { PaymentsController } from './controllers/payments.controller';
import { ProfilesController } from './controllers/profiles.controller';
import { CityvizorService } from './services/cityvizor.service';

@Module({
  controllers: [
    ProfilesController,
    PaymentsController
  ],
  providers: [CityvizorService]
})
export class CityvizorModule { }
