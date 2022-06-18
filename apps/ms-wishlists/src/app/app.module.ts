import { Module } from '@nestjs/common';

import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import {
  DestinationsRepository,
  EntitiesModule,
  UsersRepository,
  WishlistsRepository,
} from '@proyecto-integrado/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule.register(RMQCONFIG),
    EntitiesModule,
    TypeOrmModule.forFeature([
      UsersRepository,
      DestinationsRepository,
      WishlistsRepository,
    ]),
  ],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class AppModule {}
