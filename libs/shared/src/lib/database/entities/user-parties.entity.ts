import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserPartyStatus } from '../../domain/enums/user-party-status.enum';
import { UserEntity } from './user.entity';
import { PartyEntity } from './party.entity';

@Entity('user_parties')
export class UserPartiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => UserEntity, (user) => user.userParties)
  user: UserEntity;

  @ManyToOne((type) => PartyEntity, (party) => party.userParties)
  party: PartyEntity;

  @Column({
    type: 'enum',
    enum: UserPartyStatus,
    default: UserPartyStatus.PENDING,
  })
  status: UserPartyStatus;
}
