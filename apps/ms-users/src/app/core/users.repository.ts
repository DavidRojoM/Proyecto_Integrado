import { Injectable } from '@nestjs/common';
import { User, UserEntity } from '@proyecto-integrado/shared';
import { Repository } from 'typeorm';

//TODO: MAP ENTITIES TO BUSINESS MODELS
@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  async addOne(user: User): Promise<User> {
    const entity = User.modelToEntity(user);
    await this.insert(entity);
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const result = await this.createQueryBuilder('user')
      .select()
      .where('user.username = :username', { username })
      .getOne();

    if (!result) {
      throw new Error('User not found');
    }

    return User.entityToModel(result);
  }
}
