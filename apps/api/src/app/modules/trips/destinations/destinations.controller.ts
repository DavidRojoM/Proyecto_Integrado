import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { LoggingInterceptor } from '../../../shared/interceptors/logging.interceptor';
import { DestinationDto } from '@proyecto-integrado/shared';

@UseInterceptors(LoggingInterceptor)
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  getDestinations(): Promise<DestinationDto[]> {
    return this.destinationsService.getDestinations();
  }

  @Post()
  createDestination(
    @Body(new ValidationPipe()) destination: DestinationDto
  ): Promise<DestinationDto> {
    return this.destinationsService.createDestination(destination);
  }
}
