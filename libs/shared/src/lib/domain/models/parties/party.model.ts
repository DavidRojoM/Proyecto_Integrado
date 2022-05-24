import { Message } from '../comms/message.model';
import { User } from '../users/user.model';
import { Trip } from '../trips/trip.model';
import { PartyDto } from '../../dto/parties/party.dto';
import { PartyEntity } from '../../../database/entities/party.entity';

export class Party {
  id: string;
  name: string;
  messages: Message[];
  users: User[];
  trip: Trip;

  static modelToEntity(model: Party): PartyEntity {
    const entity = new PartyEntity();
    entity.id = model.id;
    entity.name = model.name;
    entity.messages = model.messages.map((message) =>
      Message.modelToEntity(message)
    );
    entity.trip = Trip.modelToEntity(model.trip);
    entity.users = model.users.map((user) => User.modelToEntity(user));
    return entity;
  }

  static entityToModel(entity: PartyEntity): Party {
    const model = new Party();
    model.id = entity.id;
    model.name = entity.name;
    model.messages = entity.messages.map((message) =>
      Message.entityToModel(message)
    );
    model.trip = Trip.entityToModel(entity.trip);
    model.users = entity.users.map((user) => User.entityToModel(user));
    return model;
  }

  static modelToDto(party: Party): PartyDto {
    const dto = new PartyDto();
    dto.id = party.id;
    dto.name = party.name;
    dto.messages = party.messages.map((message) => Message.modelToDto(message));
    dto.trip = Trip.modelToDto(party.trip);
    return dto;
  }

  static dtoToModel(party: PartyDto): Party {
    const model = new Party();
    model.id = party.id;
    model.name = party.name;
    model.messages = party.messages.map((message) =>
      Message.dtoToModel(message)
    );
    model.trip = Trip.dtoToModel(party.trip);
    return model;
  }
}
