import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from '@proyecto-integrado/shared';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //TODO: VALIDATIONS

  @Post('login')
  login(@Body() credentials: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(credentials);
  }

  @UseInterceptors(AuthInterceptor)
  @Get(':token')
  checkAuth(@Param('token') access_token: string): Promise<LoginResponse> {
    return this.authService.checkAuth({ access_token });
  }
}
