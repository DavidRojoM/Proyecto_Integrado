import { Wishlist, WishlistEntity } from '@proyecto-integrado/shared';
import { EntityRepository, Repository } from 'typeorm';
import { InsertWishlist } from '../../payloads/wishlists/wishlists.payloads';

@EntityRepository(WishlistEntity)
export class WishlistsRepository extends Repository<WishlistEntity> {
  async getWishlists(): Promise<Wishlist[]> {
    const result = await this.createQueryBuilder('wishlist')
      .leftJoinAndSelect('wishlist.user', 'user')
      .leftJoinAndSelect('wishlist.destination', 'destination')
      .orderBy({
        'wishlist.createdAt': 'DESC',
      })
      .getMany();

    return result.map((wishlists) => Wishlist.entityToModel(wishlists));
  }

  async createWishlist(wishlist: Wishlist): Promise<InsertWishlist> {
    const entity = Wishlist.modelToEntity(wishlist);
    try {
      await this.insert(entity);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }
    return {
      ok: true,
      value: Wishlist.entityToModel(entity),
    };
  }
}
