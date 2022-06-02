import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
  @JoinColumn()
  user: UserEntity;
}
