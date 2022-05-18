import { Inject, Injectable } from '@nestjs/common';
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

  login(credentials: LoginRequest): Promise<LoginResponse> {
    return firstValueFrom(
      this.authProxy.send<LoginResponse, LoginRequest>(
        PayloadActions.AUTH.LOGIN,
        credentials
      )
    );
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
