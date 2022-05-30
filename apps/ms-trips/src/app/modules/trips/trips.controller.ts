import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  FindAllTripsResponse,
  InsertTripResponse,
  PayloadActions,
  TripDto,
} from '@proyecto-integrado/shared';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @MessagePattern(PayloadActions.TRIPS.TRIPS.FIND_ALL)
  findAll(): Promise<FindAllTripsResponse> {
    return this.tripsService.findAll();
  }

  @MessagePattern(PayloadActions.TRIPS.TRIPS.CREATE)
  create(trip: TripDto): Promise<InsertTripResponse> {
    return this.tripsService.create(trip);
  }
}
