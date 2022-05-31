import { Controller } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  FindAllHotelsResponse,
  HotelDto,
  InsertHotelResponse,
  PayloadActions,
} from '@proyecto-integrado/shared';

@Controller()
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @MessagePattern(PayloadActions.TRIPS.HOTELS.FIND_ALL)
  findAll(): Promise<FindAllHotelsResponse> {
    return this.hotelsService.findAll();
  }

  @MessagePattern(PayloadActions.TRIPS.HOTELS.CREATE)
  create(hotel: HotelDto): Promise<InsertHotelResponse> {
    return this.hotelsService.create(hotel);
  }
}
