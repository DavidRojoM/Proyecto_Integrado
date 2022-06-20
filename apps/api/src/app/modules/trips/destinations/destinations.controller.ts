import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { LoggingInterceptor } from '../../../shared/interceptors/logging.interceptor';
import { DestinationDto } from '@proyecto-integrado/shared';
import { AuthInterceptor } from '../../auth/interceptors/auth.interceptor';

@UseInterceptors(LoggingInterceptor, AuthInterceptor)
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  getDestinations(): Promise<DestinationDto[]> {
    return this.destinationsService.getDestinations();
  }

  @Post()
  createDestination(
    @Body() destination: DestinationDto
  ): Promise<DestinationDto> {
    return this.destinationsService.createDestination(destination);
  }

  // @Put()
  // updateDestination(destination: DestinationDto): Promise<DestinationDto> {
  //   //TODO
  //   return this.destinationsService.updateDestination(destination);
  // }
  //
  @Delete(':id')
  deleteDestination(
    @Param('id') id: number
  ): Promise<{ destinationId: number }> {
    return this.destinationsService.delete(id);
  }
}
