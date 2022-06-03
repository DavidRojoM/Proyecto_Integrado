import { Inject, Injectable } from '@nestjs/common';
import {
  FindPartyByIdPayload,
  FindPartyResponse,
  FindUserByIdPayload,
  FindUserResponse,
  Message,
  MessageDto,
  MessagesRepository,
  Party,
  PayloadActions,
  SendMessageResponse,
  User,
} from '@proyecto-integrado/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommsService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy,
    @Inject('PARTIES_SERVICE') private readonly partiesProxy: ClientProxy,
    private readonly messagesRepository: MessagesRepository
  ) {}

  async insertMessage(message: MessageDto): Promise<SendMessageResponse> {
    const user = await firstValueFrom(
      this.usersProxy.send<FindUserResponse, FindUserByIdPayload>(
        PayloadActions.USERS.FIND_BY_ID,
        { id: message.userId }
      )
    );

    const party = await firstValueFrom(
      this.partiesProxy.send<FindPartyResponse, FindPartyByIdPayload>(
        PayloadActions.PARTIES.FIND_BY_ID,
        { id: message.partyId }
      )
    );

    if (user.ok === false || party.ok === false) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Invalid user or party',
        },
      };
    }
    const model = Message.dtoToModel(message);
    model.user = User.dtoToModel(user.value);
    model.party = Party.dtoToModel(party.value);
    return this.messagesRepository.addOne(model);
  }
}
