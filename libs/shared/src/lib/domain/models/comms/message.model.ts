import { User } from '../users/user.model';
import { Party } from '../parties/party.model';
import { MessageDto } from '../../dto/comms/message.dto';
import { MessageEntity } from '../../../database/entities/message.entity';
import { MessageInput } from '../../dto/comms/message.input';
import { MessageOutput } from '../../dto/comms/message.output';

export class Message {
  id: number;
  message: string;
  createdAt: Date;
  user: User;
  party: Party;

  static entityToModel(message: MessageEntity): Message {
    const model = new Message();
    model.message = message.message;
    model.createdAt = message.createdAt;
    model.id = message.id;
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
      dto.userId = User.modelToDto(message.user).id;
    }
    if (message.party) {
      dto.partyId = Party.modelToDto(message.party).id;
    }
    return dto;
  }

  static dtoToModel(message: MessageDto): Message {
    const model = new Message();
    model.message = message.message;
    // model.createdAt = message.createdAt;
    return model;
  }

  static inputToDto(message: MessageInput): MessageDto {
    const dto = new MessageDto();
    dto.message = message.message;
    // dto.createdAt = message.createdAt;
    dto.userId = message.userId;
    dto.partyId = message.partyId;
    return dto;
  }

  static modelToOutput(message: Message): MessageOutput {
    const output = new MessageOutput();
    output.message = message.message;
    output.createdAt = message.createdAt.toString();
    output.user = User.modelToOutput(message.user);
    // output.party = message.party;
    return output;
  }
}
