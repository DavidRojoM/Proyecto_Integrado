import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  Message,
  MessageDto,
  MessageInput,
  PayloadActions,
  SendMessageResponse,
} from '@proyecto-integrado/shared';
import { firstValueFrom } from 'rxjs';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class CommsService {
  constructor(
    @Inject('COMMS_SERVICE') private readonly commsProxy: ClientProxy
  ) {}

  async sendMessage(message: MessageInput): Promise<Message> {
    const response = await firstValueFrom(
      this.commsProxy.send<SendMessageResponse, MessageDto>(
        PayloadActions.COMMS.SEND_MESSAGE,
        Message.inputToDto(message)
      )
    );
    if (response.ok === false) {
      throw new ApolloError(
        response.error.statusText,
        response.error.statusCode.toString()
      );
    }
    return response.value;
  }

  // findAll() {}
}
