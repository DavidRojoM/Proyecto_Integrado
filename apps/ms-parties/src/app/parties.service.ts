import { Injectable } from '@nestjs/common';
import {
  InsertUserPartyResponse,
  JoinPartyDto,
  PartiesRepository,
  Party,
  User,
  UserPartiesRepository,
  UserParty,
  UsersRepository,
} from '@proyecto-integrado/shared';

@Injectable()
export class PartiesService {
  constructor(
    private readonly userPartiesRepository: UserPartiesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly partiesRepository: PartiesRepository
  ) {}

  async joinParty(
    joinPartyDto: JoinPartyDto
  ): Promise<InsertUserPartyResponse> {
    const userParty = new UserParty();
    userParty.user = User.entityToModel(
      await this.usersRepository.findOne(joinPartyDto.userId)
    );
    userParty.party = Party.entityToModel(
      await this.partiesRepository.findOne(joinPartyDto.partyId)
    );

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
