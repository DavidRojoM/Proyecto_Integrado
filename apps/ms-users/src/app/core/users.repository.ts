import { User, UserEntity } from '@proyecto-integrado/shared';
import { EntityRepository, Repository } from 'typeorm';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

//TODO: MAP ENTITIES TO BUSINESS MODELS
@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async addOne(user: User): Promise<User> {
    const entity = User.modelToEntity(user);

    try {
      await this.insert(entity);
    } catch (e) {
      throw new BadRequestException({
        statusCode: 400,
        statusText: 'User already exists',
      });
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const result = await this.createQueryBuilder('user')
      .select()
      .leftJoinAndSelect('user.userParties', 'userParties')
      .leftJoinAndSelect('userParties.party', 'party')
      .leftJoinAndSelect('user.messages', 'messages')
      .where('user.username = :username', { username })
      .getOne();

    if (!result) {
      throw new UnauthorizedException({
        statusCode: 401,
        statusText: 'Unknown user or wrong password',
      });
    }

    return User.entityToModel(result);
  }
}
