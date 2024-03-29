import { EntityRepository, Repository } from 'typeorm';
import {
  FindTrip,
  InsertTrip,
  Trip,
  TripEntity,
} from '@proyecto-integrado/shared';

@EntityRepository(TripEntity)
export class TripsRepository extends Repository<TripEntity> {
  async findAllTrips(): Promise<Trip[]> {
    const result = await this.createQueryBuilder('trip')
      .leftJoinAndSelect('trip.destination', 'destination')
      .leftJoinAndSelect('trip.hotel', 'hotel')
      .leftJoinAndSelect('trip.transport', 'transport')
      .getMany();

    return result.map((trip) => Trip.entityToModel(trip));
  }

  async createTrip(trip: Trip): Promise<InsertTrip> {
    const entity = Trip.modelToEntity(trip);
    try {
      await this.insert(entity);
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
      value: Trip.entityToModel(entity),
    };
  }

  async findById(id: string): Promise<FindTrip> {
    let result;
    try {
      result = await this.createQueryBuilder('trip')
        .leftJoinAndSelect('trip.destination', 'destination')
        .leftJoinAndSelect('trip.hotel', 'hotel')
        .leftJoinAndSelect('trip.transport', 'transport')
        .where('trip.id = :id', { id })
        .getOneOrFail();
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
      value: Trip.entityToModel(result),
    };
  }
}
