import { Controller } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  DeleteTripAggregateResponse,
  DestinationDto,
  FindAllDestinationsResponse,
  FindDestination,
  InsertDestinationResponse,
  PayloadActions,
} from '@proyecto-integrado/shared';

@Controller()
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @MessagePattern(PayloadActions.TRIPS.DESTINATIONS.FIND_ALL)
  findAll(): Promise<FindAllDestinationsResponse> {
    return this.destinationsService.findAll();
  }

  @MessagePattern(PayloadActions.TRIPS.DESTINATIONS.CREATE)
  create(destination: DestinationDto): Promise<InsertDestinationResponse> {
    return this.destinationsService.create(destination);
  }

  @MessagePattern(PayloadActions.TRIPS.DESTINATIONS.FIND_BY_ID)
  findById(@Payload('id') id: number): Promise<FindDestination> {
    return this.destinationsService.findById(id);
  }

  @MessagePattern(PayloadActions.TRIPS.DESTINATIONS.DELETE)
  delete(
    @Payload('destinationId') destinationId: number
  ): Promise<DeleteTripAggregateResponse> {
    return this.destinationsService.delete(destinationId);
  }
}
