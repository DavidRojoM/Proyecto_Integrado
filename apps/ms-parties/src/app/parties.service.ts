import { Inject, Injectable } from '@nestjs/common';
import {
  FindUserByIdPayload,
  FindUserResponse,
  InsertUserPartyResponse,
  JoinPartyDto,
  PartiesRepository,
  Party,
  PayloadActions,
  User,
  UserPartiesRepository,
  UserParty,
} from '@proyecto-integrado/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PartiesService {
  constructor(
    private readonly userPartiesRepository: UserPartiesRepository,
    private readonly partiesRepository: PartiesRepository,
    @Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy
  ) {}

  async joinParty(
    joinPartyDto: JoinPartyDto
  ): Promise<InsertUserPartyResponse> {
    const userParty = new UserParty();

    const findUserResult = await firstValueFrom(
      this.usersProxy.send<FindUserResponse, FindUserByIdPayload>(
        PayloadActions.USERS.FIND_BY_ID,
        { id: joinPartyDto.userId }
      )
    );

    if (findUserResult.ok === false) {
      return findUserResult;
    }
    userParty.user = User.dtoToModel(findUserResult.value);

    const findPartyResult = await this.partiesRepository.findById(
      joinPartyDto.partyId
    );

    if (findPartyResult.ok === false) {
      return findPartyResult;
    }

    userParty.party = findPartyResult.value;

    const insertResult = await this.userPartiesRepository.createUserParty(
      userParty
    );

    if (insertResult.ok === false) {
      return insertResult;
    }

    return {
      ok: true,
      value: UserParty.modelToDto(insertResult.value),
    };
  }
}
