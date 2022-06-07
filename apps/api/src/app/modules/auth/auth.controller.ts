import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  SuccessfulLoginResponse,
} from '@proyecto-integrado/shared';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(
    @Body()
    credentials: LoginRequestDto
  ): Promise<SuccessfulLoginResponse> {
    return this.authService.login(credentials);
  }

  @UseInterceptors(AuthInterceptor)
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkAuth(): void {}
}
