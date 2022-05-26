import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  LoginRequestDto,
  LoginResponse,
  PayloadActions,
  Token,
} from '@proyecto-integrado/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(PayloadActions.AUTH.LOGIN)
  login(credentials: LoginRequestDto): Promise<LoginResponse> {
    return this.authService.login(credentials);
  }

  @MessagePattern(PayloadActions.AUTH.CHECK)
  check(token: Token): Promise<LoginResponse> {
    return this.authService.check(token);
  }
}
