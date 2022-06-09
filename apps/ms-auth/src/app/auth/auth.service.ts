import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  ENVIRONMENT,
  FindUserResponse,
  LoginRequestDto,
  LoginResponse,
  PayloadActions,
  Token,
  UserDto,
  ValidateUser,
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

  async login(credentials: LoginRequestDto): Promise<LoginResponse> {
    const validationRes = await this.validateUser(
      credentials.username,
      credentials.password
    );

    if (validationRes.ok === false) {
      return validationRes;
    }

    return this.generateSign(validationRes.value);
  }

  async check({ access_token }: Token): Promise<LoginResponse> {
    let user;
    try {
      user = await this.jwtService.verifyAsync<UserDto>(access_token, {
        secret: ENVIRONMENT.JWT_SECRET_KEY,
      });
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

  private async validateUser(
    username: string,
    password: string
  ): Promise<ValidateUser> {
    const response = await firstValueFrom(
      this.usersProxy.send<FindUserResponse, Partial<LoginRequestDto>>(
        PayloadActions.USERS.FIND_BY_USERNAME,
        {
          username,
        }
      )
    );

    if (response.ok === false) {
      return {
        ok: false,
        error: {
          statusCode: 401,
          statusText: 'Unknown user or wrong password',
        },
      };
    }

    if (response.value.banned) {
      return {
        ok: false,
        error: {
          statusCode: 401,
          statusText: 'User is banned',
        },
      };
    }

    const isSame = await this.isSamePassword(password, response.value.password);
    if (!isSame) {
      return {
        ok: false,
        error: {
          statusCode: 401,
          statusText: 'Unknown user or wrong password',
        },
      };
    }

    return response;
  }

  private async isSamePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  private generateSign({ id, username, email, role }: UserDto): LoginResponse {
    const user = { id, username, email, role };
    let access_token;
    try {
      access_token = this.jwtService.sign(user, {
        secret: ENVIRONMENT.JWT_SECRET_KEY,
      });
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: 401,
          statusText: 'Unable to generate token',
        },
      };
    }
    return {
      ok: true,
      value: {
        user,
        access_token,
      },
    };
  }
}
