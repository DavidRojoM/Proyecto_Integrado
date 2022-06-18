import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  DestinationEntity,
  GenderEnum,
  UserEntity,
} from '@proyecto-integrado/shared';

@Entity('wishlist')
export class WishlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  ageFilter?: number;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    nullable: true,
  })
  genderFilter?: GenderEnum;

  @Column({
    nullable: true,
  })
  departureFilter?: Date;

  @ManyToOne((type) => UserEntity, (user) => user.wishlists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne((type) => DestinationEntity, (destination) => destination.wishList)
  @JoinColumn()
  destination: DestinationEntity;

  @CreateDateColumn()
  createdAt: Date;
}
