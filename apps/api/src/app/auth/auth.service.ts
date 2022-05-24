import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  LoginRequest,
  LoginResponse,
  PayloadActions,
  Token,
} from '@proyecto-integrado/shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authProxy: ClientProxy
  ) {}

  async login(credentials: LoginRequest): Promise<LoginResponse | undefined> {
    const response = await firstValueFrom(
      this.authProxy.send<LoginResponse, LoginRequest>(
        PayloadActions.AUTH.LOGIN,
        credentials
      )
    );

    if (!('access_token' in response)) {
      throw new UnauthorizedException();
    }
    return response;
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
