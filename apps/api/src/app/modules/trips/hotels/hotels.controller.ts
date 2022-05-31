import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { LoggingInterceptor } from '../../../shared/interceptors/logging.interceptor';
import { HotelDto } from '@proyecto-integrado/shared';

@UseInterceptors(LoggingInterceptor)
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  getHotels(): Promise<HotelDto[]> {
    return this.hotelsService.getHotels();
  }

  @Post()
  createHotel(@Body(new ValidationPipe()) trip: HotelDto): Promise<HotelDto> {
    return this.hotelsService.createHotel(trip);
  }
}
