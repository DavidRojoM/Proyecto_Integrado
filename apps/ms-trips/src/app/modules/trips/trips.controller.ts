import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  FindAllTripsResponse,
  FindTripResponse,
  InsertTripResponse,
  PayloadActions,
  TripDto,
} from '@proyecto-integrado/shared';
import { TripsService } from './trips.service';

@Controller()
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

  @MessagePattern(PayloadActions.TRIPS.TRIPS.FIND_BY_ID)
  findById(@Payload('id') id: string): Promise<FindTripResponse> {
    return this.tripsService.findById(id);
  }
}
