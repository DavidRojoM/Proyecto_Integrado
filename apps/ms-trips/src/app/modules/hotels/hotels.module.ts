import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { HotelsRepository } from '@proyecto-integrado/shared';

@Module({
  imports: [TypeOrmModule.forFeature([HotelsRepository])],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
