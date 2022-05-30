import { EntityRepository, Repository } from 'typeorm';
import { TransportEntity } from '@proyecto-integrado/shared';

@EntityRepository(TransportEntity)
export class TransportsRepository extends Repository<TransportEntity> {}
