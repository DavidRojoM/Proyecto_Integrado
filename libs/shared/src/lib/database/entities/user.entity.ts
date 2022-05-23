import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Roles } from '@proyecto-integrado/shared';
import { PartyEntity } from './party.entity';

import * as bcrypt from 'bcrypt';
import { MessageEntity } from './message.entity';

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

  @ManyToMany((type) => PartyEntity, (party) => party.users)
  @JoinTable()
  parties: PartyEntity[];

  @OneToMany((type) => MessageEntity, (message) => message.user)
  @JoinTable()
  messages: MessageEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
