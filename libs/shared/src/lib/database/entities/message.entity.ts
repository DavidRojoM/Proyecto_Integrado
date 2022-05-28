import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PartyEntity } from './party.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'text',
  })
  message: string;

  @ManyToOne((type) => UserEntity, (user) => user.messages)
  user: UserEntity;

  @ManyToOne((type) => PartyEntity, (party) => party.messages)
  party: PartyEntity;
}
