import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  PayloadActions,
  Token,
  UserDto,
} from '@proyecto-integrado/shared';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authProxy: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy,
    private readonly jwtService: JwtService
  ) {}

  private async validateUser(
    username: string,
    password: string
  ): Promise<UserDto> {
    const user = await firstValueFrom(
      this.usersProxy.send<UserDto, Partial<LoginRequest>>(
        PayloadActions.USERS.FIND_BY_USERNAME,
        {
          username,
        }
      )
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await this.isSamePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const user = await this.validateUser(
      credentials.username,
      credentials.password
    );
    return this.generateSign(user);
  }

  async check({ access_token }: Token): Promise<LoginResponse> {
    const user = await this.jwtService.verifyAsync<UserDto>(access_token);

    return this.generateSign(user);
  }

  private async isSamePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  async login(
    credentials: LoginRequest
  ): Promise<{ access_token: string; user: Partial<UserDto> }> {
    const user = await this.validateUser(
      credentials.username,
      credentials.password
    );
    const { password, ...result } = user;
    return {
      user: result,
      access_token: this.jwtService.sign(result),
    };
  }

  async check({ access_token }: Token): Promise<Partial<UserDto>> {
    const user = await this.jwtService.verifyAsync<UserDto>(access_token);

    const { password, ...result } = user;

    return result;
  }
}
