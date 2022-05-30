import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripDto } from '@proyecto-integrado/shared';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  getTrips(): Promise<TripDto[]> {
    return this.tripsService.getTrips();
  }

  @Post()
  createTrip(@Body(new ValidationPipe()) trip: TripDto): Promise<TripDto> {
    return this.tripsService.createTrip(trip);
  }
}
