import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { LoggingInterceptor } from '../../../shared/interceptors/logging.interceptor';
import { HotelDto } from '@proyecto-integrado/shared';
import { AuthInterceptor } from '../../auth/interceptors/auth.interceptor';

@UseInterceptors(LoggingInterceptor, AuthInterceptor)
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  getHotels(): Promise<HotelDto[]> {
    return this.hotelsService.getHotels();
  }

  @Post()
  createHotel(@Body() trip: HotelDto): Promise<HotelDto> {
    return this.hotelsService.createHotel(trip);
  }
}
