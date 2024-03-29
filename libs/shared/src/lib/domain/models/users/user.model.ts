import { Roles } from '../../enums/roles.enum';
import { Message } from '../comms/message.model';
import { UserDto } from '../../dto/users/user.dto';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserParty } from './user-party.model';
import { UserOutput } from '../../dto/users/user.output';
import { Wishlist } from '../wishlists/wishlist.model';

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
  userParties?: UserParty[];
  messages?: Message[];
  wishlists?: Wishlist[];
  balance?: number;

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
    entity.userParties = user?.userParties?.map((party) =>
      UserParty.modelToEntity(party)
    );
    entity.messages = user?.messages?.map((message) =>
      Message.modelToEntity(message)
    );
    entity.wishlists = user?.wishlists?.map((wishlist) =>
      Wishlist.modelToEntity(wishlist)
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
    model.balance = user?.balance?.amount;
    model.userParties = user?.userParties?.map((userParty) =>
      UserParty.entityToModel(userParty)
    );
    model.messages = user?.messages?.map((message) =>
      Message.entityToModel(message)
    );

    model.wishlists = user?.wishlists?.map((wishlist) => {
      return Wishlist.entityToModel(wishlist);
    });

    return model;
  }

  static modelToDto(userModel: User & { status?: string }): UserDto {
    const dto = new UserDto();
    dto.id = userModel.id;
    dto.email = userModel.email;
    dto.username = userModel.username;
    dto.password = userModel.password;
    dto.role = userModel.role;
    dto.banned = userModel.banned;
    dto.balance = userModel.balance;
    dto.image = userModel.image;
    dto.bankAccount = userModel.bankAccount;
    dto.nationality = userModel.nationality;
    dto.parties = userModel?.userParties?.map((userParty) =>
      UserParty.modelToDto(userParty)
    );
    dto.messages = userModel?.messages?.map((message) =>
      Message.modelToDto(message)
    );
    if (userModel.status) {
      dto.status = userModel.status;
    }
    return dto;
  }

  static dtoToModel(user: UserDto): User {
    const model = new User();
    model.id = user.id;
    model.email = user.email;
    model.username = user.username;
    model.balance = user.balance;
    model.password = user.password;
    model.role = user.role;
    model.banned = user.banned;
    model.image = user.image;
    model.bankAccount = user.bankAccount;
    model.nationality = user.nationality;
    model.messages = user?.messages?.map((message) =>
      Message.dtoToModel(message)
    );
    model.userParties = user?.parties?.map((party) =>
      UserParty.dtoToModel(party)
    );
    return model;
  }

  static modelToOutput(userModel: User): UserOutput {
    const output = new UserOutput();
    output.id = userModel.id;
    output.username = userModel.username;
    output.image = userModel.image;
    return output;
  }
}
