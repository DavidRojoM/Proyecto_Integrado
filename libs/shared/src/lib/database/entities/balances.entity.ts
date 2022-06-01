import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm/browser';
import { UserEntity } from '@proyecto-integrado/shared';

@Entity('balances')
export class BalanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @OneToOne((type) => UserEntity, (user) => user.balance)
  user: UserEntity;
}
