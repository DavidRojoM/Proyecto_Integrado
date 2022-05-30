import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import { EntitiesModule } from '@proyecto-integrado/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from './modules/trips/trips.module';
import { TransportsModule } from './modules/transports/transports.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { DestinationsModule } from './modules/destinations/destinations.module';

@Module({
  imports: [
    ClientsModule.register(RMQCONFIG),
    EntitiesModule,
    TypeOrmModule.forFeature([]),
    TripsModule,
    TransportsModule,
    HotelsModule,
    DestinationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
