import { Module } from '@nestjs/common';

import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';
import { EntitiesModule } from '@proyecto-integrado/shared';

@Module({
  imports: [EntitiesModule],
  controllers: [CommsController],
  providers: [CommsService],
})
export class AppModule {}
