import { Module } from '@nestjs/common';
import { ProfilesController } from './controllers/profiles/profiles.controller';
import { CityvizorService } from './services/cityvizor.service';

@Module({
  controllers: [ProfilesController],
  providers: [CityvizorService]
})
export class CityvizorModule { }
