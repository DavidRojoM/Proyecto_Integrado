import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { TransportsService } from './transports.service';
import { LoggingInterceptor } from '../../../shared/interceptors/logging.interceptor';
import { TransportDto } from '@proyecto-integrado/shared';

@UseInterceptors(LoggingInterceptor)
@Controller('transports')
export class TransportsController {
  constructor(private readonly transportsService: TransportsService) {}

  @Get()
  getTrips(): Promise<TransportDto[]> {
    return this.transportsService.getTransports();
  }

  @Post()
  createTrip(
    @Body(new ValidationPipe()) trip: TransportDto
  ): Promise<TransportDto> {
    return this.transportsService.createTransport(trip);
  }
}
