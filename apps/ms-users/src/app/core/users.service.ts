import { Injectable } from '@nestjs/common';
import { User, UserDto } from '@proyecto-integrado/shared';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async addOne(user: UserDto): Promise<UserDto> {
    const userModel = await this.usersRepository.addOne(User.dtoToModel(user));
    return User.modelToDto(userModel);
  }

  async findOneByUsername(username: string): Promise<UserDto> {
    const userModel = await this.usersRepository.findOneByUsername(username);
    return User.modelToDto(userModel);
  }
}
