import { Injectable } from '@nestjs/common';
import { User } from '@proyecto-integrado/shared';
import { UsersRepository } from './users.repository';

//TODO MAP BUSINESS MODELS TO DTOs
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  //
  async addOne(user: User): Promise<User> {
    //TODO: Map User to UserEntity
    return this.usersRepository.addOne(user);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneByUsername(username);
  }
}
