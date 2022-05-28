import { Party, User, UserPartiesEntity } from '@proyecto-integrado/shared';
import { UserPartyStatus } from '../../enums/user-party-status.enum';
import { UserPartiesDto } from '../../dto/users/user-parties.dto';

export class UserParty {
  user: User;
  party: Party;
  status?: UserPartyStatus;

  static modelToEntity(userParty: UserParty): UserPartiesEntity {
    const entity = new UserPartiesEntity();
    entity.user = User.modelToEntity(userParty.user);
    entity.party = Party.modelToEntity(userParty.party);
    entity.status = userParty.status;

    return entity;
  }

  static entityToModel(userParty: UserPartiesEntity): UserParty {
    const model = new UserParty();
    model.user = User.entityToModel(userParty.user);
    model.party = Party.entityToModel(userParty.party);
    model.status = userParty.status;

    return model;
  }

  static dtoToModel(userParty: UserPartiesDto): UserParty {
    const model = new UserParty();
    model.user = User.dtoToModel(userParty.user);
    model.party = Party.dtoToModel(userParty.party);
    model.status = userParty.status;
    return model;
  }

  static modelToDto(party: UserParty): UserPartiesDto {
    const dto = new UserPartiesDto();
    dto.user = User.modelToDto(party.user);
    dto.party = Party.modelToDto(party.party);
    dto.status = party.status;
    return dto;
  }
}
