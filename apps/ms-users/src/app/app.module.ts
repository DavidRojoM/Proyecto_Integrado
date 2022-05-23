import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import { UsersController } from './core/users.controller';
import { UsersService } from './core/users.service';
import { UsersRepository } from './core/users.repository';
import { EntitiesModule } from '@proyecto-integrado/shared';

@Module({
  imports: [ClientsModule.register(RMQCONFIG), EntitiesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class AppModule {}
