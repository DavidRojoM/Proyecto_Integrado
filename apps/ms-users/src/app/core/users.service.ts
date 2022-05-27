import { Injectable } from '@nestjs/common';
import {
  FindOneByUsernameResponse,
  User,
  UserDto,
} from '@proyecto-integrado/shared';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async addOne(user: UserDto): Promise<UserDto> {
    const userModel = await this.usersRepository.addOne(User.dtoToModel(user));
    return User.modelToDto(userModel);
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
