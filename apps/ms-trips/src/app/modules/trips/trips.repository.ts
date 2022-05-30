import { EntityRepository, Repository } from 'typeorm';
import { TripEntity } from '@proyecto-integrado/shared';

@EntityRepository(TripEntity)
export class TripsRepository extends Repository<TripEntity> {}
