import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';

@Entity()
export class PartyEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => MessageEntity, (message) => message.party)
  messages: MessageEntity[];

  @ManyToMany((type) => UserEntity, (user) => user.parties)
  users: UserEntity[];
}
