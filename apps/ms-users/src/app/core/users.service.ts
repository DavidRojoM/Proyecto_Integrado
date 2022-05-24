import { Injectable } from '@nestjs/common';
import { ErrorPayload, User, UserDto } from '@proyecto-integrado/shared';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async addOne(user: UserDto): Promise<UserDto> {
    const userModel = await this.usersRepository.addOne(User.dtoToModel(user));
    return User.modelToDto(userModel);
  }

  async findOneByUsername(username: string): Promise<UserDto | ErrorPayload> {
    try {
      const userModel = await this.usersRepository.findOneByUsername(username);
      return User.modelToDto(userModel);
    } catch (e) {
      return {
        statusCode: e.response.statusCode,
        statusText: e.response.message,
      };
    }
  }
}
