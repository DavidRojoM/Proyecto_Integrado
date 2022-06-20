import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  AddTripToParty,
  AddTripToPartyDto,
  CheckoutResponse,
  CheckoutResponseDto,
  ConfirmPartyDto,
  ConfirmPartyResponse,
  ConfirmPartyResponseDto,
  DeletePartyResponse,
  FindAllPartiesResponse,
  InsertPartyResponse,
  JoinPartyDto,
  JoinPartyResponse,
  PartyDto,
  PayloadActions,
  RemoveUserPartyResponse,
  Trip,
  UpdatePartyResponse,
  UserPartyDto,
} from '@proyecto-integrado/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserPartyStatus } from '@proyecto-integrado/shared';
import { CheckoutDto } from '@proyecto-integrado/shared';

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
        { ...joinConfig, status: UserPartyStatus.PENDING }
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

  async leaveParty(leaveConfig: JoinPartyDto) {
    const leaveResponse = await firstValueFrom(
      this.partiesProxy.send<RemoveUserPartyResponse, JoinPartyDto>(
        PayloadActions.PARTIES.LEAVE,
        leaveConfig
      )
    );

    if (leaveResponse.ok === false) {
      throw new BadRequestException({
        statusText: leaveResponse.error.statusText,
        statusCode: leaveResponse.error.statusCode,
      });
    }

    return leaveResponse.value;
  }

  async joinAsOrganizer(joinConfig: JoinPartyDto): Promise<UserPartyDto> {
    const joinResponse = await firstValueFrom(
      this.partiesProxy.send<JoinPartyResponse, JoinPartyDto>(
        PayloadActions.PARTIES.JOIN,
        { ...joinConfig, status: UserPartyStatus.ORGANIZER }
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

  async addTrip(
    addTripToPartyConfig: AddTripToPartyDto
  ): Promise<{ partyId: string; trip: Trip }> {
    const addTripResponse = await firstValueFrom(
      this.partiesProxy.send<AddTripToParty, AddTripToPartyDto>(
        PayloadActions.PARTIES.ADD_TRIP,
        addTripToPartyConfig
      )
    );

    if (addTripResponse.ok === false) {
      throw new BadRequestException({
        statusText: addTripResponse.error.statusText,
        statusCode: addTripResponse.error.statusCode,
      });
    }
    return {
      partyId: addTripToPartyConfig.partyId,
      trip: addTripResponse.value,
    };
  }

  async checkout(config: CheckoutDto): Promise<CheckoutResponseDto> {
    const response = await firstValueFrom(
      this.partiesProxy.send<CheckoutResponse, CheckoutDto>(
        PayloadActions.PARTIES.CHECKOUT_TRIP,
        config
      )
    );

    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }
    return response.value;
  }

  async cancelCheckout(config: CheckoutDto): Promise<CheckoutResponseDto> {
    const response = await firstValueFrom(
      this.partiesProxy.send<CheckoutResponse, CheckoutDto>(
        PayloadActions.PARTIES.CANCEL_CHECKOUT_TRIP,
        config
      )
    );

    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }
    return response.value;
  }

  async confirm(config: ConfirmPartyDto): Promise<ConfirmPartyResponseDto> {
    const response = await firstValueFrom(
      this.partiesProxy.send<ConfirmPartyResponse, ConfirmPartyDto>(
        PayloadActions.PARTIES.CONFIRM_PARTY,
        config
      )
    );

    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }
    return response.value;
  }

  async delete(partyId: string): Promise<{ partyId: string }> {
    const response = await firstValueFrom(
      this.partiesProxy.send<DeletePartyResponse, { partyId: string }>(
        PayloadActions.PARTIES.DELETE,
        { partyId }
      )
    );
    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }
    return response.value;
  }

  async update(party: PartyDto) {
    const response = await firstValueFrom(
      this.partiesProxy.send<UpdatePartyResponse, PartyDto>(
        PayloadActions.PARTIES.UPDATE,
        party
      )
    );
    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }
    return response.value;
  }
}
