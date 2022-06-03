import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserPartyStatus } from '../../domain/enums/user-party-status.enum';
import { UserEntity } from './user.entity';
import { PartyEntity } from './party.entity';

@Entity('user_parties')
export class UserPartiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => UserEntity, (user) => user.userParties, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne((type) => PartyEntity, (party) => party.userParties, {
    onDelete: 'CASCADE',
  })
  party: PartyEntity;

  @Column({
    type: 'enum',
    enum: UserPartyStatus,
    default: UserPartyStatus.PENDING,
  })
  status: UserPartyStatus;
}
