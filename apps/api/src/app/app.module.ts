import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './shared/services/logging.service';

@Module({
  imports: [ClientsModule.register(RMQCONFIG)],
  controllers: [AuthController],
  providers: [AuthService, LoggingService],
})
export class AppModule {}
