import {
  InsertParty,
  PartyEntity,
  Party,
  FindPartyById,
  FindAllParties,
} from '@proyecto-integrado/shared';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PartyEntity)
export class PartiesRepository extends Repository<PartyEntity> {
  async findAllParties(): Promise<Party[]> {
    const result = await this.createQueryBuilder().getMany();

    return result.map((userParty) => Party.entityToModel(userParty));
  }

  async findById(id: string): Promise<FindPartyById> {
    const entity = await this.findOne(id);

    if (!entity) {
      return {
        ok: false,
        error: {
          statusCode: 404,
          statusText: 'Not Found',
        },
      };
    }

    return {
      ok: true,
      value: Party.entityToModel(entity),
    };
  }

  async createParty(party: Party): Promise<InsertParty> {
    const entity = Party.modelToEntity(party);
    try {
      await this.insert(entity);
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
      value: Party.entityToModel(entity),
    };
  }

  async findAll(): Promise<FindAllParties> {
    let result;
    try {
      result = await this.createQueryBuilder('party')
        .leftJoinAndSelect('party.trip', 'trip')
        .leftJoinAndSelect('trip.destination', 'destination')
        .leftJoinAndSelect('trip.hotel', 'hotel')
        .leftJoinAndSelect('trip.transport', 'transport')
        .leftJoinAndSelect('party.userParties', 'userParties')
        .leftJoinAndSelect('userParties.user', 'user')
        .getMany();
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
      value: result.map((party) => Party.entityToModel(party)),
    };
  }
}
