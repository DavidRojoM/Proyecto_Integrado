import {
  FindUserParty,
  InsertUserParty,
  RemoveUserPartyResponse,
  UserPartiesEntity,
  UserParty,
  UserPartyStatus,
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

  async findByUserIdAndPartyId(
    userId: string,
    partyId: string
  ): Promise<FindUserParty> {
    let findResult;
    try {
      findResult = await this.createQueryBuilder('userParty')
        .select()
        .leftJoinAndSelect('userParty.user', 'user')
        .leftJoinAndSelect('user.balance', 'balance')
        .leftJoinAndSelect('userParty.party', 'party')
        .leftJoinAndSelect('party.trip', 'trip')
        .leftJoinAndSelect('trip.hotel', 'hotel')
        .leftJoinAndSelect('trip.transport', 'transport')
        .where('user.id = :userId', { userId })
        .andWhere('party.id = :partyId', { partyId })
        .getOneOrFail();
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
      value: UserParty.entityToModel(findResult),
    };
  }
  async updateStatus(
    userId: string,
    partyId: string,
    status: UserPartyStatus
  ): Promise<void> {
    await this.createQueryBuilder()
      .update(UserPartiesEntity)
      .set({ status: status })
      .where('userId = :userId', { userId })
      .andWhere('partyId = :partyId', { partyId })
      .execute();
  }
}
