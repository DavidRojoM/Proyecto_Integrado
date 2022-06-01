import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';
import { TransportsRepository } from '@proyecto-integrado/shared';

@Module({
  imports: [TypeOrmModule.forFeature([TransportsRepository])],
  controllers: [TransportsController],
  providers: [TransportsService],
})
export class TransportsModule {}
