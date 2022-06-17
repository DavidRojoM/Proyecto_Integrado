import { Injectable } from '@nestjs/common';
import {
  AddUserResponse,
  BalancesRepository,
  ChangeBalancesDto,
  FindUserResponse,
  User,
  UserDto,
  UsersRepository,
} from '@proyecto-integrado/shared';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly balancesRepository: BalancesRepository
  ) {}

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

  async findOneByUsername(username: string): Promise<FindUserResponse> {
    const findResult = await this.usersRepository.findOneByUsername(username);
    if (findResult.ok === false) {
      return findResult;
    }
    return {
      ...findResult,
      value: User.modelToDto(findResult.value),
    };
  }

  async findOneById(id: string): Promise<FindUserResponse> {
    const findResult = await this.usersRepository.findOneById(id);
    if (findResult.ok === false) {
      return findResult;
    }
    return {
      ...findResult,
      value: User.modelToDto(findResult.value),
    };
  }

  async updateBalances(config: ChangeBalancesDto) {
    const userResponse = await this.usersRepository.findOneById(config.userId);

    if (userResponse.ok === false) {
      return userResponse;
    }

    return await this.balancesRepository.updateBalances({
      user: userResponse.value,
      amount: config.amount,
    });
  }
}
