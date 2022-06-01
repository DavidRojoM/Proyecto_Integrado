import { Injectable } from '@nestjs/common';
import {
  AddUserResponse,
  FindUserByUsernameResponse,
  User,
  UserDto,
  UsersRepository,
} from '@proyecto-integrado/shared';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async addOne(user: UserDto): Promise<AddUserResponse> {
    const insertResult = await this.usersRepository.addOne(
      User.dtoToModel(user)
    );
    if (insertResult.ok === false) {
      return insertResult;
    }

    return {
      ...insertResult,
      value: User.modelToDto(insertResult.value),
    };
  }

  async findOneByUsername(
    username: string
  ): Promise<FindUserByUsernameResponse> {
    const findResult = await this.usersRepository.findOneByUsername(username);
    if (findResult.ok === false) {
      return findResult;
    }
    return {
      ...findResult,
      value: User.modelToDto(findResult.value),
    };
  }
}
