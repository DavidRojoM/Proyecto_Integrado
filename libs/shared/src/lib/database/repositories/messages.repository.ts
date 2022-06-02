import {
  FindMessages,
  InsertMessage,
  Message,
  MessageEntity,
} from '@proyecto-integrado/shared';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MessageEntity)
export class MessagesRepository extends Repository<MessageEntity> {
  async addOne(message: Message): Promise<InsertMessage> {
    const entity = Message.modelToEntity(message);

    try {
      await this.insert(entity);
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.statusCode,
          statusText: e.statusText,
        },
      };
    }
    return {
      ok: true,
      value: Message.entityToModel(entity),
    };
  }

  async findByUserId(id: string): Promise<FindMessages> {
    const result = await this.createQueryBuilder('message')
      .select()
      .leftJoin('message.party', 'party')
      .where('party.id = :id', { id })
      .getMany();

    return {
      ok: true,
      value: result.map((message) => Message.entityToModel(message)),
    };
  }

  async findByPartyId(id: string): Promise<FindMessages> {
    const result = await this.createQueryBuilder('message')
      .select()
      .leftJoin('message.user', 'user')
      .where('user.id = :id', { id })
      .getMany();

    return {
      ok: true,
      value: result.map((message) => Message.entityToModel(message)),
    };
  }
}
