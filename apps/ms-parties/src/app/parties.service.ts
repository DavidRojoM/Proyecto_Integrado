import { Inject, Injectable } from '@nestjs/common';
import {
  AddTripToPartyDto,
  ChangeBalancesResponse,
  CheckoutDto,
  CheckoutResponse,
  ConfirmPartyResponse,
  ConfirmPartyDto,
  FindAllPartiesResponse,
  FindPartyResponse,
  FindTripByIdPayload,
  FindTripResponse,
  FindUserByIdPayload,
  FindUserResponse,
  InsertPartyResponse,
  InsertTripResponse,
  InsertUserPartyResponse,
  JoinPartyDto,
  PartiesRepository,
  Party,
  PartyDto,
  PartyStatusEnum,
  PayloadActions,
  RemoveUserPartyResponse,
  User,
  UserPartiesRepository,
  UserParty,
  UserPartyStatus,
  DeletePartyResponse,
  UpdatePartyResponse,
} from '@proyecto-integrado/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PartiesService {
  constructor(
    private readonly userPartiesRepository: UserPartiesRepository,
    private readonly partiesRepository: PartiesRepository,
    @Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy,
    @Inject('TRIPS_SERVICE') private readonly tripsProxy: ClientProxy,
    @Inject('MAILER_SERVICE') private readonly mailerProxy: ClientProxy
  ) {}

  async joinParty(
    joinPartyDto: JoinPartyDto
  ): Promise<InsertUserPartyResponse> {
    const findPartyResponse = await this.partiesRepository.findById(
      joinPartyDto.partyId
    );
    if (findPartyResponse.ok === false) {
      return findPartyResponse;
    }

    if (findPartyResponse.value.status === PartyStatusEnum.READY) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Cannot join an ended party',
        },
      };
    }

    const userParty = new UserParty();
    userParty.status = joinPartyDto.status;
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

  async leaveParty(config: JoinPartyDto): Promise<RemoveUserPartyResponse> {
    const findUserPartyResponse =
      await this.userPartiesRepository.findByUserIdAndPartyId(
        config.userId,
        config.partyId
      );
    if (findUserPartyResponse.ok === false) {
      return findUserPartyResponse;
    }

    if (
      findUserPartyResponse.value.status === UserPartyStatus.READY &&
      findUserPartyResponse.value.party.status !== 'READY'
    ) {
      const checkoutResponse = await this.checkout(
        {
          partyId: config.partyId,
          userId: config.userId,
        },
        UserPartyStatus.PENDING
      );

      if (checkoutResponse.ok === false) {
        return checkoutResponse;
      }
    }

    return await this.userPartiesRepository.deleteUserParty(
      config.userId,
      config.partyId
    );
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

  delete(id: string): Promise<DeletePartyResponse> {
    return this.partiesRepository.deletePartyById(id);
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

  async addTripToParty(config: AddTripToPartyDto): Promise<InsertTripResponse> {
    const findPartyResponse = await this.partiesRepository.findById(
      config.partyId
    );

    if (findPartyResponse.ok === false) {
      return findPartyResponse;
    }

    if (findPartyResponse.value.status === PartyStatusEnum.READY) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Cannot add a trip to an ended party',
        },
      };
    }

    if (
      findPartyResponse.value.users.some(
        (userParty) => userParty.status === UserPartyStatus.READY
      )
    ) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Cannot add a trip to a party with a ready user',
        },
      };
    }

    const findTripResult = await firstValueFrom(
      this.tripsProxy.send<FindTripResponse, FindTripByIdPayload>(
        PayloadActions.TRIPS.TRIPS.FIND_BY_ID,
        { id: config.trip.id }
      )
    );

    if (findTripResult.ok === false) {
      return findTripResult;
    }

    return this.partiesRepository.addTripToParty(
      config.partyId,
      findTripResult.value
    );
  }

  async update(party: PartyDto): Promise<UpdatePartyResponse> {
    const model = Party.dtoToModel(party);
    const response = await this.partiesRepository.updateParty(model);
    if (response.ok === false) {
      return response;
    }
    return {
      ok: true,
      value: Party.modelToDto(response.value),
    };
  }

  async checkout(
    config: CheckoutDto,
    status: UserPartyStatus
  ): Promise<CheckoutResponse> {
    const userParty = await this.userPartiesRepository.findByUserIdAndPartyId(
      config.userId,
      config.partyId
    );

    if (userParty.ok === false) {
      return userParty;
    }
    if (userParty.value.party.status === PartyStatusEnum.READY) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Party is already confirmed',
        },
      };
    }
    const trip = userParty.value.party.trip;
    const user = userParty.value.user;

    const userBalances = user.balance;
    const tripPrice = this.calculateTripPrice(
      trip.hotel.nightPrice,
      trip.transport.price,
      this.calculateTimeDifferenceInDays(trip.from, trip.to)
    );

    let balancesResult;
    if (status === UserPartyStatus.READY) {
      balancesResult = Number(userBalances) - tripPrice;
      if (balancesResult < 0) {
        return {
          ok: false,
          error: {
            statusCode: 400,
            statusText: 'Not enough balance',
          },
        };
      }
    } else {
      balancesResult = Number(userBalances) + tripPrice;
    }
    //TODO: MAKE THIS TRANSACTIONAL
    try {
      await this.userPartiesRepository.updateStatus(
        config.userId,
        config.partyId,
        status
      );
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Could not update UserParty Status',
        },
      };
    }

    const updateBalancesResult = await firstValueFrom(
      this.usersProxy.send<
        ChangeBalancesResponse,
        { userId: string; amount: number }
      >(PayloadActions.USERS.UPDATE_BALANCES, {
        userId: config.userId,
        amount: balancesResult,
      })
    );

    if (updateBalancesResult.ok === false) {
      return updateBalancesResult;
    }
    return {
      ok: true,
      value: {
        partyId: config.partyId,
        userId: config.userId,
        balances: balancesResult,
      },
    };
  }

  async confirm(config: ConfirmPartyDto): Promise<ConfirmPartyResponse> {
    const findUserPartyResponse =
      await this.userPartiesRepository.findByUserIdAndPartyId(
        config.userId,
        config.partyId
      );
    if (findUserPartyResponse.ok === false) {
      return findUserPartyResponse;
    }
    if (findUserPartyResponse.value.status === UserPartyStatus.READY) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Party is already confirmed',
        },
      };
    }

    const findPartyResponse = await this.partiesRepository.findById(
      config.partyId
    );

    if (findPartyResponse.ok === false) {
      return findPartyResponse;
    }

    const isUserOrganizer =
      findPartyResponse.value.users.find(
        (userParty) => userParty.user.id === config.userId
      ) && findUserPartyResponse.value.status === UserPartyStatus.ORGANIZER;

    if (!isUserOrganizer) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'User is not organizer',
        },
      };
    }
    const updatePartyResult = await this.partiesRepository.confirmParty(
      config.partyId
    );
    if (updatePartyResult.ok === false) {
      return updatePartyResult;
    }

    const trip = findUserPartyResponse.value.party.trip;
    const user = findUserPartyResponse.value.user;

    const userBalances = user.balance;
    const tripPrice = this.calculateTripPrice(
      trip.hotel.nightPrice,
      trip.transport.price,
      this.calculateTimeDifferenceInDays(trip.from, trip.to)
    );

    const readyUsers = findPartyResponse.value.users.filter(
      (userParty) => userParty.status === UserPartyStatus.READY
    );

    const amountToGain = (tripPrice * readyUsers.length) / 100;

    const balancesResult = Number(userBalances) + amountToGain;

    const updateBalancesResult = await firstValueFrom(
      this.usersProxy.send<
        ChangeBalancesResponse,
        { userId: string; amount: number }
      >(PayloadActions.USERS.UPDATE_BALANCES, {
        userId: config.userId,
        amount: balancesResult,
      })
    );

    if (updateBalancesResult.ok === false) {
      return updateBalancesResult;
    }

    this.mailerProxy.emit(PayloadActions.MAIL.SEND_PARTY_CONFIRMATION, {
      users: readyUsers.map((userParty) => userParty.user),
      party: findPartyResponse.value,
    });
    return {
      ok: true,
      value: {
        partyId: config.partyId,
        userId: config.userId,
        balances: balancesResult,
      },
    };
  }

  private calculateTripPrice(
    hotelNightPrice: number,
    transportPrice: number,
    days: number
  ): number {
    const hotelPrice = Number(hotelNightPrice) * Number(days);
    return hotelPrice + Number(transportPrice);
  }

  private calculateTimeDifferenceInDays(
    from: Date | string,
    to: Date | string
  ): number {
    return Math.round(
      (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 3600 * 24)
    );
  }
}
