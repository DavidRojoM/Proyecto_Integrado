import { Controller } from '@nestjs/common';

import { WishlistsService } from './wishlists.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  FindAllWishlists,
  InsertWishlist,
  PayloadActions,
  WishlistDto,
} from '@proyecto-integrado/shared';

@Controller()
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @MessagePattern(PayloadActions.WISHLISTS.CREATE)
  createWishlist(@Payload() wishlist: WishlistDto): Promise<InsertWishlist> {
    return this.wishlistsService.create(wishlist);
  }

  @MessagePattern(PayloadActions.WISHLISTS.FIND_ALL)
  findAllWishlists(): Promise<FindAllWishlists> {
    return this.wishlistsService.findAll();
  }
}
