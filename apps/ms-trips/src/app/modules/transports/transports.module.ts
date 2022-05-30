import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportsRepository } from './transports.repository';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransportsRepository])],
  controllers: [TransportsController],
  providers: [TransportsService],
})
export class TransportsModule {}
