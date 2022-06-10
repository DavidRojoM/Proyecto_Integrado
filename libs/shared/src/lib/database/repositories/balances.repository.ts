import { EntityRepository, Repository } from 'typeorm';
import { BalanceEntity } from '@proyecto-integrado/shared';

@EntityRepository(BalanceEntity)
export class BalancesRepository extends Repository<BalanceEntity> {}
