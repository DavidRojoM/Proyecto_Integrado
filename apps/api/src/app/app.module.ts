import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './shared/services/logging.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EntitiesModule } from '@proyecto-integrado/shared';

@Module({
  imports: [ClientsModule.register(RMQCONFIG), EntitiesModule],
  controllers: [AuthController, UsersController],
  providers: [AuthService, LoggingService, UsersService],
})
export class AppModule {}
