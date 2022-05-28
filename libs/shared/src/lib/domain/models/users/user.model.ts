import { Roles } from '../../enums/roles.enum';
import { Party } from '../parties/party.model';
import { Message } from '../comms/message.model';
import { UserDto } from '../../dto/users/user.dto';
import { UserEntity } from '../../../database/entities/user.entity';

export class User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: Roles;
  banned: boolean;
  image: string;
  nationality: string;
  bankAccount: string;
  parties: Party[];
  messages: Message[];

  static modelToEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.username = user.username;
    entity.password = user.password;
    entity.role = user.role;
    entity.banned = user.banned;
    entity.image = user.image;
    entity.nationality = user.nationality;
    entity.bankAccount = user.bankAccount;
    entity.parties = user.parties?.map((party) => Party.modelToEntity(party));
    entity.messages = user.messages?.map((message) =>
      Message.modelToEntity(message)
    );

    return entity;
  }

  static entityToModel(user: UserEntity): User {
    const model = new User();
    model.id = user.id;
    model.email = user.email;
    model.username = user.username;
    model.password = user.password;
    model.role = user.role;
    model.banned = user.banned;
    model.image = user.image;
    model.nationality = user.nationality;
    model.bankAccount = user.bankAccount;
    model.parties = user.parties.map((party) => Party.entityToModel(party));
    model.messages = user.messages.map((message) =>
      Message.entityToModel(message)
    );

    return model;
  }

  static modelToDto(userModel: User): UserDto {
    const dto = new UserDto();
    dto.id = userModel.id;
    dto.email = userModel.email;
    dto.username = userModel.username;
    dto.password = userModel.password;
    dto.role = userModel.role;
    dto.banned = userModel.banned;
    dto.image = userModel.image;
    dto.bankAccount = userModel.bankAccount;
    dto.nationality = userModel.nationality;
    dto.parties = userModel.parties.map((party) => Party.modelToDto(party));
    dto.messages = userModel.messages.map((message) =>
      Message.modelToDto(message)
    );
    return dto;
  }

  static dtoToModel(user: UserDto): User {
    const model = new User();
    model.id = user.id;
    model.email = user.email;
    model.username = user.username;
    model.password = user.password;
    model.role = user.role;
    model.banned = user.banned;
    model.image = user.image;
    model.bankAccount = user.bankAccount;
    model.nationality = user.nationality;
    model.messages = user.messages.map((message) =>
      Message.dtoToModel(message)
    );
    model.parties = user.parties.map((party) => Party.dtoToModel(party));
    return model;
  }
}