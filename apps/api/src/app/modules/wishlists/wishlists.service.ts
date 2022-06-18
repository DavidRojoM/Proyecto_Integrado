import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  FindAllWishlists,
  InsertWishlist,
  PayloadActions,
  Wishlist,
  WishlistDto,
} from '@proyecto-integrado/shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WishlistsService {
  constructor(
    @Inject('WISHLISTS_SERVICE') private readonly wishlistsService: ClientProxy
  ) {}

  async create(wishlist: WishlistDto): Promise<Wishlist> {
    const response = await firstValueFrom(
      this.wishlistsService.send<InsertWishlist, WishlistDto>(
        PayloadActions.WISHLISTS.CREATE,
        wishlist
      )
    );

    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }

    return response.value;
  }

  async findAll(): Promise<Wishlist[]> {
    const response = await firstValueFrom(
      this.wishlistsService.send<FindAllWishlists>(
        PayloadActions.WISHLISTS.FIND_ALL,
        {}
      )
    );

    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }

    return response.value;
  }
}
