import {
  InsertParty,
  PartyEntity,
  Party,
  FindPartyById,
  FindAllParties,
  Trip,
  AddTripToParty,
  PartyStatusEnum,
  DeletePartyResponse,
  UpdateParty,
} from '@proyecto-integrado/shared';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PartyEntity)
export class PartiesRepository extends Repository<PartyEntity> {
  async findAllParties(): Promise<Party[]> {
    const result = await this.createQueryBuilder().getMany();

    return result.map((userParty) => Party.entityToModel(userParty));
  }

  async findById(id: string): Promise<FindPartyById> {
    let result;
    try {
      result = await this.createQueryBuilder('party')
        .leftJoinAndSelect('party.trip', 'trip')
        .leftJoinAndSelect('trip.destination', 'destination')
        .leftJoinAndSelect('trip.hotel', 'hotel')
        .leftJoinAndSelect('trip.transport', 'transport')
        .leftJoinAndSelect('party.userParties', 'userParties')
        .leftJoinAndSelect('userParties.user', 'user')
        .where('party.id = :id', { id })
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
      value: Party.entityToModel(result),
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

  async addTripToParty(partyId: string, trip: Trip): Promise<AddTripToParty> {
    const tripEntity = Trip.modelToEntity(trip);
    try {
      await this.update(partyId, {
        trip: tripEntity,
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
    return {
      ok: true,
      value: trip,
    };
  }

  async confirmParty(partyId): Promise<any> {
    let result;
    try {
      result = await this.createQueryBuilder()
        .update({
          status: PartyStatusEnum.READY,
        })
        .where('id = :partyId', { partyId })
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
      value: result,
    };
  }

  async deletePartyById(id: string): Promise<DeletePartyResponse> {
    try {
      await this.createQueryBuilder('party')
        .delete()
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
      value: { partyId: id },
    };
  }

  async updateParty(party: Party): Promise<UpdateParty> {
    const entity = Party.modelToEntity(party);
    let result;
    try {
      result = await this.save(entity);
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
      value: Party.entityToModel(result),
    };
  }
}
