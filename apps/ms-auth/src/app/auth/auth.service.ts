import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  ErrorPayload,
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
    const response = (await firstValueFrom(
      this.usersProxy.send<UserDto | ErrorPayload, Partial<LoginRequest>>(
        PayloadActions.USERS.FIND_BY_USERNAME,
        {
          username,
        }
      )
    )) as any;

    //TODO: FIX
    if (!response.id) {
      throw new UnauthorizedException({
        statusCode: 401,
        statusText: 'Unknown user or wrong password',
      });
    }

    if (await this.isSamePassword(password, response.password)) {
      return response;
    }

    throw new UnauthorizedException({
      statusCode: 401,
      statusText: 'Unknown user or wrong password',
    });
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    let user;
    try {
      user = await this.validateUser(
        credentials.username,
        credentials.password
      );
    } catch (e) {
      return {
        statusCode: e.response.statusCode,
        statusText: e.response.statusText,
      };
    }

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

  private generateSign({ id, username, email, role }: UserDto): LoginResponse {
    const user = { id, username, email, role };
    const access_token = this.jwtService.sign(user);
    return {
      user,
      access_token,
    };
  }
}
