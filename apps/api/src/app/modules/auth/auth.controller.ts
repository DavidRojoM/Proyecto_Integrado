import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  SuccessfulLoginResponse,
  Token,
} from '@proyecto-integrado/shared';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
  @Post('check')
  async checkAuth(@Body() token: Token): Promise<SuccessfulLoginResponse> {
    const checkResponse = await this.authService.checkAuth(token);
    if (checkResponse.ok === false) {
      throw new UnauthorizedException({
        statusCode: checkResponse.error.statusCode,
        statusText: checkResponse.error.statusText,
      });
    }
    return checkResponse.value;
  }
}
