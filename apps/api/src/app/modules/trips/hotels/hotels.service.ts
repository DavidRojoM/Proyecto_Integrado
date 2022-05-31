import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  FindAllHotelsResponse,
  InsertHotelResponse,
  PayloadActions,
  HotelDto,
} from '@proyecto-integrado/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HotelsService {
  constructor(
    @Inject('TRIPS_SERVICE') private readonly tripsProxy: ClientProxy
  ) {}

  async getHotels(): Promise<HotelDto[]> {
    const result = await firstValueFrom(
      this.tripsProxy.send<FindAllHotelsResponse>(
        PayloadActions.TRIPS.HOTELS.FIND_ALL,
        {}
      )
    );

    if (result.ok === false) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  async createHotel(hotel: HotelDto): Promise<HotelDto> {
    const response = await firstValueFrom(
      this.tripsProxy.send<InsertHotelResponse, HotelDto>(
        PayloadActions.TRIPS.HOTELS.CREATE,
        hotel
      )
    );

    if (response.ok === false) {
      throw new BadRequestException(response.error);
    }

    return response.value;
  }
}
