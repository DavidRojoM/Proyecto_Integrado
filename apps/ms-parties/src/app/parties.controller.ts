import { Controller } from '@nestjs/common';

import { PartiesService } from './parties.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  FindAllPartiesResponse,
  FindPartyResponse,
  InsertPartyResponse,
  InsertUserPartyResponse,
  JoinPartyDto,
  PartyDto,
  PayloadActions,
  RemoveUserPartyResponse,
} from '@proyecto-integrado/shared';

@Controller()
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @MessagePattern(PayloadActions.PARTIES.JOIN)
  joinParty(data: JoinPartyDto): Promise<InsertUserPartyResponse> {
    return this.partiesService.joinParty(data);
  }

  @MessagePattern(PayloadActions.PARTIES.FIND_BY_ID)
  async findById(@Payload('id') id: string): Promise<FindPartyResponse> {
    return this.partiesService.findById(id);
  }

  @MessagePattern(PayloadActions.PARTIES.CREATE)
  async create(@Payload() party: PartyDto): Promise<InsertPartyResponse> {
    return this.partiesService.create(party);
  }

  @MessagePattern(PayloadActions.PARTIES.FIND_ALL)
  async findAll(): Promise<FindAllPartiesResponse> {
    return this.partiesService.findAll();
  }

  @MessagePattern(PayloadActions.PARTIES.LEAVE)
  async leaveParty(
    @Payload() leaveConfig: JoinPartyDto
  ): Promise<RemoveUserPartyResponse> {
    return this.partiesService.leaveParty(leaveConfig);
  }
}
