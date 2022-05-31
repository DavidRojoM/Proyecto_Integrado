import { Controller } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  DestinationDto,
  FindAllDestinationsResponse,
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
}
