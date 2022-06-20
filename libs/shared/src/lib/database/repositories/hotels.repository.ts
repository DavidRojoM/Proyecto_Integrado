import { EntityRepository, Repository } from 'typeorm';
import {
  DeleteTripAggregateResponse,
  Hotel,
  HotelEntity,
  InsertHotel,
  Transport,
  UpdateHotel,
  UpdateTransport,
} from '@proyecto-integrado/shared';

@EntityRepository(HotelEntity)
export class HotelsRepository extends Repository<HotelEntity> {
  async findAllHotels(): Promise<Hotel[]> {
    const result = await this.createQueryBuilder().getMany();

    return result.map((hotel) => Hotel.entityToModel(hotel));
  }

  async createHotel(hotel: Hotel): Promise<InsertHotel> {
    const entity = Hotel.modelToEntity(hotel);
    let insertedEntity;
    try {
      insertedEntity = await this.save(entity);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }

    return {
      ok: true,
      value: Hotel.entityToModel(insertedEntity),
    };
  }

  async findById(id: number) {
    const result = await this.createQueryBuilder('hotel')
      .select()
      .where('hotel.id = :id', { id })
      .getOne();
    if (!result) {
      return null;
    }
    return Hotel.entityToModel(result);
  }

  async deleteById(id: number): Promise<DeleteTripAggregateResponse> {
    try {
      await this.createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }
    return {
      ok: true,
      value: {
        id: id,
      },
    };
  }

  async updateHotel(model: Hotel): Promise<UpdateHotel> {
    const entity = Hotel.modelToEntity(model);
    let result;
    try {
      result = await this.save(entity);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }
    return {
      ok: true,
      value: Hotel.entityToModel(result),
    };
  }
}
