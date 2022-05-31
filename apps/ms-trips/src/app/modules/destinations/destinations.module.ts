import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationsRepository } from './destinations.repository';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationsRepository])],
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}
