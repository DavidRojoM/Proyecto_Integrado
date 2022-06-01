import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/browser';
import { DestinationEntity } from '@proyecto-integrado/shared';
import { UserWishlistEntity } from './user-wishlist.entity';

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
    enum: ['F', 'M'],
    nullable: true,
  })
  genderFilter?: string;

  @Column({
    nullable: true,
  })
  departureFilter?: Date;

  @OneToMany(
    (type) => UserWishlistEntity,
    (userWishlist) => userWishlist.wishList
  )
  userWishlists: UserWishlistEntity[];

  @ManyToOne((type) => DestinationEntity, (destination) => destination.wishList)
  @JoinColumn()
  destination: DestinationEntity;
}
