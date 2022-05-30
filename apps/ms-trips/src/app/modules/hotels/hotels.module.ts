import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsRepository } from './hotels.repository';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HotelsRepository])],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
