import { EntityRepository, Repository } from 'typeorm';
import {
  BalanceEntity,
  ChangeBalancesResponse,
  User,
} from '@proyecto-integrado/shared';

@EntityRepository(BalanceEntity)
export class BalancesRepository extends Repository<BalanceEntity> {
  async updateBalances(config: {
    user: User;
    amount: number;
  }): Promise<ChangeBalancesResponse> {
    const userEntity = User.modelToEntity(config.user);
    try {
      await this.update(
        {
          user: userEntity,
        },
        {
          amount: config.amount,
        }
      );
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
        userId: userEntity.id,
        amount: config.amount,
      },
    };
  }
}
