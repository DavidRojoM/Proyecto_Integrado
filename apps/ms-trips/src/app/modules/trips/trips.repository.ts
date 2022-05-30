import { EntityRepository, Repository } from 'typeorm';
import { Trip, TripEntity } from '@proyecto-integrado/shared';
import { BadRequestException } from '@nestjs/common';

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

  async createTrip(trip: Trip): Promise<Trip> {
    const entity = Trip.modelToEntity(trip);

    let result;
    try {
      result = await this.save(entity);
    } catch (e) {
      throw new BadRequestException({
        statusCode: 400,
        statusText: 'Unable to insert trip',
      });
    }

    return Trip.entityToModel(result);
  }
}
