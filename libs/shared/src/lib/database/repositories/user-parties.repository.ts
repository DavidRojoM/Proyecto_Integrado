import {
  InsertUserParty,
  UserPartiesEntity,
  UserParty,
} from '@proyecto-integrado/shared';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserPartiesEntity)
export class UserPartiesRepository extends Repository<UserPartiesEntity> {
  async findAllUserParties(): Promise<UserParty[]> {
    const result = await this.createQueryBuilder().getMany();

    return result.map((userParty) => UserParty.entityToModel(userParty));
  }

  async createUserParty(userParty: UserParty): Promise<InsertUserParty> {
    const entity = UserParty.modelToEntity(userParty);
    let insertedEntity;
    try {
      insertedEntity = await this.save(entity);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Could not create userParty',
        },
      };
    }

    return {
      ok: true,
      value: UserParty.entityToModel(insertedEntity),
    };
  }
}
