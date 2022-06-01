import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TripsRepository } from '@proyecto-integrado/shared';

@Module({
  imports: [TypeOrmModule.forFeature([TripsRepository])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
