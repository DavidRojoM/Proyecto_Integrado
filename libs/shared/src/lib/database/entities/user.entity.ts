import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { Roles } from '../../domain/enums/roles.enum';

import * as bcrypt from 'bcrypt';
import { MessageEntity } from './message.entity';
import { UserPartiesEntity } from './user-parties.entity';
import { BalanceEntity } from './balances.entity';
import { WishlistEntity } from './wishlist.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  image?: string;

  @Column({
    nullable: true,
  })
  nationality?: string;

  @Column()
  bankAccount: string;

  @Column({
    default: false,
  })
  banned: boolean;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;

  @OneToMany((type) => UserPartiesEntity, (userParty) => userParty.user)
  userParties: UserPartiesEntity[];

  @OneToMany((type) => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  @OneToOne((type) => BalanceEntity, (balance) => balance.user, {
    cascade: true,
  })
  balance: BalanceEntity;

  @OneToMany((type) => WishlistEntity, (wishlistEntity) => wishlistEntity.user)
  wishlists: WishlistEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
