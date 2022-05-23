import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('communities')
export class CommunityEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
