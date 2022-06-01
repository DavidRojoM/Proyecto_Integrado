import { Party, User, UserPartiesEntity } from '@proyecto-integrado/shared';
import { UserPartyStatus } from '../../enums/user-party-status.enum';
import { UserPartyDto } from '../../dto/users/user-party.dto';

export class UserParty {
  user: User;
  party: Party;
  status?: UserPartyStatus;

  static modelToEntity(userParty: UserParty): UserPartiesEntity {
    const entity = new UserPartiesEntity();
    if (userParty.user) {
      entity.user = User.modelToEntity(userParty.user);
    }
    if (userParty.party) {
      entity.party = Party.modelToEntity(userParty.party);
    }
    entity.status = userParty.status;

    return entity;
  }

  static entityToModel(userParty: UserPartiesEntity): UserParty {
    const model = new UserParty();
    if (userParty.user) {
      model.user = User.entityToModel(userParty.user);
    }
    if (userParty.party) {
      model.party = Party.entityToModel(userParty.party);
    }
    model.status = userParty.status;

    return model;
  }

  static dtoToModel(userParty: UserPartyDto): UserParty {
    const model = new UserParty();
    if (userParty.user) {
      model.user = User.dtoToModel(userParty.user);
    }
    if (userParty.party) {
      model.party = Party.dtoToModel(userParty.party);
    }
    model.status = userParty.status;
    return model;
  }

  static modelToDto(userParty: UserParty): UserPartyDto {
    const dto = new UserPartyDto();
    if (userParty?.user) {
      dto.user = User.modelToDto(userParty.user);
    }
    if (userParty?.party) {
      dto.party = Party.modelToDto(userParty.party);
    }
    dto.status = userParty.status;
    return dto;
  }
}
