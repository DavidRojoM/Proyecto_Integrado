import {
  FindUserByUsername,
  InsertUser,
  User,
  UserEntity,
} from '@proyecto-integrado/shared';
import { EntityRepository, Repository } from 'typeorm';

//TODO: MAP ENTITIES TO BUSINESS MODELS
@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async addOne(user: User): Promise<InsertUser> {
    const entity = User.modelToEntity(user);

    try {
      await this.insert(entity);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'User already exists',
        },
      };
    }
    return {
      ok: true,
      value: User.entityToModel(entity),
    };
  }

  async findOneByUsername(username: string): Promise<FindUserByUsername> {
    const result = await this.createQueryBuilder('user')
      .select()
      .leftJoinAndSelect('user.userParties', 'userParties')
      .leftJoinAndSelect('userParties.party', 'party')
      .leftJoinAndSelect('user.messages', 'messages')
      .where('user.username = :username', { username })
      .getOne();

    if (!result) {
      return {
        ok: false,
        error: {
          statusCode: 401,
          statusText: 'Unknown user or wrong password',
        },
      };
    }

    return {
      ok: true,
      value: User.entityToModel(result),
    };
  }
}
