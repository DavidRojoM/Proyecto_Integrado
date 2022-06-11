import { EntityRepository, Repository } from 'typeorm';
import {
  Destination,
  DestinationEntity,
  InsertDestination,
} from '@proyecto-integrado/shared';

@EntityRepository(DestinationEntity)
export class DestinationsRepository extends Repository<DestinationEntity> {
  async findAllDestinations(): Promise<Destination[]> {
    const result = await this.createQueryBuilder().getMany();

    return result.map((destination) => Destination.entityToModel(destination));
  }

  async createDestination(
    destination: Destination
  ): Promise<InsertDestination> {
    const entity = Destination.modelToEntity(destination);
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
      value: Destination.entityToModel(insertedEntity),
    };
  }

  async findById(id: number) {
    const result = await this.createQueryBuilder('destination')
      .select()
      .where('destination.id = :id', { id })
      .getOne();
    if (!result) {
      return null;
    }
    return Destination.entityToModel(result);
  }
}
