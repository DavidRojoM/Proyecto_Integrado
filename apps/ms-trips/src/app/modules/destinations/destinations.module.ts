import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { DestinationsRepository } from '@proyecto-integrado/shared';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationsRepository])],
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}
