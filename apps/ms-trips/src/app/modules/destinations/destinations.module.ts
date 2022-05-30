import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationsRepository } from './destinations.repository';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationsRepository])],
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}
