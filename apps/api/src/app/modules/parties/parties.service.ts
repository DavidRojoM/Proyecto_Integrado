import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  FindAllPartiesResponse,
  InsertPartyResponse,
  JoinPartyDto,
  JoinPartyResponse,
  PartyDto,
  PayloadActions,
  UserPartyDto,
} from '@proyecto-integrado/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PartiesService {
  constructor(
    @Inject('PARTIES_SERVICE') private readonly partiesProxy: ClientProxy
  ) {}

  async findAll(): Promise<PartyDto[]> {
    const findResponse = await firstValueFrom(
      this.partiesProxy.send<FindAllPartiesResponse>(
        PayloadActions.PARTIES.FIND_ALL,
        {}
      )
    );

    if (findResponse.ok === false) {
      throw new BadRequestException({
        statusText: findResponse.error.statusText,
        statusCode: findResponse.error.statusCode,
      });
    }
    return findResponse.value;
  }

  async create(party: PartyDto): Promise<PartyDto> {
    const createResponse = await firstValueFrom(
      this.partiesProxy.send<InsertPartyResponse, PartyDto>(
        PayloadActions.PARTIES.CREATE,
        party
      )
    );

    if (createResponse.ok === false) {
      throw new BadRequestException({
        statusText: createResponse.error.statusText,
        statusCode: createResponse.error.statusCode,
      });
    }
    return createResponse.value;
  }

  async joinParty(joinConfig: JoinPartyDto): Promise<UserPartyDto> {
    const joinResponse = await firstValueFrom(
      this.partiesProxy.send<JoinPartyResponse, JoinPartyDto>(
        PayloadActions.PARTIES.JOIN,
        joinConfig
      )
    );

    if (joinResponse.ok === false) {
      throw new BadRequestException({
        statusText: joinResponse.error.statusText,
        statusCode: joinResponse.error.statusCode,
      });
    }
    return joinResponse.value;
  }
}
