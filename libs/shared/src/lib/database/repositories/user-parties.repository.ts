import {
  InsertUserParty,
  RemoveUserPartyResponse,
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
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }

    return {
      ok: true,
      value: UserParty.entityToModel(insertedEntity),
    };
  }

  async deleteUserParty(
    userId: string,
    partyId: string
  ): Promise<RemoveUserPartyResponse> {
    try {
      await this.createQueryBuilder()
        .delete()
        .where('userId = :userId', { userId })
        .andWhere('partyId = :partyId', { partyId })
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
        userId,
        partyId,
      },
    };
  }
}
