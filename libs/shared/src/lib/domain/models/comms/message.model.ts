import { User } from '../users/user.model';
import { Party } from '../parties/party.model';
import { MessageDto } from '../../dto/comms/message.dto';
import { MessageEntity } from '../../../database/entities/message.entity';

export class Message {
  message: string;
  createdAt: Date;
  user: User;
  party: Party;

  static entityToModel(message: MessageEntity): Message {
    const model = new Message();
    model.message = message.message;
    model.createdAt = message.createdAt;
    if (message.user) {
      model.user = User.entityToModel(message.user);
    }
    if (message.party) {
      model.party = Party.entityToModel(message.party);
    }

    return model;
  }

  static modelToEntity(message: Message): MessageEntity {
    const entity = new MessageEntity();
    entity.message = message.message;
    entity.createdAt = message.createdAt;
    if (message.user) {
      entity.user = User.modelToEntity(message.user);
    }
    if (message.party) {
      entity.party = Party.modelToEntity(message.party);
    }

    return entity;
  }

  static modelToDto(message: Message): MessageDto {
    const dto = new MessageDto();
    dto.message = message.message;
    dto.createdAt = message.createdAt;
    if (message.user) {
      dto.user = User.modelToDto(message.user);
    }
    if (message.party) {
      dto.party = Party.modelToDto(message.party);
    }
    return dto;
  }

  static dtoToModel(message: MessageDto): Message {
    const model = new Message();
    model.message = message.message;
    model.createdAt = message.createdAt;
    if (message.user) {
      model.user = User.dtoToModel(message.user);
    }
    if (message.party) {
      model.party = Party.dtoToModel(message.party);
    }
    return model;
  }
}
