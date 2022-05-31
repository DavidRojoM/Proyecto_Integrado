import { EntityRepository, Repository } from 'typeorm';
import { InsertTrip, Trip, TripEntity } from '@proyecto-integrado/shared';

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
          statusCode: 400,
          statusText: 'User already exists',
        },
      };
    }
    return {
      ok: true,
      value: Trip.entityToModel(entity),
    };
  }
}
