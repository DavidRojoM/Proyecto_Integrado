import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  FindAllTripsResponse,
  InsertTripResponse,
  PayloadActions,
  TripDto,
} from '@proyecto-integrado/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TripsService {
  constructor(
    @Inject('TRIPS_SERVICE') private readonly usersProxy: ClientProxy
  ) {}

  async getTrips(): Promise<TripDto[]> {
    const result = await firstValueFrom(
      this.usersProxy.send<FindAllTripsResponse, any>(
        PayloadActions.TRIPS.TRIPS.FIND_ALL,
        {}
      )
    );

    if (result.ok === false) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  async createTrip(trip: TripDto): Promise<TripDto> {
    const response = await firstValueFrom(
      this.usersProxy.send<InsertTripResponse, TripDto>(
        PayloadActions.TRIPS.TRIPS.CREATE,
        trip
      )
    );

    if (response.ok === false) {
      throw new BadRequestException(response.error);
    }

    return response.value;
  }
}
