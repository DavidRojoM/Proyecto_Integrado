import { Inject, Injectable } from '@nestjs/common';
import {
  FindAllWishlists,
  FindDestination,
  FindUser,
  FindUserByIdPayload,
  InsertWishlist,
  PayloadActions,
  Wishlist,
  WishlistDto,
  WishlistsRepository,
} from '@proyecto-integrado/shared';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WishlistsService {
  constructor(
    private readonly wishlistsRepository: WishlistsRepository,
    @Inject('TRIPS_SERVICE') private readonly tripsService: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy
  ) {}
  async create(wishlist: WishlistDto): Promise<InsertWishlist> {
    const model = Wishlist.dtoToModel(wishlist);

    const findDestinationRes = await firstValueFrom(
      this.tripsService.send<FindDestination, { id: number }>(
        PayloadActions.TRIPS.DESTINATIONS.FIND_BY_ID,
        { id: wishlist.destinationId }
      )
    );

    if (findDestinationRes.ok === false) {
      return findDestinationRes;
    }

    model.destination = findDestinationRes.value;

    const findUserRes = await firstValueFrom(
      this.usersService.send<FindUser, FindUserByIdPayload>(
        PayloadActions.USERS.FIND_BY_ID,
        { id: wishlist.userId }
      )
    );

    if (findUserRes.ok === false) {
      return findUserRes;
    }

    model.user = findUserRes.value;

    return this.wishlistsRepository.createWishlist(model);
  }

  async findAll(): Promise<FindAllWishlists> {
    try {
      const wishlists = await this.wishlistsRepository.getWishlists();
      return { ok: true, value: wishlists };
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }
  }
}
