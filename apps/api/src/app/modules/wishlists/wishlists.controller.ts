import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { Wishlist, WishlistDto } from '@proyecto-integrado/shared';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';

@UseInterceptors(LoggingInterceptor, AuthInterceptor)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Post()
  create(@Body() wishlist: WishlistDto): Promise<Wishlist> {
    return this.wishlistsService.create(wishlist);
  }
}
