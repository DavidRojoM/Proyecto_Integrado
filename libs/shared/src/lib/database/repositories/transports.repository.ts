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

    return result.map((transport) => Transport.entityToModel(transport));
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
          statusCode: e.errno,
          statusText: e.sqlMessage,
        },
      };
    }

    return {
      ok: true,
      value: Transport.entityToModel(insertedEntity),
    };
  }

  async findById(id: number) {
    const result = await this.createQueryBuilder('transport')
      .select()
      .where('transport.id = :id', { id })
      .getOne();
    if (!result) {
      return null;
    }
    return Transport.entityToModel(result);
  }
}
