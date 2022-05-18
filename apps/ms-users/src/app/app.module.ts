import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import { UsersController } from './core/users.controller';
import { UsersService } from './core/users.service';
import { UsersRepository } from './core/users.repository';

@Module({
  imports: [ClientsModule.register(RMQCONFIG)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class AppModule {}
