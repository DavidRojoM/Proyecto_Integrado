import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { LoggingService } from './shared/services/logging.service';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { EntitiesModule } from '@proyecto-integrado/shared';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ClientsModule.register(RMQCONFIG),
    EntitiesModule,
    MulterModule.register(),
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, LoggingService, UsersService],
})
export class AppModule {}
