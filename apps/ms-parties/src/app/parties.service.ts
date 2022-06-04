import { Inject, Injectable } from '@nestjs/common';
import {
  FindAllPartiesResponse,
  FindPartyResponse,
  FindUserByIdPayload,
  FindUserResponse,
  InsertPartyResponse,
  InsertUserPartyResponse,
  JoinPartyDto,
  PartiesRepository,
  Party,
  PartyDto,
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

    if (
      findUserResult.value.parties.some(
        (party) => party.party.id === joinPartyDto.partyId
      )
    ) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'User already joined this party',
        },
      };
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

  async findById(id: string): Promise<FindPartyResponse> {
    const result = await this.partiesRepository.findById(id);
    if (result.ok === false) {
      return result;
    }
    return {
      ok: true,
      value: Party.modelToDto(result.value),
    };
  }

  async create(party: PartyDto): Promise<InsertPartyResponse> {
    const insertResult = await this.partiesRepository.createParty(
      Party.dtoToModel(party)
    );
    if (insertResult.ok === false) {
      return insertResult;
    }
    return {
      ok: true,
      value: Party.modelToDto(insertResult.value),
    };
  }

  async findAll(): Promise<FindAllPartiesResponse> {
    const findResult = await this.partiesRepository.findAll();
    if (findResult.ok === false) {
      return findResult;
    }
    return {
      ok: true,
      value: findResult.value.map((party) => Party.modelToDto(party)),
    };
  }
}
