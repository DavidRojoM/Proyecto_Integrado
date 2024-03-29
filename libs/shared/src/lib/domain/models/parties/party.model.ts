import { Message } from '../comms/message.model';
import { Trip } from '../trips/trip.model';
import { PartyDto } from '../../dto/parties/party.dto';
import { PartyEntity } from '../../../database/entities/party.entity';
import { UserParty } from '../users/user-party.model';
import { User } from '../users/user.model';
import { PartyStatusEnum } from '../../enums/party-status.enum';

export class Party {
  id: string;
  name: string;
  messages: Message[];
  users: UserParty[];
  trip: Trip;
  status: PartyStatusEnum;

  static modelToEntity(model: Party): PartyEntity {
    const entity = new PartyEntity();
    entity.id = model.id;
    entity.name = model.name;
    entity.status = model.status;
    entity.messages = model?.messages?.map((message) =>
      Message.modelToEntity(message)
    );
    entity.userParties = model?.users?.map((user) =>
      UserParty.modelToEntity(user)
    );
    if (model.trip) {
      entity.trip = Trip.modelToEntity(model.trip);
    }
    return entity;
  }

  static entityToModel(entity: PartyEntity): Party {
    const model = new Party();
    model.id = entity.id;
    model.name = entity.name;
    model.status = entity.status;
    model.messages = entity?.messages?.map((message) =>
      Message.entityToModel(message)
    );
    if (entity.trip) {
      model.trip = Trip.entityToModel(entity.trip);
    }
    model.users = entity?.userParties?.map((userParty) =>
      UserParty.entityToModel(userParty)
    );
    return model;
  }

  static modelToDto(party: Party): PartyDto {
    const dto = new PartyDto();
    dto.id = party.id;
    dto.name = party.name;
    dto.status = party.status;
    dto.messages = party?.messages?.map((message) =>
      Message.modelToDto(message)
    );
    if (party.trip) {
      dto.trip = party.trip;
    }
    dto.users = party?.users?.map((userParty) => {
      return User.modelToDto({
        ...userParty.user,
        status: userParty.status,
      });
    });

    return dto;
  }

  static dtoToModel(party: PartyDto): Party {
    const model = new Party();
    model.id = party.id;
    model.status = party.status;
    model.name = party.name;
    model.messages = party?.messages?.map((message) =>
      Message.dtoToModel(message)
    );
    // model.users = party?.users?.map((user) => UserParty.dtoToModel(user));
    if (party.trip) {
      model.trip = Trip.dtoToModel(party.trip);
    }
    return model;
  }
}
