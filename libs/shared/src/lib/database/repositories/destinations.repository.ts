import { EntityRepository, Repository } from 'typeorm';
import {
  DeleteTripAggregateResponse,
  Destination,
  DestinationEntity,
  FindDestination,
  InsertDestination,
  UpdateDestination,
} from '@proyecto-integrado/shared';

@EntityRepository(DestinationEntity)
export class DestinationsRepository extends Repository<DestinationEntity> {
  async findAllDestinations(): Promise<Destination[]> {
    const result = await this.createQueryBuilder()
      .orderBy({
        name: 'ASC',
      })
      .getMany();

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

  async findById(id: number): Promise<FindDestination> {
    let result;
    try {
      result = await this.createQueryBuilder('destination')
        .select()
        .where('destination.id = :id', { id })
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
      value: Destination.entityToModel(result),
    };
  }

  async deleteDestinationById(
    destinationId: number
  ): Promise<DeleteTripAggregateResponse> {
    try {
      await this.createQueryBuilder()
        .delete()
        .where('id = :id', { id: destinationId })
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
        id: destinationId,
      },
    };
  }

  async updateDestination(model: Destination): Promise<UpdateDestination> {
    const entity = Destination.modelToEntity(model);
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
      value: Destination.entityToModel(result),
    };
  }
}
