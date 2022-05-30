import { EntityRepository, Repository } from 'typeorm';
import { DestinationEntity } from '@proyecto-integrado/shared';

@EntityRepository(DestinationEntity)
export class DestinationsRepository extends Repository<DestinationEntity> {}
