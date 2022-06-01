import { Module } from '@nestjs/common';

import { PartiesController } from './parties.controller';
import { PartiesService } from './parties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EntitiesModule,
  PartiesRepository,
  UserPartiesRepository,
  UsersRepository,
} from '@proyecto-integrado/shared';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';

@Module({
  imports: [
    ClientsModule.register(RMQCONFIG),
    EntitiesModule,
    TypeOrmModule.forFeature([
      UsersRepository,
      PartiesRepository,
      UserPartiesRepository,
    ]),
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
})
export class AppModule {}
