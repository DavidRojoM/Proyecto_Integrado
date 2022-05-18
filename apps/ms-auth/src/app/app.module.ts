import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ENVIRONMENT } from '@proyecto-integrado/shared';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register(RMQCONFIG),
    JwtModule.register({
      secret: ENVIRONMENT.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: ENVIRONMENT.JWT_TOKEN_EXPIRATION,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
