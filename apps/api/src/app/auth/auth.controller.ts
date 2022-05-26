import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponse } from '@proyecto-integrado/shared';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggingInterceptor } from '../shared/interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //TODO: VALIDATIONS

  @Post('login')
  login(
    @Body(
      new ValidationPipe({
        transform: true,
        errorHttpStatusCode: 401,
      })
    )
    credentials: LoginRequestDto
  ): Promise<LoginResponse> {
    return this.authService.login(credentials);
  }

  @UseInterceptors(AuthInterceptor)
  @Get()
  checkAuth(): void {}
}
