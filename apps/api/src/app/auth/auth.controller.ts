import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, Token, UserDto } from '@proyecto-integrado/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //TODO: VALIDATIONS

  @Post('login')
  login(
    @Body() credentials: LoginRequest
  ): Promise<{ access_token: string; user: any }> {
    return this.authService.login(credentials);
  }

  //TODO: CHANGE TO USERS DIRECTORY INSTEAD
  @Post('signup')
  signup(@Body() user: UserDto): Promise<Partial<UserDto>> {
    return this.authService.signup(user);
  }
}
