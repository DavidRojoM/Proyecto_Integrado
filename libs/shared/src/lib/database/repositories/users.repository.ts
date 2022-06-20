import {
  BalanceEntity,
  DeleteUserResponse,
  FindUser,
  FindUsers,
  InsertUser,
  User,
  UserEntity,
} from '@proyecto-integrado/shared';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async findAllUsers(): Promise<FindUsers> {
    const result = await this.createQueryBuilder('user')
      .select()
      .leftJoinAndSelect('user.userParties', 'userParties')
      .leftJoinAndSelect('userParties.party', 'party')
      .leftJoinAndSelect('user.messages', 'messages')
      .getMany();

    return {
      ok: true,
      value: result.map(User.entityToModel),
    };
  }

  async addOne(user: User): Promise<InsertUser> {
    const entity = User.modelToEntity(user);
    entity.balance = new BalanceEntity();

    try {
      const exists = await this.findByUsernameOrEmail(
        entity.username,
        entity.email
      );
      if (exists) {
        return {
          ok: false,
          error: {
            statusCode: 400,
            statusText: 'User already exists',
          },
        };
      }
      await this.save(entity);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }
    return {
      ok: true,
      value: User.entityToModel(entity),
    };
  }

  async updateOne(userToUpdate: User): Promise<InsertUser> {
    const entity = User.modelToEntity(userToUpdate);
    let result;
    try {
      const user = await this.findByUsernameOrEmail(
        entity.username,
        entity.email
      );
      if (user && user?.id !== entity.id) {
        return {
          ok: false,
          error: {
            statusCode: 400,
            statusText: 'User already exists',
          },
        };
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(entity?.password || '', salt);

      await this.update(entity.id, {
        ...(entity.username && { username: entity.username || user.username }),
        ...(entity.email && { email: entity.email || user.email }),
        ...(entity.image && { image: entity.image || user.image }),
        ...(entity.password && { password: user.password || hashedPassword }),
        ...(entity.role && { role: entity.role || user.role }),
        ...(entity.nationality && {
          nationality: entity.nationality || user.nationality,
        }),
        ...(entity.bankAccount && {
          bankAccount: entity.bankAccount || user.bankAccount,
        }),
      });
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }

    const newUser = await this.findOneById(entity.id);

    if (newUser.ok === false) {
      return newUser;
    }

    return {
      ok: true,
      value: newUser.value,
    };
  }

  async findOneByUsername(username: string): Promise<FindUser> {
    const result = await this.createQueryBuilder('user')
      .select()
      .leftJoinAndSelect('user.balance', 'balance')
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

  async findOneById(id: string): Promise<FindUser> {
    const result = await this.createQueryBuilder('user')
      .select()
      .leftJoinAndSelect('user.userParties', 'userParties')
      .leftJoinAndSelect('user.balance', 'balance')
      .leftJoinAndSelect('userParties.party', 'party')
      .leftJoinAndSelect('user.messages', 'messages')
      .where('user.id = :id', { id })
      .getOne();

    if (!result) {
      return {
        ok: false,
        error: {
          statusCode: 401,
          statusText: 'Can not find user',
        },
      };
    }

    return {
      ok: true,
      value: User.entityToModel(result),
    };
  }

  private async findByUsernameOrEmail(
    username: string,
    email: string
  ): Promise<UserEntity | undefined> {
    return this.createQueryBuilder()
      .select()
      .where('username = :username OR email = :email', { username, email })
      .getOne();
  }

  async deleteUserById(id: string): Promise<DeleteUserResponse> {
    try {
      await this.createQueryBuilder()
        .delete()
        .from(UserEntity)
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }

    return {
      ok: true,
      value: {
        userId: id,
      },
    };
  }
  private removeEmptyProperties(obj: any): any {
    const object = {};
    Object.keys(obj).forEach((key) => {
      if (!obj[key]) {
        return;
      }
      object[key] = obj[key];
    });
    return object;
  }
}
