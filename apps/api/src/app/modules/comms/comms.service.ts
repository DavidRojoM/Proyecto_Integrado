import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessageDto, PayloadActions } from '@proyecto-integrado/shared';

@Injectable()
export class CommsService {
  constructor(
    @Inject('COMMS_SERVICE') private readonly commsProxy: ClientProxy
  ) {}

  sendMessage(message: MessageDto): void {
    this.commsProxy.emit(PayloadActions.COMMS.SEND_MESSAGE, message);
  }
}
