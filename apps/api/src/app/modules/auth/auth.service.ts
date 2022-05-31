import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  LoginRequestDto,
  LoginResponse,
  PayloadActions,
  SuccessfulLoginResponse,
  Token,
} from '@proyecto-integrado/shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authProxy: ClientProxy
  ) {}

  async login(credentials: LoginRequestDto): Promise<SuccessfulLoginResponse> {
    const response = await firstValueFrom(
      this.authProxy.send<LoginResponse, LoginRequestDto>(
        PayloadActions.AUTH.LOGIN,
        credentials
      )
    );

    if (response.ok === false) {
      throw new UnauthorizedException({
        statusCode: response.error.statusCode,
        statusText: response.error.statusText,
      });
    }
    return {
      access_token: response.value.access_token,
      user: response.value.user,
    };
  }

  checkAuth(token: Token): Promise<LoginResponse> {
    return firstValueFrom(
      this.authProxy.send<LoginResponse, Token>(
        PayloadActions.AUTH.CHECK,
        token
      )
    );
  }
}
