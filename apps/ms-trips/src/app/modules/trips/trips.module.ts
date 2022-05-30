import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsRepository } from './trips.repository';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TripsRepository])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
