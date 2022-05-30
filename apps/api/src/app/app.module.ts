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
import { TripsService } from './modules/trips/trips.service';
import { TripsController } from './modules/trips/trips.controller';

@Module({
  imports: [
    ClientsModule.register(RMQCONFIG),
    EntitiesModule,
    MulterModule.register(),
  ],
  controllers: [AuthController, UsersController, TripsController],
  providers: [AuthService, LoggingService, UsersService, TripsService],
})
export class AppModule {}
