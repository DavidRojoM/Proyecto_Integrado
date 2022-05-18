import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  LoginRequest,
  LoginResponse,
  PayloadActions,
  Token,
  UserDto,
} from '@proyecto-integrado/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(PayloadActions.AUTH.LOGIN)
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(credentials);
  }

  @MessagePattern(PayloadActions.AUTH.CHECK)
  check(token: Token): Promise<Partial<UserDto>> {
    return this.authService.check(token);
  }
}
