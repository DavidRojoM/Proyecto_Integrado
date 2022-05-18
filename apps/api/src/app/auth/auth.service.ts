import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  LoginRequest,
  LoginResponse,
  PayloadActions,
  Token,
  UserDto,
} from '@proyecto-integrado/shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authProxy: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy
  ) {}

  login(credentials: LoginRequest): Promise<LoginResponse> {
    return firstValueFrom(
      this.authProxy.send<LoginResponse, LoginRequest>(
        PayloadActions.AUTH.LOGIN,
        credentials
      )
    );
  }

  checkAuth(token: Token): Promise<UserDto> {
    return firstValueFrom(
      this.authProxy.send<UserDto, Token>(PayloadActions.AUTH.CHECK, token)
    );
  }
  //TODO: move signup to usersService
  signup(user: UserDto): Promise<Partial<UserDto>> {
    return firstValueFrom(
      this.usersProxy.send<UserDto, UserDto>(PayloadActions.USERS.CREATE, user)
    );
  }
}
