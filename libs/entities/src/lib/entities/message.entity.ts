import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { PartyEntity } from './party.entity';

@Entity()
export class MessageEntity {
  @ManyToOne((type) => UserEntity, (user) => user.messages)
  user: UserEntity;

  @ManyToOne((type) => PartyEntity, (party) => party.messages)
  party: PartyEntity;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
