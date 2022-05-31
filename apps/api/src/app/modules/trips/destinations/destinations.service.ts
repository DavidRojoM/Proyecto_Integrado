import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  FindAllDestinationsResponse,
  InsertDestinationResponse,
  PayloadActions,
  DestinationDto,
} from '@proyecto-integrado/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DestinationsService {
  constructor(
    @Inject('TRIPS_SERVICE') private readonly tripsProxy: ClientProxy
  ) {}

  async getDestinations(): Promise<DestinationDto[]> {
    const result = await firstValueFrom(
      this.tripsProxy.send<FindAllDestinationsResponse>(
        PayloadActions.TRIPS.DESTINATIONS.FIND_ALL,
        {}
      )
    );

    if (result.ok === false) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  async createDestination(
    destination: DestinationDto
  ): Promise<DestinationDto> {
    const response = await firstValueFrom(
      this.tripsProxy.send<InsertDestinationResponse, DestinationDto>(
        PayloadActions.TRIPS.DESTINATIONS.CREATE,
        destination
      )
    );

    if (response.ok === false) {
      throw new BadRequestException(response.error);
    }

    return response.value;
  }
}
