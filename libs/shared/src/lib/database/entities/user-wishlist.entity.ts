import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@proyecto-integrado/shared';
import { WishlistEntity } from './wishlist.entity';

@Entity('user_wishlist')
export class UserWishlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => WishlistEntity, (wishList) => wishList.userWishlists)
  wishList: WishlistEntity;

  @ManyToOne((type) => UserEntity, (user) => user.userWishlists)
  user: UserEntity;
}
