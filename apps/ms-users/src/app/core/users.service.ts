import { Injectable } from '@nestjs/common';
import {
  AddUserResponse,
  FindOneByUsernameResponse,
  User,
  UserDto,
} from '@proyecto-integrado/shared';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async addOne(user: UserDto): Promise<AddUserResponse> {
    let userAdded;
    try {
      userAdded = await this.usersRepository.addOne(User.dtoToModel(user));
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.response.statusCode,
          statusText: e.response.statusText,
        },
      };
    }
    return {
      ok: true,
      value: User.modelToDto(userAdded),
    };
  }

  async findOneByUsername(
    username: string
  ): Promise<FindOneByUsernameResponse> {
    try {
      const userModel = await this.usersRepository.findOneByUsername(username);
      return {
        ok: true,
        value: User.modelToDto(userModel),
      };
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.response.statusCode,
          statusText: e.response.statusText,
        },
      };
    }
  }
}
