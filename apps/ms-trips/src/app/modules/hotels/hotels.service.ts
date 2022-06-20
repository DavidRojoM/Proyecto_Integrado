import { Injectable } from '@nestjs/common';
import {
  DeleteTripAggregateResponse,
  FindAllHotelsResponse,
  Hotel,
  HotelDto,
  HotelsRepository,
  InsertHotelResponse,
  Transport,
  UpdateHotelResponse,
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

  async delete(id: number): Promise<DeleteTripAggregateResponse> {
    return this.hotelsRepository.deleteById(id);
  }

  async update(hotel: HotelDto): Promise<UpdateHotelResponse> {
    const model = Hotel.dtoToModel(hotel);
    const res = await this.hotelsRepository.updateHotel(model);
    if (res.ok === false) {
      return res;
    }
    return {
      ok: true,
      value: Hotel.modelToDto(res.value),
    };
  }
}
