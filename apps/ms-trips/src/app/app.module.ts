import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import { EntitiesModule } from '@proyecto-integrado/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule.register(RMQCONFIG),
    EntitiesModule,
    TypeOrmModule.forFeature([]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
