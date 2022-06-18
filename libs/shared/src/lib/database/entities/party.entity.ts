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
import { PartyStatusEnum } from '../../domain/enums/party-status.enum';

@Entity('parties')
export class PartyEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PartyStatusEnum,
    default: PartyStatusEnum.PENDING,
  })
  status: PartyStatusEnum;

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
