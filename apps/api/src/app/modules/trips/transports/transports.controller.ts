import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { LoggingInterceptor } from '../../../shared/interceptors/logging.interceptor';
import { TransportDto } from '@proyecto-integrado/shared';
import { AuthInterceptor } from '../../auth/interceptors/auth.interceptor';

@UseInterceptors(LoggingInterceptor, AuthInterceptor)
@Controller('transports')
export class TransportsController {
  constructor(private readonly transportsService: TransportsService) {}

  @Get()
  getTransports(): Promise<TransportDto[]> {
    return this.transportsService.getTransports();
  }

  @Post()
  createTransport(@Body() trip: TransportDto): Promise<TransportDto> {
    return this.transportsService.createTransport(trip);
  }
}
