import { EntityRepository, Repository } from 'typeorm';
import {
  InsertTransport,
  Transport,
  TransportEntity,
} from '@proyecto-integrado/shared';

@EntityRepository(TransportEntity)
export class TransportsRepository extends Repository<TransportEntity> {
  async findAllTransports(): Promise<Transport[]> {
    const result = await this.createQueryBuilder().getMany();

    return result.map((trip) => Transport.entityToModel(trip));
  }

  async createTransport(transport: Transport): Promise<InsertTransport> {
    const entity = Transport.modelToEntity(transport);
    let insertedEntity;
    try {
      insertedEntity = await this.save(entity);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Could not create transport',
        },
      };
    }

    return {
      ok: true,
      value: Transport.entityToModel(insertedEntity),
    };
  }
}
