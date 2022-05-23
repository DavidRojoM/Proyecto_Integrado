import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';
import { TripEntity } from './trip.entity';

@Entity('parties')
export class PartyEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => MessageEntity, (message) => message.party)
  messages: MessageEntity[];

  @ManyToMany((type) => UserEntity, (user) => user.parties)
  users: UserEntity[];

  @OneToOne((type) => TripEntity, {
    nullable: true,
    cascade: ['remove'],
  })
  trip?: TripEntity;
}
