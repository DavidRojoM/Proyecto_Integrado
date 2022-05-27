import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  FindOneByUsernameResponse,
  LoginRequestDto,
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
    const response = await firstValueFrom(
      this.usersProxy.send<FindOneByUsernameResponse, Partial<LoginRequestDto>>(
        PayloadActions.USERS.FIND_BY_USERNAME,
        {
          username,
        }
      )
    );

    if (response.ok === false) {
      throw new UnauthorizedException({
        statusCode: 401,
        statusText: 'Unknown user or wrong password',
      });
    }
    if (await this.isSamePassword(password, response.value.password)) {
      return response.value;
    }

    throw new UnauthorizedException({
      statusCode: 401,
      statusText: 'Unknown user or wrong password',
    });
  }

  async login(credentials: LoginRequestDto): Promise<LoginResponse> {
    let user;
    try {
      user = await this.validateUser(
        credentials.username,
        credentials.password
      );
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.response.statusCode,
          statusText: e.response.statusText,
        },
      };
    }
    return this.generateSign(user);
  }

  async check({ access_token }: Token): Promise<LoginResponse> {
    let user;
    try {
      user = await this.jwtService.verifyAsync<UserDto>(access_token);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: 401,
          statusText: 'Invalid token',
        },
      };
    }

    return this.generateSign(user);
  }

  private async isSamePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  private generateSign({ id, username, email, role }: UserDto): LoginResponse {
    const user = { id, username, email, role };
    const access_token = this.jwtService.sign(user);
    return {
      ok: true,
      value: {
        user,
        access_token,
      },
    };
  }
}
