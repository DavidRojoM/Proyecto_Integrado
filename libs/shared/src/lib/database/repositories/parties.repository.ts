import { InsertParty, PartyEntity, Party } from '@proyecto-integrado/shared';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PartyEntity)
export class PartiesRepository extends Repository<PartyEntity> {
  async findAllParties(): Promise<Party[]> {
    const result = await this.createQueryBuilder().getMany();

    return result.map((userParty) => Party.entityToModel(userParty));
  }

  async createParty(party: Party): Promise<InsertParty> {
    const entity = Party.modelToEntity(party);
    let insertedEntity;
    try {
      insertedEntity = await this.save(entity);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Could not create party',
        },
      };
    }

    return {
      ok: true,
      value: Party.entityToModel(insertedEntity),
    };
  }
}
