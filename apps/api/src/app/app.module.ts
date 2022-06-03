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
import { TripsService } from './modules/trips/trips/trips.service';
import { TripsController } from './modules/trips/trips/trips.controller';
import { TransportsController } from './modules/trips/transports/transports.controller';
import { TransportsService } from './modules/trips/transports/transports.service';
import { HotelsController } from './modules/trips/hotels/hotels.controller';
import { DestinationsController } from './modules/trips/destinations/destinations.controller';
import { HotelsService } from './modules/trips/hotels/hotels.service';
import { DestinationsService } from './modules/trips/destinations/destinations.service';
import { PartiesService } from './modules/parties/parties.service';
import { CommsResolver } from './modules/comms/comms.resolver';
import { CommsService } from './modules/comms/comms.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PartiesController } from './modules/parties/parties.controller';

@Module({
  imports: [
    ClientsModule.register(RMQCONFIG),
    EntitiesModule,
    MulterModule.register(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
    TripsController,
    TransportsController,
    HotelsController,
    DestinationsController,
    PartiesController,
  ],
  providers: [
    AuthService,
    LoggingService,
    UsersService,
    TripsService,
    TransportsService,
    HotelsService,
    DestinationsService,
    PartiesService,
    CommsService,
    CommsResolver,
  ],
})
export class AppModule {}
