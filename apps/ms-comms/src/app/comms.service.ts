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

  async insertMessage(message: MessageDto): Promise<void> {
    const model = Message.dtoToModel(message);
    const user = await firstValueFrom(
      this.usersProxy.send<FindUserResponse, FindUserByIdPayload>(
        PayloadActions.USERS.FIND_BY_ID,
        { id: message.userId }
      )
    );

    const party = await firstValueFrom(
      this.partiesProxy.send<FindPartyResponse, FindPartyByIdPayload>(
        PayloadActions.USERS.FIND_BY_ID,
        { id: message.userId }
      )
    );

    if (user.ok !== true || party.ok !== true) {
      return;
    }
    model.user = User.dtoToModel(user.value);
    model.party = Party.dtoToModel(party.value);
    this.messagesRepository.addOne(model);
  }
}
