import { Injectable } from '@nestjs/common';
import {
  FindAllHotelsResponse,
  Hotel,
  HotelDto,
  HotelsRepository,
  InsertHotelResponse,
} from '@proyecto-integrado/shared';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class HotelsService {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  async findAll(): Promise<FindAllHotelsResponse> {
    try {
      const hotels = await this.hotelsRepository.findAllHotels();
      return {
        ok: true,
        value: hotels.map((hotel) => Hotel.modelToDto(hotel)),
      };
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.response.statusCode,
          statusText: e.response.statusText,
        },
      };
    }
  }

  async create(@Payload() hotel: HotelDto): Promise<InsertHotelResponse> {
    const insertResult = await this.hotelsRepository.createHotel(
      Hotel.dtoToModel(hotel)
    );

    if (!insertResult.ok) {
      return insertResult;
    }

    return {
      ok: true,
      value: Hotel.modelToDto(insertResult.value),
    };
  }
}
