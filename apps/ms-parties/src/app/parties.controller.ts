import { Controller } from '@nestjs/common';

import { PartiesService } from './parties.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddTripToPartyDto,
  CheckoutDto,
  CheckoutResponse,
  FindAllPartiesResponse,
  FindPartyResponse,
  InsertPartyResponse,
  InsertTripResponse,
  InsertUserPartyResponse,
  JoinPartyDto,
  PartyDto,
  PayloadActions,
  RemoveUserPartyResponse,
} from '@proyecto-integrado/shared';
import { UserPartyStatus } from '@proyecto-integrado/shared';

@Controller()
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @MessagePattern(PayloadActions.PARTIES.JOIN)
  joinParty(
    data: JoinPartyDto & { status?: UserPartyStatus }
  ): Promise<InsertUserPartyResponse> {
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

  @MessagePattern(PayloadActions.PARTIES.ADD_TRIP)
  addTripToParty(config: AddTripToPartyDto): Promise<InsertTripResponse> {
    return this.partiesService.addTripToParty(config);
  }

  @MessagePattern(PayloadActions.PARTIES.CHECKOUT_TRIP)
  checkout(config: CheckoutDto): Promise<CheckoutResponse> {
    return this.partiesService.checkout(config);
  }

  @MessagePattern(PayloadActions.PARTIES.CANCEL_CHECKOUT_TRIP)
  cancelCheckout(config: CheckoutDto): Promise<CheckoutResponse> {
    return this.partiesService.cancelCheckout(config);
  }
}
