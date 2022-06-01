import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TripsService } from './trips.service';
import { LoggingInterceptor } from '../../../shared/interceptors/logging.interceptor';
import { TripDto } from '@proyecto-integrado/shared';

@UseInterceptors(LoggingInterceptor)
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  getTrips(): Promise<TripDto[]> {
    return this.tripsService.getTrips();
  }

  @Post()
  createTrip(@Body() trip: TripDto): Promise<TripDto> {
    return this.tripsService.createTrip(trip);
  }
}
