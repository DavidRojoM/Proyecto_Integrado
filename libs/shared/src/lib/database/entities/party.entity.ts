import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';
import { TripEntity } from './trip.entity';
import { UserPartiesEntity } from './user-parties.entity';

@Entity('parties')
export class PartyEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => MessageEntity, (message) => message.party)
  messages: MessageEntity[];

  @OneToMany((type) => UserPartiesEntity, (userParty) => userParty.party)
  userParties: UserPartiesEntity[];

  @OneToOne((type) => TripEntity, {
    nullable: true,
    cascade: ['remove'],
  })
  @JoinColumn()
  trip?: TripEntity;
}
