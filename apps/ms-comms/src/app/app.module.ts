import { Module } from '@nestjs/common';

import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';
import { EntitiesModule, MessagesRepository } from '@proyecto-integrado/shared';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule.register(RMQCONFIG),
    EntitiesModule,
    MulterModule.register(),
    TypeOrmModule.forFeature([MessagesRepository]),
  ],
  controllers: [CommsController],
  providers: [CommsService],
})
export class AppModule {}
