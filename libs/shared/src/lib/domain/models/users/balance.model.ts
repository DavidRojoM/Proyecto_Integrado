import { BalanceEntity } from '@proyecto-integrado/shared';

export class Balance {
  id: number;
  userId: string;
  amount: number;

  static modelToEntity(balance: Balance): BalanceEntity {
    const entity = new BalanceEntity();
    entity.amount = balance.amount;
    return entity;
  }

  static entityToModel(balance: BalanceEntity): Balance {
    const model = new Balance();
    model.id = balance.id;
    model.amount = balance.amount;
    return model;
  }
}
